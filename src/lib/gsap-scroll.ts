import { isSmoothScrollEnabled } from '@/lib/smooth-scroll'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

export function waitForScrollSmoother(): Promise<ScrollSmoother | null> {
  if (!isSmoothScrollEnabled()) {
    return Promise.resolve(null)
  }

  return new Promise((resolve) => {
    const smoother = ScrollSmoother.get()
    if (smoother) {
      resolve(smoother)
      return
    }

    let attempts = 0
    const maxAttempts = 100

    const check = () => {
      const ready = ScrollSmoother.get()
      if (ready) {
        resolve(ready)
        return
      }

      attempts += 1
      if (attempts >= maxAttempts) {
        resolve(null)
        return
      }

      requestAnimationFrame(check)
    }

    check()
  })
}
