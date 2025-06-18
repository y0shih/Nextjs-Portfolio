import { Providers } from "@/components/providers"
import "./globals.css"
import AnimatedTitle from "@/components/AnimatedTitle"

export const metadata = {
  title: 'trongphu.tech',
  description: 'Portfolio ',
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
        </Providers>
      </body>
    </html>
  )
}
