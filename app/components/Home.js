"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home.css";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const homeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.set(".headline .word > span", { y: "15vw" });
            gsap.set("#inlineImg", { scale: 0 });

            function runIntro() {
                const intro = gsap.timeline({
                    defaults: { ease: "power3.out" }
                });

                intro
                    .to(".line-1 .word > span", { y: "0vw", duration: 0.9, stagger: 0.1 }, 0.3)
                    .to(".line-2 .word > span", { y: "0vw", duration: 0.9 }, 0.55)
                    .to("#inlineImg", { scale: 1, duration: 0.9, ease: "back.out(1.6)" }, 0.5)
                    .to(".line-3 .word > span", { y: "0%", duration: 0.9, stagger: 0.1 }, 0.75);

                gsap.to("#inlineImg", {
                    y: "+=6",
                    rotation: 2,
                    duration: 2.8,
                    delay: 1.8,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1
                });

                const inlineImg = document.querySelector("#inlineImg");

                if (inlineImg) {
                    inlineImg.addEventListener("mouseenter", () => {
                        gsap.to(inlineImg, { scale: 1.08, rotation: 4, duration: 0.4, ease: "back.out(1.6)" });
                    });

                    inlineImg.addEventListener("mouseleave", () => {
                        gsap.to(inlineImg, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" });
                    });
                }

                ScrollTrigger.create({
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.8,
                    onUpdate: (self) => {
                        const p = self.progress;
                        gsap.set(".headline", { y: -50 * p, opacity: 1 - p * 0.4 });
                    }
                });
            }

            
            window.addEventListener("preloader:complete", runIntro, { once: true });

        }, homeRef);

        return () => {
            ctx.revert();
        };

    }, []);

    return (
        <section ref={homeRef} className="hero">
            <h1 className="headline">
                <div className="line line-1">
                    <span className="word"><span>OBSERVATORIO</span></span>
                    <span className="word"><span>DE</span></span>
                    <span className="inline-img" id="inlineImg" />
                </div>

                <div className="line line-2">
                    <span className="word"><span>INSEGURANÇA</span></span>
                    <span className="word"><span>CLIMATICA</span></span>
                </div>

                <div className="line line-3 line-p">
                    <span className="word">
                        <span>
                            Um observatório para compreender como os riscos
                            ambientais se relacionam com as características
                            sociais, territoriais e urbanas de São João de Meriti.
                        </span>
                    </span>
                </div>
            </h1>
        </section>
    );
}