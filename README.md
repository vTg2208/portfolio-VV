# 🚀 Vishnu Vardhan Theegela — Interactive Portfolio


**A modern, interactive portfolio showcasing innovative web development skills**

[Live Demo](https://your-portfolio-url.netlify.app)

---

## 🎯 Overview

An immersive, **interactive portfolio website** built with cutting-edge web technologies.  
Features include a **functional terminal interface**, **animated UI elements**, and **modern design patterns**—all optimized for performance and responsiveness.

### ✨ Highlights
- 🖥️ **Interactive Terminal** — Explore portfolio via a CLI-inspired interface  
- 🎨 **Dynamic Themes** — Smooth dark/light mode with glassmorphism  
- 🌊 **Animated Backgrounds** — Particle effects & gradient meshes  
- 📱 **Responsive Design** — Mobile-first & adaptive layout  
- ⚡ **Blazing Fast** — Powered by Vite for rapid load times  

---

## 🚀 Features

### 🎮 Interactive
- **Terminal Interface** — Navigate using commands  
- **Magnetic Elements** — UI reacts to cursor movement  
- **3D Tilt Cards** — Hover-based depth effects  
- **Scroll Animations** — Parallax & reveal effects  

### 📊 Dynamic Content
- **Live GitHub Activity** — Real-time repo updates  
- **Medium Blog Feed** — Latest articles fetched dynamically  
- **Project Timeline** — Interactive journey visualization  
- **Skill Orbs** — Animated skill proficiency indicators  

### 🎨 Advanced UI/UX
- **Glassmorphism** — Frosted glass aesthetic  
- **Smooth Page Transitions** — Seamless navigation  
- **Loading Animations** — Engaging feedback  
- **Floating Action Menu** — Quick-access shortcuts  

### 📞 Communication
- **EmailJS Integration** — Working contact form  
- **Social Links** — Direct access to profiles  
- **CV Download** — Easy resume access  

---

## 🛠️ Tech Stack

**Frontend**
- React 18.2.0
- TypeScript 5.2.2
- Vite 5.0.0

**Styling**
- Tailwind CSS 3.3.5
- Lucide Icons
- Custom CSS Animations

**Functionality**
- EmailJS
- Intersection Observer API
- Local Storage API

**Dev Tools**
- ESLint
- PostCSS + Autoprefixer

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** ≥ v18  
- **npm** ≥ v8 or **yarn**  
- **Git**

### Installation
```bash
# 1. Clone repo
git clone https://github.com/vTg2208/portfolio-VV.git
cd portfolio-VV

# 2. Install deps
npm install
# or
yarn install

# 3. Setup env
cp .env.example .env
# Add your EmailJS keys to .env

# 4. Start dev server
npm run dev
# or
yarn dev
````
---

## 📁 Structure

```
src/
├── components/         # Reusable + section-specific components
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
├── constants/          # Config/data
├── utils/              # Helper functions
└── App.tsx             # Main app
```

---

## ⚙️ Configuration

### EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create a service + template
3. Add IDs & public key to `.env`

```env
REACT_APP_EMAILJS_SERVICE_ID=your_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_key
```

---

## 🎨 Themes

* **Dark** — #3B82F6 / #8B5CF6 / #EC4899 / #111827
* **Light** — #1E40AF / #7C3AED / #BE185D / #F9FAFB

---

## 🚀 Deployment

**Netlify**

```bash
npm run build
```

* Build command: `npm run build`
* Publish dir: `dist`

**Vercel**

```bash
npm install -g vercel
vercel
```

---

## 📱 Browser Support

| Browser | Version |
| ------- | ------- |
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

---

## 📈 Performance

* **Lighthouse**: 95+ score
* **Optimized**: Code-splitting + lazy loading
* **SEO**: Semantic HTML + meta tags

---

## 🤝 Contributing

1. Fork the repo
2. Create branch:

```bash
git checkout -b feature/new-feature
```

3. Commit & push
4. Open PR

---

## 📄 License

[MIT License](LICENSE)

---

⭐ **If you like this project, consider giving it a star!**
