import Navbar from "@/components/Navbar"
import HeroSection from "@/components/home/HeroSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import IntegrationSection from "@/components/home/IntegrationSection"
import DemoSection from "@/components/home/DemoSection"
import CTASection from "@/components/home/CTASection"

export default function Page() {
    return (
        <main className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section id="hero" className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <HeroSection />
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <FeaturesSection />
            </section>

            {/* Integration Section */}
            <section id="integration" className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <IntegrationSection />
            </section>

            {/* Demo / Testimonials */}
            <section id="demo" className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <DemoSection />
            </section>

            {/* CTA Footer */}
            <footer id="cta" className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <CTASection />
            </footer>
        </main>
    )
}
