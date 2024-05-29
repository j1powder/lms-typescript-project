

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { DataContextProvider } from "@/context/DataContext";
import { EmployeeContextProvider } from "@/context/EmployeeContext";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';

import { Button } from 'primereact/button'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <ClerkProvider
    appearance={{
      baseTheme: [dark],
      variables: { colorPrimary: '#1189dd' },
      signIn: { 
        baseTheme: [dark], 
        variables: { colorPrimary: '#1189dd' }
      }
    }}>
    <html lang="en">
      <body className={inter.className}>

        <PrimeReactProvider >
          <DataContextProvider>
            <EmployeeContextProvider>
        {children}
        </EmployeeContextProvider>
        </DataContextProvider>
        </PrimeReactProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
