import SectionGridPosts3 from '@/components/blog/section-grid-post-3'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import FeatureSection2 from '@/components/feature-section-2'

import { Heading } from '@/components/heading'
import InspirationFutureGetawaysSection from '@/components/inspiration-future-getaways-section'
import NewsletterSection from '@/components/newsletter-section-1'
import { RevealInView } from '@/components/reveal-in-view'
import SectionDreamDestination from '@/components/section-dream-destination'
import SectionGridAuthorBox from '@/components/section-grid-author-box'
import SectionGridCategoryBox from '@/components/section-grid-category-box'
import SectionGridFeaturedListings from '@/components/section-grid-featured-listings'
import SectionGroupCategoriesCarousel from '@/components/section-group-categories-carousel'
import SectionPackagesByDuration from '@/components/section-packages-by-duration'
import SectionCharmsOfAsia from '@/components/section-charms-of-asia'
import HeroSection2 from '@/components/section-hero-2'
import StickyFloatingReelPlayer from '@/components/sticky-floating-reel-player'
import SectionHowItWork2 from '@/components/section-how-it-work-2'
import SectionInterestingInfor from '@/components/section-interesting-infor'
import SectionListingsCarousel from '@/components/section-listings-carousel'
import SectionStickyGridScroll from '@/components/section-sticky-grid-scroll'
import SectionTravelQuote from '@/components/section-travel-quote'
import SectionWhyUs from '@/components/section-why-us'
import { Text } from '@/components/text'
import { getAuthors } from '@/data/authors'
import { getEliteGatewayGroups } from '@/data/elite-gateways'
import { getPackagesByDurationGroups } from '@/data/packages-by-duration'
import { getBlogPosts } from '@/data/data'
import { getItineraries, getStayListings } from '@/data/listings'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
async function Page() {
  const itineraries = await getItineraries()
  const eliteGatewayGroups = await getEliteGatewayGroups()
  const packagesByDurationGroups = await getPackagesByDurationGroups()

  return (
    <main className="relative section-space-bottom">
      <HeroSection2 />
      <StickyFloatingReelPlayer />

      <section className="relative z-20 bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-0.5 -translate-y-1/2 bg-background"
        />
        <div className="container py-8 sm:py-10 lg:py-14">
          <RevealInView>
            <SectionCharmsOfAsia />
          </RevealInView>
        </div>
      </section>

      <div className="container py-8 sm:py-10 lg:py-14">
        {/* Effect when appear screen one time */}
        {/* <RevealInView>
          <SectionDreamDestination />
        </RevealInView> */}
        <RevealInView className="pb-0">
          <InspirationFutureGetawaysSection heading="" className="text-center" />
        </RevealInView>
      </div>

      {/* <section className="bg-zinc-50 section-space-xl dark:bg-zinc-900">
        <RevealInView className="container">
          <SectionGridFeaturedListings stayListings={stayListings.slice(0, 4)} />
        </RevealInView>
      </section> */}

      

      <div className="sticky-grid-scroll-intro bg-zinc-50 dark:bg-zinc-900">
        <section className="section-space-xl">
          <RevealInView className="container section-space">
            <SectionListingsCarousel
              heading={`Hand Picked <span class="font-style-script text-[1.3em] text-[#FC6200] italic">Tours  </span> For You`}
              listings={itineraries}
              cardType="experience"
            />
          </RevealInView>
          <RevealInView className="container">
            <SectionGroupCategoriesCarousel
              groupCategories={eliteGatewayGroups}
              showCategoryOverlay={false}
              showCategoryCenteredLabel
            />
          </RevealInView>
          <RevealInView className="container section-space pb-0">
            <SectionPackagesByDuration groups={packagesByDurationGroups} />
          </RevealInView>
        </section>
      </div>

      <SectionStickyGridScroll />

      <RevealInView className="container section-space-xl md:hidden">
        <SectionTravelQuote />
      </RevealInView>

      {/* <RevealInView className="container section-space-xl">
        <SectionInterestingInfor />
      </RevealInView> */}



      {/* <RevealInView className="container section-space-xl">
        <SectionHowItWork2 />
      </RevealInView> */}

      {/* <div className="bg-zinc-50 section-space-xl dark:bg-zinc-900">
        <RevealInView className="container">
          <SectionListingsCarousel listings={stayListings.slice(0, 8)} cardType="stay" />
        </RevealInView>
        <RevealInView className="container section-space-xl pb-0">
          <SectionListingsCarousel
            listings={stayListings.slice(0, 8).reverse()}
            cardType="stay"
            heading={`Popular homes <span data-slot="italic">in Bali</span>`}
          />
        </RevealInView>
      </div> */}

      {/* <div className="container section-space-xl">
        <RevealInView className="container">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-5">
            <Heading>
              Explore <span data-slot="italic">near by you</span>
            </Heading>
            <Button color="light" href="/stay-search-with-map">
              Explore destinations
              <ArrowRightIcon className="size-4! rtl:rotate-180" />
            </Button>
          </div>
          <SectionGridCategoryBox categories={categories.slice(0, 8)} />
        </RevealInView>

      </div> */}

      {/* <section className="section-space-top pb-px">
        <RevealInView className="container">
          <SectionWhyUs />
        </RevealInView>
      </section> */}

      {/* <RevealInView className="container section-space-xl">
        <FeatureSection2 variant="up" />
      </RevealInView> */}

      {/* <RevealInView className="container py-5">
        <Divider />
      </RevealInView> */}

      {/* <RevealInView className="container section-space">
        <SectionGridPosts3 posts={posts.slice(0, 4)} />
      </RevealInView> */}

      {/* <RevealInView className="container section-space-smaller pt-8">
        <NewsletterSection />
      </RevealInView> */}
    </main>
  )
}

export default Page
