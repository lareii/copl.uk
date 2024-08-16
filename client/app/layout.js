import { Inter } from "next/font/google";

import "@/styles/main.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "copl.uk - %s",
    default: "copl.uk",
  },
  description: "zihin çöplüğün, kafana göre...",
  keywords: ["copluk", "copl.uk", "çöplük"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" translate="no">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
