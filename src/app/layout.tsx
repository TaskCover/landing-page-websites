import "public/styles/index.css";
import AppProvider from "contexts/AppProvider";
import { openSans } from "public/material/typography";

export const metadata = {
  title: "Task Cover",
  description: "Description for Task Cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
