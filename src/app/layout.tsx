import { Providers } from "@/components/providers"
import "./globals.css"

export const metadata = {
  title: 'Welcome to my portfolio',
  description: 'welcome to my portfolio : ) ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
