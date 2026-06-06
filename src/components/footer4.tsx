import Logo from '@/components/logo'
import {
  FOOTER_COPYRIGHT,
  FOOTER_TAGLINE,
  footerLegal,
  footerMandanaOdysseys,
  footerSocial,
  footerTalkToUs,
} from '@/data/footer-navigation'

export default function Footer4() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-700">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8">
            <Logo variant="full-colored" size="lg" />
            <p className="text-sm/6 text-balance text-gray-600 dark:text-neutral-400">{FOOTER_TAGLINE}</p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-neutral-300">Mandana Odysseys</h3>
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
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-neutral-300">Legal</h3>
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
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-neutral-300">Talk to us</h3>
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
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-neutral-300">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm/6 text-gray-600 dark:text-neutral-400">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <form className="mt-6 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:w-64 sm:text-sm/6 xl:w-full dark:bg-neutral-800 dark:text-neutral-300 dark:ring-gray-700"
              />
              <div className="mt-4 sm:ms-4 sm:mt-0 sm:shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24 dark:border-gray-700">
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
