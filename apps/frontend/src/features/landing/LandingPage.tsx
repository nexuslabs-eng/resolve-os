import Navbar from "@/features/landing/marketing/Navbar";
import Hero from "@/features/landing/marketing/Hero";
import Footer from "@/features/landing/marketing/Footer";

const LandingPage = () => {

    return (
        <>
        <Navbar />
        <main>
            <Hero />
            {/* <ProblemSection />
            <LifecycleSection />
            <InvestigationSection />
            <ControlSection />
            <CapabilitiesSection />
            <FinalCta /> */}
        </main>
        <Footer />
      </>
    )
}

export default LandingPage;