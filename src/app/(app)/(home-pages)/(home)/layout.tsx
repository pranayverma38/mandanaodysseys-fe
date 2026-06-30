import Aside from '@/components/aside'
import AsideSidebarNavigation from '@/components/aside-sidebar-navigation'
import FooterQuickNavigation from '@/components/footer-quick-navigation'
import Footer2 from '@/components/footer2'
import HomeSplashScreen from '@/components/home-splash-screen'
import SectionReadyToExplore from '@/components/section-ready-to-explore'
import Header3 from '@/components/header/header3'
// import HeroSearchFormMobile from '@/components/hero-search-form-mobile/hero-search-form-mobile'
import { MotionDiv } from '@/components/motion-div'
import TravelAgencyJsonLd from '@/components/travel-agency-json-ld'
import 'rc-slider/assets/index.css'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Aside.Provider>
      <HomeSplashScreen />
      <TravelAgencyJsonLd />
      {/* Header */}
      <MotionDiv
        className="absolute top-0 left-0 z-40 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Header3 initSearchFormTab="Experiences" />
      </MotionDiv>
      {/* HeroSearchFormMobile - will display on mobile devices instead of Header-desktop */}
      {/* <div className="sticky top-0 z-20 bg-background shadow-sm lg:hidden">
        <div className="container flex h-20 items-center justify-center">
          <HeroSearchFormMobile />
        </div>
      </div> */}
      {/*  */}
      {children}
      {/*  */}
      <SectionReadyToExplore />
      {/* FooterQuickNavigation - Displays on mobile devices and is fixed at the bottom of the screen */}
      <FooterQuickNavigation />
      {/* Chose footer style here!!!! */}
      <Footer2 variant="dark" /> {/* <Footer /> or <Footer2 /> or <Footer3 /> or <Footer4 />*/}
      {/*  */}
      <AsideSidebarNavigation />
    </Aside.Provider>
  )
}
