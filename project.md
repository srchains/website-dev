# 📋 BuildStack Solutions — Project Activity Log

> This file tracks **every change made** to the project, organized by topic.
> Updated automatically whenever a change is made.

---

## 📌 Topics Index

- [📧 Email / Contact Form](#-email--contact-form)
- [🏗️ Project Setup](#️-project-setup)
- [🎨 UI & Design](#-ui--design)
- [🔧 Environment & Config](#-environment--config)

---

---

## 📧 Email / Contact Form

> Tracks all changes related to how the contact form sends messages.

---

### ✅ Step 1 — EmailJS Integrated (Initial Setup)
**Date:** 2026-06-13

**What was done:**
- Installed `@emailjs/browser` package
- Contact form used `emailjs.send()` to deliver form submissions
- Environment variables added to `.env`:
  ```
  VITE_EMAILJS_SERVICE_ID=service_24azuah
  VITE_EMAILJS_TEMPLATE_ID=template_jj4imtq
  VITE_EMAILJS_PUBLIC_KEY=m3X-ei08utGAdmdQx
  ```
- `emailjs.init()` called inside `useEffect` on component mount

**Problem found:**
- `.env` initially had placeholder values (`YOUR_SERVICE_ID` etc.)
- Code was detecting placeholders and **simulating** a fake success — no real email was sent
- After setting real credentials, EmailJS still failed with an API error
- Root cause: EmailJS service/template configuration issue on the dashboard

**Result:** ❌ Emails were NOT delivered — moved to Formspree

---

### ✅ Step 2 — Migrated from EmailJS → Formspree
**Date:** 2026-06-13

**Why changed:**
- EmailJS kept failing even after correct credentials were set
- Formspree is simpler — no SDK, no initialization, just a `fetch()` POST
- Free tier: 50 submissions/month (enough for a small business site)

**What was done:**
- Removed `import emailjs from "@emailjs/browser"` from `App.tsx`
- Removed `emailjs.init()` from `useEffect`
- Replaced entire `handleSubmit` logic with a `fetch()` POST to Formspree

**Result:** ❌ Replaced again — Formspree has a 50/month limit and no branding control

---

### ✅ Step 3 — Migrated from Formspree → Resend (via local server + Vercel)
**Date:** 2026-06-15

**Why changed:**
- Formspree has a 50 submissions/month cap on the free tier
- Resend gives full control over email content, branding, and delivery
- More professional solution with no third-party form handling

**What was done:**

1. **Installed new packages:**
   ```
   resend, express, cors, dotenv
   ```

2. **Created `server.cjs`** — Local Express dev server:
   - Runs on `http://localhost:3001`
   - Handles `POST /api/send-email`
   - Uses Resend SDK to send beautifully formatted HTML emails
   - Loads `.env.local` for the API key

3. **Updated `api/send-email.js`** — Vercel Serverless Function:
   - Upgraded from raw `fetch()` to the Resend SDK
   - Reads `RESEND_API_KEY`, `EMAIL_TO`, `EMAIL_FROM` from Vercel env vars
   - Sends a styled HTML email with all form fields

4. **Updated `vite.config.ts`** — Added dev proxy:
   - `/api/*` requests during `npm run dev` are forwarded to `http://localhost:3001`
   - This makes the contact form work locally without CORS issues

5. **Updated `package.json`** — Added scripts:
   ```json
   "server": "node server.cjs",
   "dev:all": "start \"Email API\" node server.cjs && vite"
   ```

6. **Created/updated `.env.local`:**
   ```env
   RESEND_API_KEY=<your_key>
   EMAIL_TO=buildstacksolution@gmail.com
   EMAIL_FROM=BuildStack Solutions <onboarding@resend.dev>
   ```

7. **Fixed `src/App.tsx`:** Cleaned up stale "Formspree Error" label in `console.error`

**Email HTML template features:**
- Styled table layout with all form fields (name, email, phone, service, budget, message)
- Reply-to set to the sender's email address
- BuildStack branding in footer

**Tested:** ✅ Live test email sent and received — ID `60e637ab-591f-4181-90d9-635d32ea2fa4`

**Result:** ✅ Contact form now sends real emails to `buildstacksolution@gmail.com` via Resend

---

### 📬 Current Email Setup (Active)

| Item | Value |
|---|---|
| **Provider** | Resend (resend.com) |
| **Local handler** | `server.cjs` (Express on port 3001) |
| **Production handler** | `api/send-email.js` (Vercel Serverless) |
| **Receives to** | `buildstacksolution@gmail.com` |
| **Sender** | `onboarding@resend.dev` (test) → verify domain for custom sender |
| **Fields sent** | name, email, phone, service, budget, message |
| **API key location** | `.env.local` (local) / Vercel env vars (production) |

---

---

## 🏗️ Project Setup

> Tracks the initial creation and configuration of the project.

---

### ✅ Project Initialized
**Date:** Before 2026-06-13

**What was done:**
- Created Vite + React + TypeScript project
- Installed and configured Tailwind CSS v4
- Installed Framer Motion for animations
- Installed Lucide React for icons
- Set up `tsconfig.json` and `vite.config.ts`
- Created `src/App.tsx` as the single main file with all sections

**Tech stack:**
```
React 19.2.6
TypeScript 5.9.3
Vite 7.3.2
Tailwind CSS 4.1.17
Framer Motion 12.40.0
Lucide React 1.17.0
```

---

---

## 🎨 UI & Design

> Tracks all visual and layout changes.

---

### ✅ Full Website Designed & Built
**Date:** Before 2026-06-13

**Sections built:**
| Section | Details |
|---|---|
| **Navbar** | Sticky, blur backdrop, smooth scroll links, mobile hamburger menu |
| **Hero** | Gradient background, animated headline, 2 CTA buttons |
| **About** | Company story, 3 value cards, stats panel, team members grid |
| **Services** | 5 service cards with hover animations |
| **Portfolio** | Project showcase with single featured project |
| **Pricing** | 3 plans — Starter ₹3k–₹5k, Business ₹8k–₹12k, E-commerce ₹10k–₹15k |
| **Testimonials** | 3 client reviews with star ratings |
| **Contact** | Form + contact info sidebar |
| **Footer** | Links, social icons, copyright |

**Design features:**
- Scroll-triggered animations using Framer Motion
- Stagger animations on card grids
- Hover lift effects on cards
- Smooth scroll navigation
- Scroll-to-top floating button
- Mobile responsive layout

---

---

## 🔧 Environment & Config

> Tracks changes to `.env`, `package.json`, config files.

---

### ✅ `.env` File Created
**Date:** 2026-06-13

**File:** `.env` (not committed to Git — in `.gitignore`)

**History of changes:**

| Date | Change |
|---|---|
| 2026-06-13 | Created with placeholder values for EmailJS |
| 2026-06-13 | Updated with real EmailJS credentials (`service_24azuah`, `template_jj4imtq`, `m3X-ei08utGAdmdQx`) |
| 2026-06-13 | EmailJS credentials kept in file but no longer used |

**Current `.env` contents:**
```env
VITE_EMAILJS_SERVICE_ID=service_24azuah
VITE_EMAILJS_TEMPLATE_ID=template_jj4imtq
VITE_EMAILJS_PUBLIC_KEY=m3X-ei08utGAdmdQx
```
> ⚠️ These are unused now (Resend replaced EmailJS via Formspree), but kept for reference.

---

### ✅ `.env.local` File Created
**Date:** 2026-06-15

**File:** `.env.local` (not committed to Git — in `.gitignore`)

```env
RESEND_API_KEY=<your_resend_api_key>
EMAIL_TO=buildstacksolution@gmail.com
EMAIL_FROM=BuildStack Solutions <onboarding@resend.dev>
```

> 🔒 Never commit this file. The API key grants email-sending access to your Resend account.

---

### ✅ `vite.config.ts` Updated — Dev Proxy Added
**Date:** 2026-06-15

**What changed:**
- Added `server.proxy` block so `/api/*` calls during `npm run dev` are forwarded to `http://localhost:3001` (the local Express email server)

---

### ✅ `package.json` Updated — New Scripts
**Date:** 2026-06-15

**Scripts added:**
```json
"server": "node server.cjs",
"dev:all": "start \"Email API\" node server.cjs && vite"
```

---

### ✅ `server.cjs` Created — Local Email API Server
**Date:** 2026-06-15

**Purpose:** Provides a local `/api/send-email` endpoint during development so the contact form works before deploying to Vercel.

---

### ✅ `README.md` Created
**Date:** 2026-06-13

**What was added:**
- Full project documentation
- Tech stack table
- Project structure overview
- Getting started guide
- Contact form setup guide
- Section index
- Team members list
- Portfolio projects list
- Pricing plans
- Full changelog (v1.0.0 → v1.2.0)

**Updated:** 2026-06-15 — Reflects Resend migration and new local dev server setup

---

### ✅ `project.md` Created (This File)
**Date:** 2026-06-13

**What it does:**
- Tracks every change made to the project, organized by topic
- Auto-updated by AI assistant whenever a change is made
- Each topic has its own section with timestamps and details

---

### ✅ Portfolio Section Simplified
**Date:** 2026-06-14

**What was done:**
- Removed Portfolio filter tabs (All / Business / E-commerce / Web Apps)
- Removed all portfolio projects except "SR Chains"
- Portfolio now displays only the SR Chains e-commerce project

**Result:** Portfolio section now shows single featured project without category filtering
