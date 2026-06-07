import Logo from '@/components/logo'
import {
  FOOTER_COPYRIGHT,
  FOOTER_TAGLINE,
  footerLegal,
  footerMandanaOdysseys,
  footerSocial,
  footerTalkToUs,
} from '@/data/footer-navigation'

export default function Footer3() {
  return (
    <footer className="border-t border-border">
      <div className="container section-space pb-8!">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Logo variant="full-colored" size="lg" />
            <p className="text-sm/6 text-balance text-gray-600 dark:text-neutral-400">{FOOTER_TAGLINE}</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm/6 font-medium text-gray-900 dark:text-neutral-300">Mandana Odysseys</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerMandanaOdysseys.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-neutral-400">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm/6 font-medium text-gray-900 dark:text-neutral-300">Legal</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerLegal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900 dark:text-neutral-400">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm/6 font-medium text-gray-900 dark:text-neutral-300">Talk to us</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerTalkToUs.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 text-sm/6 text-gray-600 hover:text-gray-900 dark:text-neutral-400"
                    >
                      <item.icon aria-hidden="true" className="size-5 shrink-0" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {footerSocial.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-800 dark:text-neutral-400">
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-neutral-400">{FOOTER_COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  )
}
