import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar";
import { CartProvider } from "./context/CartContext";
import { Suspense } from "react";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexStore — Redefining Digital Retail",
  description: "Experience the pinnacle of premium shopping at NexStore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${inter.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          {/* ─── Master Content Shell ─── */}
          <div className="main-layout-container">
             <Suspense fallback={null}>
                <Sidebar />
             </Suspense>
             <main className="main-content-flow">
                {children}
             </main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
