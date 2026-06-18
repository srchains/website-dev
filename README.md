# 🏗️ BuildStack Solutions — Website

> Official website for **BuildStack Solutions** — a web development agency based in Salem, Tamilnadu. Built with React + TypeScript + Vite + Tailwind CSS.

---

## 🌐 Live Preview

Run locally at: `http://localhost:5173/`

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2.6 | UI Framework |
| **TypeScript** | 5.9.3 | Type Safety |
| **Vite** | 7.3.2 | Build Tool / Dev Server |
| **Tailwind CSS** | 4.1.17 | Styling |
| **Framer Motion** | 12.40.0 | Animations |
| **Lucide React** | 1.17.0 | Icons |
| **Resend** | SDK | Contact Form Email Delivery |
| **Express** | (local dev) | Local Email API Server |

---

## 📁 Project Structure

```
website-dev/
├── api/
│   └── send-email.js    # Vercel Serverless Function — sends email via Resend
├── src/
│   ├── App.tsx          # Main app — all sections & components
│   ├── index.css        # Global styles
│   └── main.tsx         # React entry point
├── public/              # Static assets
├── image/               # Team member photos
├── index.html           # HTML template
├── server.cjs           # Local dev email API server (Express + Resend)
├── .env                 # EmailJS legacy vars (unused)
├── .env.local           # Resend API key + email config (NOT in Git)
├── .env.example         # Env variable template
├── package.json         # Dependencies & scripts
├── vite.config.ts       # Vite configuration (includes /api proxy)
└── tsconfig.json        # TypeScript config
```

---

## 🔧 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

Your `.env.local` should look like:
```env
RESEND_API_KEY=your_resend_api_key
EMAIL_TO=your@email.com
EMAIL_FROM=BuildStack Solutions <onboarding@resend.dev>
```

> 💡 Get your free API key at [resend.com](https://resend.com) — 3,000 emails/month free.

### 3. Start the email API server (Terminal 1)
```bash
npm run server
```
This starts the local Express server on `http://localhost:3001` that handles `/api/send-email`.

### 4. Start the Vite dev server (Terminal 2)
```bash
npm run dev
```

Or run both with one command:
```bash
npm run dev:all
```

### 5. Build for production
```bash
npm run build
```

---

## 🚀 Deploy to Vercel

1. Push the project to GitHub and connect the repo to [Vercel](https://vercel.com).

2. In the Vercel project dashboard, go to **Settings → Environment Variables** and add:

   | Key | Value |
   |---|---|
   | `RESEND_API_KEY` | Your Resend API key |
   | `EMAIL_TO` | `buildstacksolution@gmail.com` |
   | `EMAIL_FROM` | `BuildStack Solutions <onboarding@resend.dev>` |

3. Deploy — Vercel automatically picks up `api/send-email.js` as a serverless function.

> ⚠️ To use a custom `from` address (e.g. `hello@buildstack.dev`), first [verify your domain](https://resend.com/domains) on Resend.

---

## 📧 Contact Form Setup

The contact form uses **[Resend](https://resend.com/)** for email delivery.

- **Local dev:** `/api/send-email` proxied to `server.cjs` (Express on port 3001)
- **Production:** `/api/send-email` handled by `api/send-email.js` (Vercel Serverless)
- **Receives to:** `buildstacksolution@gmail.com`
- **Free tier:** 3,000 emails/month, 100/day

### Form Fields Sent
| Field | Description |
|---|---|
| `name` | Sender's full name |
| `email` | Sender's email address |
| `phone` | Phone number |
| `service` | Service type selected |
| `budget` | Budget range selected |
| `message` | Project description |

---

## 📄 Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Landing banner with CTA buttons |
| About | `#about` | Company info, values, team members |
| Services | `#services` | 5 service cards |
| Portfolio | `#portfolio` | Project showcase with single featured project |
| Pricing | `#pricing` | 3 pricing plans (Starter / Business / E-commerce) |
| Testimonials | — | 3 client reviews |
| Contact | `#contact` | Contact form + contact info |
| Footer | — | Links, social icons, copyright |

---

## 👥 Team

| Name | Role |
|---|---|
| Logajith | Full Stack Developer |
| Boopathi | Frontend Developer |
| Rudra Prasad | Backend Developer |
| Prabhu | Project Manager |

---

## 💰 Pricing Plans

| Plan | Price |
|---|---|
| Starter ⭐ (Most Popular) | ₹3,000 – ₹5,000 |
| Business | ₹8,000 – ₹12,000 |
| E-commerce | ₹10,000 – ₹15,000 |

---

## 🗂️ Portfolio Projects

| Project | Category | Tech |
|---|---|---|
| SR Chains (Live) | E-commerce | React.js · CSS · HTML |

---

## 📝 Changelog

All changes to this project are documented here.

---

### [v1.4.0] — Email: Migrated to Resend + Local Dev Server
**Date:** 2026-06-15

- ✅ Installed `resend`, `express`, `cors`, `dotenv` packages
- ✅ Created `server.cjs` — local Express server handling `POST /api/send-email` via Resend SDK
- ✅ Updated `api/send-email.js` (Vercel Serverless) to use Resend SDK instead of raw `fetch()`
- ✅ Added Vite dev proxy: `/api/*` → `http://localhost:3001`
- ✅ Added npm scripts: `server`, `dev:all`
- ✅ Created `.env.local` with `RESEND_API_KEY`, `EMAIL_TO`, `EMAIL_FROM`
- ✅ Updated `.env.example` to document Resend-based config
- ✅ Cleaned up stale "Formspree Error" label in `App.tsx`
- ✅ Tested: Live email delivered successfully (Resend ID: `60e637ab-591f-4181-90d9-635d32ea2fa4`)

---

### [v1.3.0] — Portfolio Simplified
**Date:** 2026-06-14

- ✅ Removed Portfolio filter tabs (All / Business / E-commerce / Web Apps)
- ✅ Removed all portfolio projects except SR Chains
- ✅ Portfolio now displays single featured project

---

### [v1.2.0] — Contact Form: Migrated to Formspree
**Date:** 2026-06-13

- ✅ Removed `@emailjs/browser` dependency from code
- ✅ Replaced EmailJS `send()` with a plain `fetch()` POST to Formspree
- ✅ Formspree endpoint: `https://formspree.io/f/mgobpplp`
- ✅ Added proper error handling
- ✅ Form resets and shows "Thank You" screen on success

---

### [v1.1.0] — Contact Form: EmailJS Integration (Initial Attempt)
**Date:** 2026-06-13

- ✅ Integrated `@emailjs/browser` SDK
- ✅ Added `.env` with EmailJS credentials
- ❌ EmailJS sending failed — moved to Formspree instead

---

### [v1.0.0] — Initial Build

- ✅ Set up Vite + React + TypeScript + Tailwind CSS project
- ✅ Built full single-page website with all sections:
  - Hero, About, Services, Portfolio, Pricing, Testimonials, Contact, Footer
- ✅ Added Framer Motion animations (fade-in, stagger, scroll-triggered)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll navigation
- ✅ Sticky navbar with blur backdrop
- ✅ Scroll-to-top button
- ✅ Team member section with photos
- ✅ 3 pricing plan cards with popular badge
- ✅ Testimonials section with star ratings

---

## 🚀 Future Updates

> This section will be updated automatically as new features and changes are made.

- [ ] Verify custom domain on Resend (`buildstack.dev`) to use branded `from` address
- [x] Add WhatsApp click-to-chat link with real phone number
- [ ] Add more portfolio projects as they are completed

---

## 📞 Contact

- **Email:** buildstacksolution@gmail.com
- **Location:** Salem, Tamilnadu
- **Business:** BuildStack Solutions
