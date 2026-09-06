# KARTHI ATELIER - Contemporary Luxury E-Commerce Web Application

A modern, responsive e-commerce web application for **KARTHI Atelier** specializing in shirts, heavyweight graphic tees, and tailored trousers. Engineered with modern HTML5, Tailwind CSS, and modular Vanilla JavaScript.

---

## 🌟 Key Features

- **Dynamic Multi-Criteria Filtering**: Filter by Category (Shirts, Tees, Pants), Price Slider ($30–$100), Sizes (`S`–`XXL` & Waist `28`–`38`), Fit Profile (*Slim, Regular, Oversized, Relaxed*), and On Sale items.
- **Predictive Search**: Live search bar with instant autocomplete dropdown.
- **Interactive Product Cards**: Dual-image hover crossfade, color variant swatches, quick add size popover, and wishlist toggle.
- **Product Detail Modal (PDP)**: Multi-angle image switcher, live stock indicators, and an **Interactive Measurement Chart / Size Guide** with **Inches (in) / Centimeters (cm)** conversion.
- **Slide-Over Shopping Cart**: Free shipping threshold tracker, quantity controls, and working discount coupon engine (`KARTHI20`, `WELCOME10`, `FREESHIP`).
- **Complete Checkout System**: Multi-step checkout modal supporting Card, UPI / QR simulation, Cash on Delivery, and animated order confirmation with confetti.
- **State Persistence**: Cart, Wishlist, and preferences saved locally via `localStorage`.

---

## 🚀 Quick Start

1. Clone or download this repository:
   ```bash
   git clone https://github.com/rckarthi390-dur/E-commerce.git
   ```
2. Open `index.html` directly in any web browser, or launch a local static server:
   ```bash
   node server.js
   ```
3. Visit `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
E-Commerce/
├── index.html            # Main web application layout
├── css/
│   └── styles.css        # Luxury design tokens, animations, custom scrollbars
├── js/
│   ├── products.js       # Product database (12 items) & config
│   └── app.js            # Reactive application logic & state manager
├── server.js             # Node.js server for cloud deployment
└── assets/
    └── images/           # High-resolution campaign and category visuals
```

---

## 📜 License
MIT License © 2026 KARTHI Atelier.
