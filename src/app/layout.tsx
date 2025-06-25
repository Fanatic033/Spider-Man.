import { Provider } from "@/shared/api/provider";
import { Header } from "@/shared/components/shared/header";
import type { Metadata } from "next";
import { Bangers } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

// const ComicNeue = Comic_Neue({
//   weight: ["300", "400", "700"],
//   subsets: ["latin"],
//   variable: "--font-comic-neue",
// });

// const Orbit = Orbitron({
//   weight: ["400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
//   variable: "--font-orbitron",
// });

const Banger = Bangers({
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-banger",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Spider-Man",
    default: "Spider-Man | Все сериалы и эпизоды",
  },
  description:
    "Откройте для себя все сериалы и эпизоды о Человеке-пауке. Подробная информация о сезонах, сериях и героях любимого супергероя Marvel.",
  keywords:
    "Spider-Man, Человек-паук, сериалы Marvel, эпизоды Spider-Man, супергерои, Marvel шоу, Marvel сериалы, человек паук 1994",
  openGraph: {
    title: "Spider-Man | Все сериалы и эпизоды Человека-паука",
    description:
      "Смотрите все сезоны и эпизоды сериалов о Человеке-пауке. Подробное описание серий, рейтинги, постеры и многое другое.",
    images: "https://i.ebayimg.com/images/g/cJ8AAOSwyWNjOJEs/s-l1200.jpg", // замени на актуальный URL обложки
    type: "website",
    locale: "ru_RU",
  },
  icons: [
    {
      rel: "icon",
      url: "/man.png", // замени на актуальный путь к иконке
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${Banger.className} antialiased comi`}>
          <Header />
          <NextTopLoader color={"#64B32C"} height={1} />
          {children}
          <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
            <aside>
              <p>
                Copyright © {new Date().getFullYear()} - All right reserved by
                Fanatic033 Industries Ltd
              </p>
            </aside>
          </footer>
        </body>
      </Provider>
    </html>
  );
}
// ${ComicNeue.className}  ${Orbit.className}
