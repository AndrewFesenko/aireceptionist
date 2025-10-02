'use client'

import { useRef } from "react";
import { Phone, Calendar, Settings, MessageSquare } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
    { title: "AI Call Handling", icon: <Phone className="w-8 h-8" />, description: "Automatically answer calls, route inquiries, and take messages." },
    { title: "Smart Scheduling", icon: <Calendar className="w-8 h-8" />, description: "Seamlessly sync with Google or Microsoft calendars." },
    { title: "No Credentials Sharing", icon: <Settings className="w-8 h-8" />, description: "Secure OAuth — no password exchanges needed." },
    { title: "Customizable Prompts", icon: <MessageSquare className="w-8 h-8" />, description: "Adapt responses to match your brand voice." },
];

const FeaturesSection = () => {
    const headerRef = useRef(null);
    const featuresRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(headerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, scrollTrigger: { trigger: headerRef.current, start: "top 85%" } });
        gsap.fromTo(featuresRef.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.2, duration: 1, scrollTrigger: { trigger: featuresRef.current, start: "top 80%" } });
    }, []);

    return (
        <div>
            <div ref={headerRef} className="text-center mb-12">
                <h2 className="text-4xl font-semibold text-primary">Why Choose Our Receptionist</h2>
            </div>
            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((f) => (
                    <div key={f.title} className="bg-white rounded-xl border p-6 shadow hover:shadow-md transition">
                        <div className="mb-4 text-primary">{f.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                        <p className="text-gray-600">{f.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesSection;
