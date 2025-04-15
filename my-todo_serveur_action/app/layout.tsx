import Logo from "@/app/ui/Logo";
import NavLinks from "@/app/ui/Nav-links";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Background from "./ui/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyTodo avec Next.js",
  description: "Application codée dans la formation Next.js par DonkeyGeek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <header>
          <Logo />
          <div className="nav-links">
            <NavLinks />
          </div>
        </header>
        <main>
           {children}
           <Background />
        </main>
        <footer><p>&copy; DonkeyGeek</p></footer>
      </body>
    </html>
  );
}
