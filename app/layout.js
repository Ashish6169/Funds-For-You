import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    icons: {
      icon: '/logo.png',
    },
  title: "Fund for You",
  description: "Collect fund for good cause",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <Provider>
          <Navbar />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
        </Provider>
      </body>

    </html>
  );
}
