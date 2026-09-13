# 🚀 CollectionLab Deployment Guide

This guide provides clear, step-by-step instructions to deploy the **CollectionLab** project (Spring Boot Backend + React Frontend) to **Render** (and optionally **Vercel** for the frontend).

---

## 📋 Prerequisites

1. A **GitHub account** with the `CollectionLab` repository pushed to GitHub.
2. A free account on **[Render.com](https://render.com/)**.
3. (Optional) A free account on **[Vercel.com](https://vercel.com/)**.

---

## ⚙️ Option 1: Automated Deployment on Render using `render.yaml` (Recommended)

Render can automatically configure both the backend and frontend using the included `render.yaml` Blueprint file.

### Steps:
1. Push all your code changes to GitHub:
   ```bash
   git add .
   git commit -m "Fix backend configuration and add Render deployment setup"
   git push origin main
   ```
2. Log in to [Render Dashboard](https://dashboard.render.com/).
3. Click the **New +** button in the top right and select **Blueprint**.
4. Connect your GitHub repository (`CollectionLab`).
5. Render will automatically detect `render.yaml` and create two services:
   - `collectionlab-backend` (Docker Web Service)
   - `collectionlab-frontend` (Static Site)
6. Click **Apply**.
7. Once `collectionlab-backend` finishes deploying, copy its URL (e.g. `https://collectionlab-backend.onrender.com`).
8. Go to `collectionlab-frontend` settings -> **Environment Variables**, set:
   - `VITE_API_BASE_URL` = `https://collectionlab-backend.onrender.com/api`
9. Click **Save Changes** and trigger a manual redeploy of the frontend.

---

## 🛠️ Option 2: Manual Step-by-Step Deployment on Render

### Step 1: Deploy the Backend (Spring Boot Service)

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New + -> Web Service**.
2. Connect your GitHub repository.
3. Configure the Web Service:
   - **Name**: `collectionlab-backend`
   - **Region**: Choose closest to you (e.g., Singapore / Oregon / Frankfurt)
   - **Root Directory**: `backend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./Dockerfile` (or `backend/Dockerfile` if Root Directory is left empty)
   - **Instance Type**: `Free`
4. Click **Advanced** and add Environment Variables:
   - `PORT`: `8080` (or leave default)
5. Click **Create Web Service**.
6. Wait for the build to finish. Once live, copy your backend URL (e.g., `https://collectionlab-backend.onrender.com`).

---

### Step 2: Deploy the Frontend (React + Vite)

#### Method A: Deploy Frontend on Render (Static Site)
1. In Render Dashboard, click **New + -> Static Site**.
2. Connect your GitHub repository.
3. Configure the Static Site:
   - **Name**: `collectionlab-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. In **Environment Variables**, add:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://collectionlab-backend.onrender.com/api` *(replace with your actual backend URL)*
5. Under **Redirects/Rewrites**, add a rewrite rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
6. Click **Create Static Site**.

---

#### Method B: Deploy Frontend on Vercel (Alternative)
1. Log in to [Vercel Dashboard](https://vercel.com/).
2. Click **Add New -> Project** and import your GitHub repository.
3. Set **Framework Preset**: `Vite`
4. Set **Root Directory**: `frontend`
5. Expand **Environment Variables** and add:
   - `VITE_API_BASE_URL` = `https://collectionlab-backend.onrender.com/api`
6. Click **Deploy**.

---

## 🔍 How to Verify Your Live Deployment

1. **Test Backend Health**:
   Open `https://<your-backend-render-url>.onrender.com/api/arraylist` in your browser.
   It should return a JSON response representing the initial state:
   ```json
   {"elements":[],"size":0,"capacity":10}
   ```
2. **Test Code Viewer Endpoint**:
   Open `https://<your-backend-render-url>.onrender.com/api/code/ArrayList` in your browser.
   It should return the Java source code of `CustomArrayList.java`:
   ```json
   {"className":"CustomArrayList.java","collection":"ArrayList","code":"package com.collectionlab.collections;\n..."}
   ```
3. **Test Frontend Application**:
   Open your deployed frontend URL. Test operations on ArrayList, LinkedList, HashMap, TreeMap, and PriorityQueue, view execution steps, and test the Benchmark runner.

---

## ⚠️ Troubleshooting Render Free Tier Notes

- **Cold Starts**: Render's free tier Web Services go to sleep after 15 minutes of inactivity. When a request is made, it takes 30-50 seconds to spin back up. The frontend includes automatic retry and notification logic for cold starts.
- **CORS Errors**: The backend includes global CORS configuration (`WebConfig.java`) that permits requests from any domain.
- **Port Errors**: The backend dynamically binds to `server.port=${PORT:8080}`, preventing port binding issues on Render.
