# Vividh Talks - Premium Studio & Podcast Platform

Vividh Talks is a high-end, cinematic web platform designed for a modern podcasting studio and media house. It features a premium "Black Space" aesthetic, real-time data integration, and a high-performance architecture optimized for global reach.

## ✨ Premium Features

- **Cinematic Dark Aesthetic**: A deep, immersive dark theme (`#050505`) with high-contrast typography and subtle micro-animations.
- **Smart YouTube Integration**: 
  - Real-time data fetching with **6-second network timeouts** to prevent hanging.
  - **LocalStorage Caching**: Instant load times for returning users by caching API responses.
  - **Dynamic Timestamp Seeking**: Interactive video navigation directly from YouTube descriptions.
- **Interactive Experience**:
  - **Intelligent Testimonial Slider**: Auto-calculating pagination dots based on screen size (1, 2, or 3 cards per view).
  - **Horizontal Shorts Carousel**: Optimized bingeable content scroller for highlights.
- **Booking & Growth**:
  - **Dual-Channel Contacting**: Integrated WhatsApp (instant chat) and Email (Formspree) booking flows.
  - **WhatsApp Floating Button**: Always-on access to the studio with a pre-filled greeting.
- **Performance Optimized**:
  - **React Lazy Loading**: Code-splitting for lightning-fast initial page loads on mobile data.
  - **Global Suspense Loader**: A branded spinning animation to ensure a smooth transition between pages.

## 🛠️ Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Vanilla CSS (Custom Design System)
- **Icons**: Lucide React
- **Metadata**: YouTube Data API v3
- **Routing**: React Router 6 (SPA Optimized)

## 🔑 Environment Variables (.env)

To enable live features, create a `.env` file in the root directory:

```env
# YouTube API Key from Google Cloud Console
VITE_YOUTUBE_API_KEY=your_api_key_here

# Your Studio's WhatsApp Number (Country Code + Number, no spaces)
VITE_WHATSAPP_NUMBER=918252754340

# Formspree ID for Email Notifications
VITE_FORMSPREE_ID=your_form_id_here
```

## 🎨 Design System

- **Primary Background**: `#050505` (Deep Space Black)
- **Primary Accent**: `#FF4D00` (Vividh Orange)
- **Star Rating Color**: `#E51D24` (High-Impact Red)
- **Typography**: 
  - Headings: `Clash Display`
  - Body: `DM Sans` / `Satoshi`
  - Metadata: `JetBrains Mono`

## 🚀 Getting Started

1. **Install**: `npm install`
2. **Configure**: Add your `.env` variables.
3. **Develop**: `npm run dev`
4. **Build**: `npm run build`

---

*Vividh Talks — Your Story. Your Rules. Our Studio.*
