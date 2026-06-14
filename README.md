# 🏗️ BuildStack Solutions — Website

> Official website for **BuildStack Solutions** — a web development agency based in Salem, Tamilnadu. Built with React + TypeScript + Vite + Tailwind CSS.

---

## 🌐 Live Preview

Run locally at: `http://localhost:5174/`

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
| **Formspree** | (API) | Contact Form Email Delivery |

---

## 📁 Project Structure

```
website-dev/
├── src/
│   ├── App.tsx          # Main app — all sections & components
│   ├── index.css        # Global styles
│   └── main.tsx         # React entry point
├── public/              # Static assets
├── image/               # Team member photos
├── index.html           # HTML template
├── .env                 # Environment variables (not in Git)
├── .env.example         # Env variable template
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript config
```

---

## 🔧 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Start the dev server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

---

## 📧 Contact Form Setup

The contact form uses **[Formspree](https://formspree.io/)** (free, 50 submissions/month).

- **Endpoint:** `https://formspree.io/f/mgobpplp`
- **Receives to:** `logajith0490@gmail.com`
- No API keys or environment variables required — works out of the box.

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

### [v1.3.0] — Portfolio Simplified
- ✅ Removed Portfolio filter tabs (All / Business / E-commerce / Web Apps)
- ✅ Removed all portfolio projects except SR Chains
- ✅ Portfolio now displays single featured project

---

### [v1.0.0] — Initial Build
- ✅ Set up Vite + React + TypeScript + Tailwind CSS project
- ✅ Built full single-page website with all sections:
  - Hero, About, Services, Portfolio, Pricing, Testimonials, Contact, Footer
- ✅ Added Framer Motion animations (fade-in, stagger, scroll-triggered)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll navigation with active link highlight
- ✅ Sticky navbar with blur backdrop
- ✅ Scroll-to-top button
- ✅ Portfolio filter tabs (All / Business / E-commerce / Web Apps)
- ✅ Team member section with photos
- ✅ 3 pricing plan cards with popular badge
- ✅ Testimonials section with star ratings

---

### [v1.1.0] — Contact Form: EmailJS Integration (Initial Attempt)
**Date:** 2026-06-13

- ✅ Integrated `@emailjs/browser` SDK for contact form email delivery
- ✅ Added `.env` with `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- ✅ Added `.env.example` as a template for environment variables
- ⚠️ EmailJS credentials configured: `service_24azuah` / `template_jj4imtq`
- ❌ EmailJS sending failed — moved to Formspree instead

---

### [v1.2.0] — Contact Form: Migrated to Formspree
**Date:** 2026-06-13

- ✅ Removed `@emailjs/browser` dependency from code
- ✅ Replaced EmailJS `send()` with a plain `fetch()` POST to Formspree
- ✅ Formspree endpoint: `https://formspree.io/f/mgobpplp`
- ✅ Form submissions now delivered to `logajith0490@gmail.com`
- ✅ Added proper error handling — shows actual API error message if sending fails
- ✅ No API keys or environment variables needed for form to work
- ✅ Form resets and shows "Thank You" screen on success

---

## 🚀 Future Updates

> This section will be updated automatically as new features and changes are made.

_No upcoming changes planned yet._

---

## 📞 Contact

- **Email:** logajith0490@gmail.com
- **Location:** Salem, Tamilnadu
- **Business:** BuildStack Solutions
