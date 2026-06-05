declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_THEME_DIR: 'rtl' | 'ltr'
    NEXT_PUBLIC_ENABLE_SMOOTH_SCROLL?: 'true' | 'false'
    NEXT_PUBLIC_SITE_URL?: string
  }
}
