import Aside from '@/components/aside'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import FooterQuickNavigation from '@/components/footer-quick-navigation'
import Footer2 from '@/components/footer2'
import Header from '@/components/header/header'
import 'rc-slider/assets/index.css'
import React from 'react'

export default function InspirationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Aside.Provider>
      <div className="relative z-20">
        <Header hasBorderBottom />
      </div>
      {children}
      <FooterQuickNavigation />
      <Footer2 variant="light" />
      <AsideSidebarNavigation />
    </Aside.Provider>
  )
}
