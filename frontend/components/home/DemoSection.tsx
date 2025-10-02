'use client'

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const DemoSection = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } });
    }, []);

    return (
        <div ref={containerRef} className="text-center">
            <h2 className="text-4xl font-semibold text-primary mb-8">See It in Action</h2>
            <div className="relative w-full max-w-3xl mx-auto aspect-video bg-gray-200 rounded-xl overflow-hidden shadow">
                {/* Replace with real video embed later */}
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="AI Receptionist Demo"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default DemoSection;
