'use client';

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ParticlesBackground from "@/components/ParticlesBackground";

const HeroSection = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 });
        gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3 });
        gsap.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5 });
        gsap.fromTo(buttonsRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 });
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative w-full min-h-screen flex items-center justify-center px-4"
        >
            {/* Particles always behind */}
            <ParticlesBackground />

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <h1 ref={titleRef} className="text-5xl md:text-6xl font-bold text-primary mb-6">
                    Smarter Reception. Seamless Scheduling.
                </h1>
                <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Your AI Receptionist that answers calls, books appointments, and syncs with your calendar instantly.
                </p>
                <div ref={buttonsRef} className="flex flex-wrap justify-center gap-6">
                    <Button size="lg" className="bg-[#86198f] text-white rounded-full px-8 py-6" asChild>
                        <Link href="#integration">Connect Calendar</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 py-6" asChild>
                        <Link href="#demo">Watch Demo</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
