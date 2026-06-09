import type { Metadata } from "next";

import {Box} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { PlayArrow, PeopleAlt, Storage as StorageIcon } from '@mui/icons-material';

import UWBanner from "@chtc/web-components/UW/Banner"
import theme, {fonts} from "@chtc/web-components/themes/chtc"

import "./globals.css"
import Header from "@/components/Header";
import Analytics from "@/components/Analytics";
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "FabAID",
  description: "A web application ",
	metadataBase: new URL(`https://${process.env.HOSTNAME}`),
};

const pages = [
  { label: 'Repositories', path: '/repository/', icon: <StorageIcon /> },
  { label: 'Team', path: '/team/', icon: <PeopleAlt /> },
]

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
						<Header pages={pages} />
						{children}
              <Footer />
          </ThemeProvider>
        </Box>
      </AppRouterCacheProvider>
    </html>
  );
}
