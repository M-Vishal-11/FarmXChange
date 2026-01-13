# FarmXchange 🌾🚀

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=000)
![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white)

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
- Add products  
- Update products  
- Delete products  

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
```

---

## 📂 Folder Explanation
- **app/** — pages, layouts, routes (Next.js App Router)
- **lib/** — helpers (db connection, utils, auth helpers)
- **public/** — static assets (images, icons)
- **types/** — TypeScript types/interfaces


---

## ⚙️ Local Setup
Run these commands in your terminal (project root).

### 1) Clone the repo

```
git clone "https://github.com/M-Vishal-11/FarmXChange.git"
cd farmxchange
```

### 2) Install dependencies

```
npm install
```

### 3) Create `.env.local`
Create a file named **.env.local** in the project root.

Notes:
- **Do NOT commit** ```.env.local``` to GitHub
- Restart the dev server after changing env variables

##### Template:
```
# MongoDB Atlas
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
```

**Security note:** never expose real passwords in README. Keep credentials only in .env.local / Vercel env settings.

### 4) Run the development server

```
npm run dev
```

Open:
<http://localhost:3000>

---

## 🔥 Firebase Setup (Quick)
1. Create a Firebase project in **Firebase Console**
2. Enable **Authentication** → choose a sign-in method (Email/Password or Google)
3. Create a **Web App** in Firebase → copy the config values
4. Paste them into ```.env.local``` as ```NEXT_PUBLIC_...``` keys

---

## 🗄️ MongoDB Atlas Setup (Quick)
1. Create a cluster in **MongoDB Atlas**
2. Create a **Database User** (username/password)
3. Copy the connection string -> set it as ```MONGODB_URI```

### ✅ IP Whitelist (Important)
- Add your current IP: ```xxx.xxx.xxx.xxx/32```
- Avoid ```0.0.0.0/0``` (public access) unless temporary testing

---

## 🧯 Troubleshooting
- **MongoDB connection fails:** Add your IP in Atlas → Network Access, and confirm `MONGODB_URI` is correct.
- **Env changes not working:** Restart the dev server after editing `.env.local`.
- **Firebase login not working:** Verify `NEXT_PUBLIC_...` keys match Firebase Web App config.
- **404 on API route:** Ensure the route exists under `app/api/.../route.ts` and method matches (GET/POST).
- **SSL / TLS error with MongoDB Atlas:** Ensure Atlas Network Access allows your IP and your connection string has `retryWrites=true&w=majority`. Try updating Node.js to LTS and reinstall deps.
- **Vercel build fails:** Ensure all env vars exist in Vercel → Settings → Environment Variables, then redeploy.

---

## 🚀 Deployment (Vercel)
This project is deployed on Vercel:
<https://farm-x-change-sigma.vercel.app>

To deploy your own:
1. Push the repo to GitHub
2. Import the repo in Vercel
3. Add environment variables:
   Vercel → Project → Settings → Environment Variables
4. Deploy ✅

---

## 📜 Scripts

```bash
npm run dev      # start dev server
npm run build    # build production
npm run start    # run production build
npm run lint     # lint project
```

---

## 🧩 Libraries Used
- **zustand** — state management
- **axios** — API requests
- **tailwindcss** — styling
- **firebase** + **react-firebase-hooks** — auth
- **react-hot-toast** — notifications
- **canvas-confetti** — celebration effects
- **lucide-react** — icons

---

## 🔒 Security Notes:
- Never commit secrets (MongoDB password, Firebase keys meant to be private, etc.)
- Keep credentials in:
  - ```.env.local``` (local)
  - Vercel Environment Variables (production)

---

## 👥 Contributors
- Vishal M — Full Stack Developer
- Varun Velsami — Idea & Feedback
