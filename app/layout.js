"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/custom/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

// export const metadata = {
//   title: "Waste Management System",
//   description: "A project for managing waste in a better way",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const routesWithoutSidebar = ["/login", "/register", "/"];

  if (routesWithoutSidebar.includes(pathname)) {
    return (
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
          <Toaster />
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Sidebar>{children}</Sidebar>
        <Toaster />
      </body>
    </html>
  );
}
