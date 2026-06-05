import { ScrollSmootherProvider } from '@/components/scroll-smoother-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { DirectionProvider } from '@/components/ui/direction'
import { isSmoothScrollEnabled } from '@/lib/smooth-scroll'
import { cn } from '@/lib/utils'
import { LocaleProvider } from '@/providers/locale-provider'
import '@/styles/tailwind.css'
import clsx from 'clsx'
import { rootMetadata } from '@/lib/seo'
import { Google_Sans_Flex, Marcellus, Playfair_Display, Style_Script } from 'next/font/google'
import 'rc-slider/assets/index.css'

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-sans',
})

const playfair_display = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
  variable: '--font-serif',
})

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-marcellus',
})

const styleScript = Style_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-style-script',
})

export const metadata = rootMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={process.env.NEXT_PUBLIC_THEME_DIR === 'rtl' ? 'ar' : 'en'}
      dir={process.env.NEXT_PUBLIC_THEME_DIR}
      suppressHydrationWarning
      className={cn(
        clsx(googleSansFlex.variable, playfair_display.variable, marcellus.variable, styleScript.variable),
        'font-sans',
        isSmoothScrollEnabled() && 'smooth-scroll-enabled'
      )}
    >
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <DirectionProvider direction={process.env.NEXT_PUBLIC_THEME_DIR} dir={process.env.NEXT_PUBLIC_THEME_DIR}>
            <LocaleProvider>
              <ScrollSmootherProvider>
                {children}

                {/* CustomizeControl demo removed */}
              </ScrollSmootherProvider>
            </LocaleProvider>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
