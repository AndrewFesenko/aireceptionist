"use client";
import { useEffect } from "react";

export default function ParticlesBackground() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            require("particles.js");
            const particlesJS = (window as any).particlesJS;
            if (particlesJS) {
                particlesJS.load("particles-js", "/particles.json", () => {
                    console.log("✅ Particles loaded");
                });
            }
        }
    }, []);

    return <div id="particles-js" />; // no need for inset classes
}
