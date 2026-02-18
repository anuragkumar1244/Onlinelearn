import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OnlineLearn - Premium Student Learning App",
  description: "iOS-inspired premium learning experience for classes 5th to 12th"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
