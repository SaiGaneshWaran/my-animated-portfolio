import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';

export const metadata: Metadata = {
  title: "Saiganeshwaran",
  description: "The animated 3D portfolio of Saiganeshwaran, a passionate Computer Science student and developer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700,800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/Images/saiganeshwaran-logo.png" />
        {/* Optionally, add a <meta name="viewport" ... /> for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}