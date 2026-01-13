# FarmXchange 🌾🚀

FarmXchange is a full-stack marketplace web app that connects **Farmers (Sellers)** and **Buyers** to buy and sell farm products.  
Built with **Next.js (App Router)**, **Firebase Auth**, and **MongoDB Atlas**, with modern UI, smooth state management, and production deployment on **Vercel**.

🌐 **Live Demo:** https://farm-x-change-sigma.vercel.app

---

## ✅ Tech Stack
- **Next.js (App Router)** + **TypeScript**
- **Tailwind CSS**
- **Firebase** (Authentication) + **react-firebase-hooks**
- **MongoDB Atlas** (Database)
- **Zustand** (State management)
- **Axios** (API calls)
- **Vercel** (Deployment)
- **react-hot-toast** (Notifications)
- **canvas-confetti** (Celebration effects)
- **lucide-react** (Icons)

---

## ✨ Features

### Buyer
- Browse farmers and their products  
- Add items to cart (grouped by farmer)  
- Update quantity / remove items  
- Place orders  
- View order receipt / summary  

### Farmer / Officer (Seller)
- View received orders  
- View customer info + ordered items
- Edit products and delete products
- Add products and update products

### Core
- Firebase authentication flow  
- MongoDB Atlas integration for storing app data  
- Zustand-powered cart + shared state  
- Responsive UI with Tailwind CSS  
- Toast feedback + confetti effects  

---

## 📁 Project Structure

```txt
app/
lib/
public/
types/

.env.local
README.md
package.json
next.config.ts
tsconfig.json
postcss.config.mjs
eslint.config.mjs
