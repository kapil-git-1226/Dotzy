# Dotzy - URL Shortener 🔗

A modern, full-featured URL shortener built with React and Supabase. Create short links, track analytics, and share QR codes with ease.

## ✨ Features

- **🔗 URL Shortening** - Convert long URLs into short, shareable links
- **🎨 Custom URLs** - Create personalized short links with custom aliases
- **📊 Analytics Dashboard** - Track clicks, locations, and device statistics
- **📱 QR Code Generation** - Automatic QR code creation for each shortened URL
- **🌍 Geolocation Tracking** - See where your clicks are coming from
- **📱 Device Analytics** - Monitor clicks by device type (mobile/desktop)
- **🔐 User Authentication** - Secure login and registration system
- **📈 Interactive Charts** - Beautiful visualizations using Recharts
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Real-time Updates** - Instant data synchronization

## 🚀 Live Demo

Visit the live application: [https://dotzy.vercel.app](https://dotzy.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4, Radix UI
- **Backend**: Supabase (Database, Authentication, Storage)
- **Charts**: Recharts
- **QR Codes**: react-qrcode-logo
- **Icons**: Lucide React
- **Validation**: Yup
- **Deployment**: Vercel

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kapil-git-1226/Dotzy.git
   cd Dotzy/URLShrtnr

2. **Install dependencies**
   ```bash
   npm install

3. **Set up environment variables**
   Create a .env file in the root directory and add your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_anon_key

4. **Set up Supabase Database**
   Create the following tables in your Supabase database:
   -URLs Table:
   ```bash
   CREATE TABLE urls (
   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
   title TEXT NOT NULL,
   original_url TEXT NOT NULL,
   short_url TEXT UNIQUE NOT NULL,
   custom_url TEXT UNIQUE,
   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
   qr TEXT,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
  5. **Clicks Table:**
     ```bash
      CREATE TABLE clicks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     url_id UUID REFERENCES urls(id) ON DELETE CASCADE,
     city TEXT,
     country TEXT,
     device TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );

  6. **Set up Supabase Storage**
     -Create the following buckets in Supabase Storage:
      - qrs (for QR code images)
      - profile-pic (for user profile pictures)
    
      **The application will be available at**
      ```bash
      http://localhost:5173

  8. **🎯 Usage**
     
      **1. Create an Account**
      - Sign up with email and password
      - Upload a profile picture
    
     **2. Shorten URLs**
      - Enter a long URL on the homepage or dashboard
      - Optionally add a custom title and alias
      - Generate QR code automatically
        
     **3. Track Analytics**
      - View click statistics
      - Monitor geographic distribution
      - Analyze device usage patterns
        
     **4. Manage Links**
      - Search through your shortened URLs
      - Download QR codes
      - Delete unwanted links



**👨‍💻 Author**
Kapil Gangwar

**GitHub: @kapil-git-1226**
**Made with 💖 by Kapil Gangwar**
