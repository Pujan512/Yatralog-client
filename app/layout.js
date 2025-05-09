
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
})

export const metadata = {
  title: "YatraLog - A log for your travel",
  description: "A website where you can browse and upload travel related blogs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex flex-col justify-between min-h-screen`}
      >
        <NavBar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
