import "public/styles/index.css";
import AppProvider from "contexts/AppProvider";
import { openSans } from "public/material/typography";

export const metadata = {
  title: "Taskcover",
  description: "Description for Taskcover",
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
