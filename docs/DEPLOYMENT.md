# Samaroh Production Deployment Guide

Samaroh (समारोह) is designed for cloud-native deployment with Next.js 16 standalone output on **Vercel** or containerized Docker platforms.

---

## 1. Environment Configuration

Create a `.env.production` or configure deployment environment variables in your Vercel project settings:

```ini
# Google GenAI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
AI_PROVIDER=gemini

# Firebase Cloud Synchronization (Optional for multi-device sync; local-first operates offline)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 2. Deploying to Vercel

```bash
# Deploy to Vercel production
vercel --prod
```
