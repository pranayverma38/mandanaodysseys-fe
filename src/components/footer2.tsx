import Logo from '@/components/logo'
import {
  FOOTER_COPYRIGHT,
  FOOTER_TAGLINE,
  footerLegal,
  footerMandanaOdysseys,
  footerSocial,
  footerTalkToUs,
} from '@/data/footer-navigation'

type Footer2Variant = 'light' | 'dark'

interface Footer2Props {
  variant?: Footer2Variant
}

const footerVariantStyles: Record<
  Footer2Variant,
  {
    root: string
    tagline: string
    heading: string
    link: string
    bottomBar: string
    copyright: string
    social: string
    logoVariant: 'full-colored' | 'full-white'
  }
> = {
  light: {
    root: 'border-t border-border',
    tagline: 'text-sm/6 text-balance text-gray-600 dark:text-neutral-400',
    heading: 'text-sm/6 font-semibold text-gray-900 dark:text-neutral-300',
    link: 'text-sm/6 text-gray-600 hover:text-gray-900 dark:text-neutral-400',
    bottomBar:
      'mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 dark:border-gray-700 md:flex md:items-center md:justify-between',
    copyright: 'text-sm/6 text-gray-600 md:order-1 dark:text-neutral-400',
    social: 'text-gray-600 hover:text-gray-800 dark:text-neutral-400',
    logoVariant: 'full-colored',
  },
  dark: {
    root: 'bg-black',
    tagline: 'text-sm/6 text-balance text-neutral-400',
    heading: 'text-sm/6 font-semibold text-neutral-200',
    link: 'text-sm/6 text-neutral-400 hover:text-white',
    bottomBar: 'mt-16 border-t border-neutral-800 pt-8 sm:mt-20 lg:mt-24 md:flex md:items-center md:justify-between',
    copyright: 'text-sm/6 text-neutral-400 md:order-1',
    social: 'text-neutral-400 hover:text-white',
    logoVariant: 'full-white',
  },
}

export default function Footer2({ variant = 'light' }: Footer2Props) {
  const styles = footerVariantStyles[variant]

  return (
    <footer className={styles.root}>
      <div className="container section-space pb-8!">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Logo variant={styles.logoVariant} size="lg" />
            <p className={styles.tagline}>{FOOTER_TAGLINE}</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className={styles.heading}>Mandana Odysseys</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerMandanaOdysseys.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className={styles.link}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.heading}>Legal</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerLegal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className={styles.link}>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.heading}>Talk to us</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerTalkToUs.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className={`${styles.link} inline-flex items-center gap-2`}>
                      <item.icon aria-hidden="true" className="size-5 shrink-0" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>{FOOTER_COPYRIGHT}</p>
          <div className="mt-8 flex gap-x-6 md:order-2 md:mt-0">
            {footerSocial.map((item) => (
              <a key={item.name} href={item.href} className={styles.social}>
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
