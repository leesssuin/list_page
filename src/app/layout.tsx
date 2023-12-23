import React from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import StyledComponentsRegistry from "~/lib/styledComponents";
import RecoilRootProvider from "~/lib/recoilRootProvider";
import GlobalStyles from "~/styles/globalStyle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "상품 리스트 페이지",
  description: "가방"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <RecoilRootProvider>{children}</RecoilRootProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
