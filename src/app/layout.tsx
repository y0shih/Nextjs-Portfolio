import { Providers } from "@/components/providers"
import "./globals.css"
import AnimatedTitle from "@/components/AnimatedTitle"
import Footer from "@/components/Footer"

export const metadata = {
  title: 'Hello',
  description: 'Welcome to my portfolio : ) ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AnimatedTitle />
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
