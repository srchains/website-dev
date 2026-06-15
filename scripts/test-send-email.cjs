const fs = require('fs');
const path = require('path');
// load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach(line => {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) {
      const k = m[1].trim();
      let v = m[2].trim();
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1,-1);
      process.env[k] = v;
    }
  });
}

// load the file and evaluate it inside a CommonJS sandbox so module.exports works
const handlerPath = path.join(__dirname, '..', 'api', 'send-email.js');
const code = fs.readFileSync(handlerPath, 'utf8');
const moduleSandbox = { exports: {} };
const sandboxRequire = require;
const wrapper = new Function('module', 'exports', 'require', 'process', 'fetch', 'console', code + '\nreturn module.exports;');
const handler = wrapper(moduleSandbox, moduleSandbox.exports, sandboxRequire, process, global.fetch, console);

function makeRes() {
  const res = {};
  res.headers = {};
  res.setHeader = (k,v) => { res.headers[k]=v };
  res.status = (code) => { res.statusCode = code; return res };
  res.json = (obj) => { console.log('RESPONSE', res.statusCode || 200, JSON.stringify(obj)); return Promise.resolve(obj); };
  return res;
}

async function run() {
  const req = { method: 'POST', body: { name: 'Local Test', email: 'local@example.com', message: 'Hello from local test' } };
  const res = makeRes();
  try {
    await handler(req, res);
    console.log('Handler finished');
  } catch (err) {
    console.error('Handler threw', err);
  }
}

run();
