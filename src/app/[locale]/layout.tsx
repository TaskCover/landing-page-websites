import "react-datepicker/dist/react-datepicker.css";
import "public/styles/index.css";
import "public/styles/html.css";
import "public/styles/date-picker.css";

import AppProvider from "contexts/AppProvider";
import { openSans } from "public/material/typography";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Locale } from "constant/types";
import { NS_COMMON } from "constant/index";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(NS_COMMON);

  return {
    title: t("app.title"),
    description: t("app.description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  const messages = (await import(`dictionaries/${locale}`)).default;

  return (
    <html lang={locale}>
      <body className={openSans.className}>
        <AppProvider locale={locale} messages={messages}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
