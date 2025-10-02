'use client'

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } });
    }, []);

    return (
        <div ref={containerRef} className="text-center bg-primary text-white rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Automate Your Reception?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">Let AI handle calls and scheduling, while you focus on growing your business.</p>
            <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 font-semibold" asChild>
                <Link href="#integration">Enable Calendar Integration</Link>
            </Button>
        </div>
    );
};

export default CTASection;
