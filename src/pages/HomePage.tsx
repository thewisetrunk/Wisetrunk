import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

const Hero = lazy(() => import("@/components/Hero"));
const About = lazy(() => import("@/components/About"));
const OurWork = lazy(() => import("@/components/OurWork"));
const Contact = lazy(() => import("@/components/Contact"));

const SectionFallback = () => (
  <div className="w-full h-64 animate-pulse bg-muted rounded-md" />
);

const HomePage = () => (
  <>
    <Helmet>
      <title>Home | The Wise Trunk</title>

      <meta
        name="description"
        content="WiseTrunk Edu Foundation empowers young people with skills, resources, and support through peer-based learning programmes in Mumbai, India."
      />

      <meta name="keywords"
        content="wise trunk, education foundation, social emotional learning, youth programs, NGO India"
      />

      <meta property="og:title" content="The Wise Trunk" />
      <meta property="og:url" content="https://thewisetrunk.com" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/social-banner.png" />
    </Helmet>
    <div className="min-h-screen bg-background">
      <main>
        <Suspense fallback={<SectionFallback />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <About isHomePage={true} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <OurWork isHomePage={true} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact isHomePage={true} />
        </Suspense>
      </main>
    </div>
  </>
);

export default HomePage;