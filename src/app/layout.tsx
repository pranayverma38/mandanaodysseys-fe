import { AuthModalRoot } from '@/components/auth/auth-modal-root'
import { NavigationProgress } from '@/components/navigation-progress'
import { ScrollSmootherProvider } from '@/components/scroll-smoother-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { DirectionProvider } from '@/components/ui/direction'
import { isSmoothScrollEnabled } from '@/lib/smooth-scroll'
import { cn } from '@/lib/utils'
import { LocaleProvider } from '@/providers/locale-provider'
import { AmbientAudioProvider } from '@/providers/ambient-audio-provider'
import '@/styles/tailwind.css'
import clsx from 'clsx'
import { rootMetadata } from '@/lib/seo'
import { Google_Sans_Flex, Marcellus, Playfair_Display, Style_Script } from 'next/font/google'
import 'rc-slider/assets/index.css'

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  variable: '--font-family-sans',
})

const playfair_display = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
  variable: '--font-family-serif',
})

const marcellus = Marcellus({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-marcellus',
})

const styleScript = Style_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-style-script',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Condensed&display=swap"
        />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <DirectionProvider direction={process.env.NEXT_PUBLIC_THEME_DIR} dir={process.env.NEXT_PUBLIC_THEME_DIR}>
            <LocaleProvider>
              <NavigationProgress />
              <AuthModalRoot>
                <AmbientAudioProvider>
                  <ScrollSmootherProvider>
                    {children}

                    {/* CustomizeControl demo removed */}
                  </ScrollSmootherProvider>
                </AmbientAudioProvider>
              </AuthModalRoot>
            </LocaleProvider>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
