import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/admin/SessionProviderWrapper";

const inter = Inter({
  variable: "--font-inter",  // You can define your custom variable here
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "BeyondCode",
  description: "A learning document",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>

        <Toaster
          position="top-center"
          richColors
        />
      </body>
    </html>
  );
}
