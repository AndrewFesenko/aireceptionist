'use client'

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const IntegrationSection = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } });
    }, []);

    return (
        <div ref={containerRef} className="text-center bg-white/70 rounded-2xl shadow p-12">
            <h2 className="text-4xl font-semibold text-primary mb-6">Calendar Integration</h2>
            <p className="text-gray-600 mb-10">Connect your preferred calendar in just one click. No hassle, no credentials sharing.</p>
            <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" variant="outline" className="flex items-center gap-2" onClick={() => window.location.href="/api/auth/google"}>
                    <FcGoogle size={24}/> Connect Google
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2" onClick={() => window.location.href="/api/auth/microsoft"}>
                    <FaMicrosoft size={22}/> Connect Microsoft
                </Button>
            </div>
        </div>
    );
};

export default IntegrationSection;
