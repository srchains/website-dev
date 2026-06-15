import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Menu, X, ChevronRight, Star, ExternalLink, Check,
  Code, ShoppingCart, Server, Wrench, TrendingUp, Palette,
  Quote, Mail, Phone, MapPin, Send, ArrowUp,
  Sparkles, Shield, Clock, Globe
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PortfolioItem {
  category: string;
  title: string;
  tech: string;
  imageLabel: string;
  gradient: string;
  url?: string;
  image?: string;
}

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
  image: string;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  gradient: string;
}

interface Testimonial {
  name: string;
  business: string;
  review: string;
  rating: number;
  initials: string;
  color: string;
}

// ── Data ──────────────────────────────────────────────────────
const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const services: ServiceCard[] = [
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Business Website Design",
    description: "Professional, mobile-friendly business websites that establish your brand identity and drive customer engagement."
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "E-commerce Development",
    description: "Full-featured online stores with secure payment gateways, inventory management, and seamless checkout."
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Django / Flask Web Apps",
    description: "Custom web applications built with Python frameworks — robust, scalable, and tailored to your needs."
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Website Maintenance & Support",
    description: "Ongoing updates, security patches, backups, and performance optimization to keep your site running smoothly."
  },
{
    icon: <Code className="w-8 h-8" />,
    title: "Portfolio Websites",
    description: "Stunning personal portfolio sites for freelancers, photographers, artists, and creative professionals."
  },
];

const portfolioItems: PortfolioItem[] = [
  { category: "ecommerce", title: "SR Chains", tech: "React.js · CSS · HTML", imageLabel: "E-commerce Store", gradient: "from-yellow-500 to-amber-600", url: "https://srchains.com/", image: "https://srchains.com/cdn/shop/files/B2_492505f8-0e8f-4a4f-a29f-4298de4a2b31.jpg?v=1771480045&width=600" },
];

const teamMembers: TeamMember[] = [
  { name: "Boopathi", role: "Frontend Developer", initials: "B", color: "from-blue-500 to-indigo-600", image: "/image/boopathi.png" },
  { name: "Logajith", role: "Full Stack Developer", initials: "L", color: "from-purple-500 to-pink-600", image: "/image/logajith.png" },
  { name: "Rudra Prasad", role: "Backend Developer", initials: "RP", color: "from-cyan-500 to-blue-600", image: "/image/rudra prasad.png" },
  { name: "Prabhu", role: "Project Manager", initials: "P", color: "from-emerald-500 to-teal-600", image: "/image/prabhu.png" },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "₹3,000 – ₹5,000",
    description: "Perfect for freelancers and professionals",
    features: [
      "1-Page Portfolio Website",
      "Mobile Responsive Design",
      "Contact Form Integration",
      "Social Media Links",
      "Basic SEO Setup",
      "1 Month Free Maintenance"
    ],
    popular: true,
    cta: "Most Popular",
    gradient: "from-slate-500 to-slate-700"
  },
  {
    name: "Business",
    price: "₹8,000 – ₹12,000",
    description: "Ideal for growing businesses and startups",
    features: [
      "Up to 5 Pages Website",
      "Mobile Responsive Design",
      "Contact Form Integration",
      "Blog/News Section",
      "Advanced SEO Optimization",
      "Google Analytics Setup",
      "3 Months Free Maintenance",
      "Email Support"
    ],
    cta: "Get Started",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    name: "E-commerce",
    price: "₹10,000 – ₹15,000",
    description: "Full-featured online stores",
    features: [
      "Up to 50 Products",
      "Secure Payment Gateway",
      "Shopping Cart System",
      "Order Management",
      "Inventory Management",
      "Customer Accounts",
      "6 Months Free Maintenance",
      "Priority Support",
      "SSL Certificate Included"
    ],
    cta: "Get Started",
    gradient: "from-violet-500 to-purple-600"
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Vikram Mehta",
    business: "Flavor Paradise Restaurant",
    review: "BuildStack Solution transformed our online presence completely. Our new website brought in 40% more online orders within the first month. The team was incredibly responsive and understood exactly what we needed.",
    rating: 5,
    initials: "VM",
    color: "from-amber-500 to-orange-600"
  },
  {
    name: "Ananya Reddy",
    business: "Reddy Realty Group",
    review: "Professional, affordable, and timely. They built a stunning real estate portal that made listing properties so much easier. The attention to detail and modern design really sets them apart from other agencies.",
    rating: 5,
    initials: "AR",
    color: "from-emerald-500 to-teal-600"
  },
  {
    name: "Suresh Kumar",
    business: "EduTrack Academy",
    review: "The school management system they developed streamlined our entire administration process. Attendance, grades, fees — all automated. BuildStack Solution delivered beyond our expectations within our budget.",
    rating: 5,
    initials: "SK",
    color: "from-blue-500 to-indigo-600"
  },
];

// ── Animation Variants ────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

// ── Sub-components ────────────────────────────────────────────

/* ── Logo Icon ── */
function LogoIcon({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top Slab */}
      <path
        d="M50 12L82 28L50 44L18 28Z"
        fill="url(#logoTopGrad)"
      />
      <path d="M18 28V34L50 50V44L18 28Z" fill="url(#logoLeftGrad)" />
      <path d="M82 28V34L50 50V44L82 28Z" fill="url(#logoRightGrad)" />

      {/* Middle Slab */}
      <path
        d="M50 30L82 46L50 62L18 46Z"
        fill="url(#logoTopGrad)"
      />
      <path d="M18 46V52L50 68V62L18 46Z" fill="url(#logoLeftGrad)" />
      <path d="M82 46V52L50 68V62L82 46Z" fill="url(#logoRightGrad)" />

      {/* Bottom Slab */}
      <path
        d="M50 48L82 64L50 80L18 64Z"
        fill="url(#logoTopGrad)"
      />
      <path d="M18 64V70L50 86V80L18 64Z" fill="url(#logoLeftGrad)" />
      <path d="M82 64V70L50 86V80L82 64Z" fill="url(#logoRightGrad)" />

      <defs>
        <linearGradient id="logoTopGrad" x1="18" y1="28" x2="82" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="logoLeftGrad" x1="18" y1="28" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="logoRightGrad" x1="50" y1="44" x2="82" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0F2C]/95 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button onClick={() => handleNav("#home")} className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 lg:w-9 lg:h-9 group-hover:scale-110 transition-transform duration-300">
              <LogoIcon />
            </div>
            <div>
              <span className="text-lg lg:text-xl font-bold text-white tracking-tight">BuildStack</span>
              <span className="text-lg lg:text-xl font-bold text-blue-400 tracking-tight"> Solution</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#contact")}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A0F2C]/98 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#contact")}
                className="w-full mt-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl"
              >
                Get a Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ── Hero Section ── */
function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0F2C]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "4s" }} />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-blue-400/60 rounded-full animate-float" />
        <div className="absolute top-40 right-[15%] w-3 h-3 bg-cyan-400/40 rounded-full animate-float-delayed" />
        <div className="absolute bottom-40 left-[20%] w-2.5 h-2.5 bg-blue-300/50 rounded-full animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/3 right-[25%] w-1.5 h-1.5 bg-indigo-400/60 rounded-full animate-float-delayed" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-1/4 right-[10%] w-2 h-2 bg-blue-500/50 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Salem Trusted Web Agency</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight mb-6"
            >
              We Build Modern
              <br />
              <span className="gradient-text">Websites for Businesses</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              From business websites to e-commerce stores and custom web apps — we help your brand grow online with modern, affordable solutions.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={() => handleScroll("#contact")}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Free Quote
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleScroll("#portfolio")}
                className="px-8 py-4 border-2 border-gray-600/50 text-gray-300 font-semibold rounded-xl hover:border-blue-500/50 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                View Portfolio
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 justify-center lg:justify-start">
              {[
                { value: "5+", label: "Projects" },
                { value: "100%", label: "Client Satisfaction" },
                { value: "1+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative w-[400px] h-[500px] bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-3xl border border-white/10 backdrop-blur-sm p-8 animate-float">
                {/* Code Window */}
                <div className="bg-[#0A0F2C]/80 rounded-xl border border-white/10 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-xs text-gray-500">index.html</span>
                  </div>
                  <div className="p-4 text-xs font-mono leading-relaxed">
                    <span className="text-blue-400">&lt;div</span><span className="text-purple-400"> className</span><span className="text-green-400">=&quot;hero&quot;</span><span className="text-blue-400">&gt;</span><br />
                    <span className="text-gray-500 ml-4">{"// Your next website starts here"}</span><br />
                     <span className="text-blue-400 ml-4">&lt;h1&gt;</span><span className="text-white">Welcome to BuildStack</span><span className="text-blue-400">&lt;/h1&gt;</span><br />
                    <span className="text-blue-400 ml-4">&lt;p&gt;</span><span className="text-gray-400">Built with ❤️ in Salem, Tamilnadu</span><span className="text-blue-400">&lt;/p&gt;</span><br />
                    <span className="text-blue-400">&lt;/div&gt;</span>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-sm font-bold text-white shadow-xl">
                  Premium Quality
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-sm font-bold text-white shadow-xl">
                  Affordable Pricing
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Section Header ── */
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 lg:mb-16"
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0F2C] mb-4">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">{subtitle}</p>
      )}
      <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
    </motion.div>
  );
}

/* ── Services Section ── */
function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What We Offer"
          subtitle="Comprehensive web solutions tailored to your business needs — from design to deployment."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-6 lg:p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-500/30 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-600/10 text-blue-600 group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white transition-all duration-500 mb-5">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0A0F2C] mb-3">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{service.description}</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Portfolio Section ── */
function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 lg:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Work"
          subtitle="Showcasing some of our favorite projects — each built with passion and precision."
        />

        {/* Portfolio Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {portfolioItems.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
              >
                {/* Image */}
                <div className={`relative h-48 lg:h-56 overflow-hidden`}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className={`h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                      <Globe className="w-12 h-12 text-white/60 mx-auto mb-2" />
                      <span className="text-white font-bold text-lg block">{item.imageLabel}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white/90 backdrop-blur-sm text-[#0A0F2C] font-semibold rounded-xl flex items-center gap-2 hover:bg-white transition-all">
                        <ExternalLink className="w-4 h-4" /> View Project
                      </a>
                    ) : (
                      <button className="px-5 py-2.5 bg-white/90 backdrop-blur-sm text-[#0A0F2C] font-semibold rounded-xl flex items-center gap-2 hover:bg-white transition-all">
                        <ExternalLink className="w-4 h-4" /> View Project
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 lg:p-6">
                  <h3 className="text-lg font-bold text-[#0A0F2C] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.tech}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ── About Section ── */
function About() {
  const values = [
    { icon: <Shield className="w-6 h-6" />, title: "Quality", description: "We write clean, maintainable code and design pixel-perfect interfaces that your users will love." },
    { icon: <Sparkles className="w-6 h-6" />, title: "Affordability", description: "Premium web solutions at prices that make sense for Indian small businesses and startups." },
    { icon: <Clock className="w-6 h-6" />, title: "On-Time Delivery", description: "We respect your time. Every project is delivered on schedule, with transparent communication throughout." },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Who We Are"
          subtitle="A young, passionate team of developers dedicated to helping local businesses thrive online."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              Founded in Salem, Tamilnadu, <strong className="text-[#0A0F2C]">BuildStack Solution</strong> is a team of passionate developers 
              and designers who believe every business deserves a stunning online presence. We specialize in building 
              modern, responsive websites and web applications that drive real results.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              Whether you&apos;re a local restaurant, a growing startup, or an established enterprise — we bring your 
              vision to life with cutting-edge technology, creative design, and a personal touch.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((val) => (
                <div key={val.title} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50/50 transition-colors">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    {val.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A0F2C]">{val.title}</h4>
                    <p className="text-sm text-gray-500">{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats / Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#0A0F2C] to-[#1a1f4e] rounded-3xl p-8 lg:p-10 text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px]" />
              
              <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
              
              <div className="space-y-6">
                {[
                  { number: "5+", label: "Projects Delivered", desc: "Across diverse industries" },
                    { number: "100%", label: "Client Satisfaction", desc: "Every client loves our work" },
                    { number: "1+", label: "Years of Experience", desc: "Building since 2025" },
                  { number: "24/7", label: "Support Available", desc: "We&apos;re always here to help" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                    <div className="text-2xl font-bold gradient-text min-w-[60px]">{item.number}</div>
                    <div>
                      <div className="font-semibold text-sm">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Members */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-center text-[#0A0F2C] mb-10">Meet Our Team</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:border-blue-500/20 hover:shadow-lg transition-all duration-500"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden mb-4">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-[#0A0F2C]">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Pricing Section ── */
function Pricing() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section id="pricing" className="relative py-20 lg:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Simple, Transparent Pricing"
          subtitle="No hidden fees. No surprises. Just honest pricing for quality web solutions."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-500 ${
                plan.popular
                  ? "bg-[#0A0F2C] text-white ring-2 ring-blue-500 shadow-xl shadow-blue-500/10 scale-[1.02] lg:scale-110"
                  : "bg-white text-[#0A0F2C] border border-gray-100 hover:shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <h3 className={`text-xl font-bold mb-1 ${plan.popular ? "text-white" : "text-[#0A0F2C]"}`}>{plan.name}</h3>
              <p className={`text-sm mb-4 ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>{plan.description}</p>
              
              <div className={`text-2xl font-bold mb-6 ${plan.popular ? "text-white" : "text-[#0A0F2C]"}`}>
                {plan.price}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-sm">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.popular ? "text-blue-400" : "text-blue-500"
                    }`} />
                    <span className={plan.popular ? "text-gray-300" : "text-gray-600"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={scrollToContact}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                    : "bg-gray-100 text-[#0A0F2C] hover:bg-gray-200"
                }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Testimonials Section ── */
function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What Clients Say"
          subtitle="Don&apos;t take our word for it — hear from the businesses we&apos;ve helped."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 lg:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-500"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-blue-500/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{t.review}</p>

              {/* Client Info */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#0A0F2C]">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.business}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Contact Section ── */
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "3000",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else {
      const digitsOnly = formData.phone.replace(/\D/g, "");
      if (digitsOnly.length !== 10) {
        newErrors.phone = "Phone number must be exactly 10 digits.";
      }
    }
    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setError("");

    try {
      const budgetValue = formData.budget === "50000" ? "₹50,000+ (Custom)" : `₹${parseInt(formData.budget).toLocaleString("en-IN")}`;
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          budget: budgetValue,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: '', email: '', phone: '', service: '', budget: '3000', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      console.error("Send Email Error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#0A0F2C]">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Let&apos;s Work Together</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to take your business online? Fill out the form and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="mt-4 mx-auto w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.name ? "border-red-500 focus:ring-red-500/50" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/50"
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="buildstacksolution@gmail.com"
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.email ? "border-red-500 focus:ring-red-500/50" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/50"
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.phone ? "border-red-500 focus:ring-red-500/50" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/50"
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Service Needed</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.service ? "border-red-500 focus:ring-red-500/50" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/50"
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all`}
                  >
                    <option value="" className="bg-[#0A0F2C]">Select a service</option>
                    <option value="business-website" className="bg-[#0A0F2C]">Business Website</option>
                    <option value="ecommerce" className="bg-[#0A0F2C]">E-commerce Development</option>
                    <option value="webapp" className="bg-[#0A0F2C]">Web App (Django/Flask)</option>
                    <option value="maintenance" className="bg-[#0A0F2C]">Maintenance & Support</option>
                    <option value="portfolio" className="bg-[#0A0F2C]">Portfolio Website</option>
                    <option value="other" className="bg-[#0A0F2C]">Other</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-300">Budget Range</label>
                    <span className="text-sm font-bold text-blue-400">
                      {formData.budget === "50000" || parseInt(formData.budget) >= 50000
                        ? "₹50,000+"
                        : `₹${parseInt(formData.budget || "3000").toLocaleString("en-IN")}`}
                    </span>
                  </div>
                  <div className="relative pt-2">
                    <input
                      type="range"
                      name="budget"
                      min="3000"
                      max="50000"
                      step="1000"
                      value={formData.budget || "3000"}
                      onChange={handleChange}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                      <span>₹3,000</span>
                      <span>₹25,000</span>
                      <span>₹50,000+</span>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      errors.message ? "border-red-500 focus:ring-red-500/50" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/50"
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1.5">
                      <span className="inline-block w-1 h-1 bg-red-400 rounded-full" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}
                </div>
              </div>
            )}
          </motion.form>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
              <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:buildstacksolution@gmail.com" className="text-white font-medium hover:text-blue-400 transition-colors">
                       buildstacksolution@gmail.com
                     </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp</p>
                    <a href="https://wa.me/919876543210" className="text-white font-medium hover:text-blue-400 transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                     <p className="text-white font-medium">Salem, Tamilnadu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-48 lg:h-64">
              <iframe
                title="BuildStack Solution Location - Salem, Tamilnadu"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3909.5!2d78.152002!3d11.647098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1718470000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#06091f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button onClick={() => handleNav("#home")} className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 group-hover:scale-110 transition-transform duration-300">
                <LogoIcon />
              </div>
               <span className="font-bold text-white">
                 BuildStack <span className="text-blue-400">Solution</span>
               </span>
            </button>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              We build modern websites for businesses. Based in Salem, Tamilnadu, serving clients worldwide.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button onClick={() => handleNav(link.href)} className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.title}>
                  <button onClick={() => handleNav("#services")} className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:buildstacksolution@gmail.com" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
                  buildstacksolution@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/919876543210" className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="text-gray-500 text-sm">Salem, Tamilnadu</li>
              <li>
                <button onClick={() => handleNav("#contact")} className="inline-block mt-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                  Get Free Quote
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} BuildStack Solution. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Scroll to Top ── */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-xl shadow-blue-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Main App ── */
export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
