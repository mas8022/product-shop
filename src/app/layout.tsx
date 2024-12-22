import type { Metadata } from "next";
import "./globals.css";
import "atropos/css";
import Navbar from "@/components/templates/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/templates/footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Navbar />
        {children}
        <Footer />

        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
