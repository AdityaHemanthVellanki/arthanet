# ArthaNet - AI-Powered Decentralized Credit Scoring

![ArthaNet](/public/logo.svg)

ArthaNet is an AI-powered decentralized credit scoring and DeFi automation platform built on Ethereum. This repository contains the code for ArthaNet's landing page designed to drive waitlist signups.

## 🚀 Features

- **Sleek Dark UI**: Modern interface with gradients and soft neon glows
- **Responsive Design**: Mobile-first approach that works across all devices
- **Interactive Elements**: Subtle animations to enhance user experience
- **Waitlist Integration**: Ready to connect to backend services for email collection

## 💻 Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icon packs

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the landing page.

## 📋 Project Structure

- `/src/components` - Reusable UI components
- `/src/app` - Next.js app directory structure with page components
- `/public` - Static assets including the logo

## 🔧 Customization

The landing page can be easily customized by editing the following files:

- Update colors in `/src/app/globals.css`
- Modify component content in `/src/components/`

## 📝 Waitlist Integration

To connect the waitlist form to a backend:

1. Update the `handleSubmit` function in the `Waitlist.tsx` and `Hero.tsx` components
2. Integrate with services like Airtable, Notion API, or Firebase

## 🚀 Deployment

The landing page is ready for deployment on platforms like Vercel, Netlify, or your preferred hosting service.

```bash
npm run build
```

## 📄 License

This project is available for your use. Customize it to match your specific branding and requirements.
