import type { Metadata } from "next";

import {Box} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import theme, {fonts} from "@chtc/web-components/themes/chtc"

import "./globals.css"
import Analytics from "@/components/Analytics";
import { SiteHeader, SiteFooter } from "@/components/design";

export const metadata: Metadata = {
  title: "FabAID",
  description:
    "A national fabric of open data services for data-intensive and AI-driven research, operated by the Center for High Throughput Computing at UW–Madison.",
	metadataBase: new URL(`https://${process.env.HOSTNAME}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.map(font => font.className).join(' ')}>
			{ process.env.NEXT_PUBLIC_MATOMO_URL && process.env.NEXT_PUBLIC_MATOMO_SITE_ID &&
				<Analytics url={process.env.NEXT_PUBLIC_MATOMO_URL} siteId={process.env.NEXT_PUBLIC_MATOMO_SITE_ID} />
			}
      <AppRouterCacheProvider>
        <Box component={"body"} sx={{ margin: 0, padding: 0 }}>
          <ThemeProvider theme={theme}>
						<SiteHeader />
						{children}
            <SiteFooter />
          </ThemeProvider>
        </Box>
      </AppRouterCacheProvider>
    </html>
  );
}
