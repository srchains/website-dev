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
- Replaced entire `handleSubmit` logic:

  **Before (EmailJS):**
  ```ts
  await emailjs.send(serviceId, templateId, { from_name, from_email, ... });
  ```

  **After (Formspree):**
  ```ts
  const res = await fetch("https://formspree.io/f/mgobpplp", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, phone, service, budget, message }),
  });
  ```

- Added proper error handling — shows real error message from Formspree API if it fails
- Formspree endpoint: `https://formspree.io/f/mgobpplp`
- Submissions go to: `logajith0490@gmail.com`

**Result:** ✅ Contact form now works — emails are delivered to Gmail inbox

---

### 📬 Current Email Setup (Active)

| Item | Value |
|---|---|
| **Provider** | Formspree |
| **Endpoint** | `https://formspree.io/f/mgobpplp` |
| **Receives to** | `logajith0490@gmail.com` |
| **Free limit** | 50 submissions / month |
| **Fields sent** | name, email, phone, service, budget, message |
| **API keys needed** | None |

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
| **Services** | 6 service cards with hover animations |
| **Portfolio** | Filterable grid (All / Business / E-commerce / Web Apps) |
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
| 2026-06-13 | EmailJS credentials kept in file but no longer used — Formspree requires no env vars |

**Current `.env` contents:**
```env
VITE_EMAILJS_SERVICE_ID=service_24azuah
VITE_EMAILJS_TEMPLATE_ID=template_jj4imtq
VITE_EMAILJS_PUBLIC_KEY=m3X-ei08utGAdmdQx
```
> ⚠️ These are unused now (Formspree replaced EmailJS), but kept for reference.

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

---

### ✅ `project.md` Created (This File)
**Date:** 2026-06-13

**What it does:**
- Tracks every change made to the project, organized by topic
- Auto-updated by AI assistant whenever a change is made
- Each topic has its own section with timestamps and details

---
