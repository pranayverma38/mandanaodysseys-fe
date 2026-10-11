// Custom Node.js ESM loader — intercepts .png/.jpg/.jpeg imports and returns
// a Next.js StaticImageData-shaped object so tsx can process itinerary files
// that import avatar images.
export function resolve(specifier, context, nextResolve) {
  if (/\.(png|jpe?g|gif|svg|webp)$/.test(specifier)) {
    return {
      shortCircuit: true,
      url: new URL('./mock-image.mjs', import.meta.url).href,
    }
  }
  return nextResolve(specifier, context)
}
