"use client";

import "./methodology.css";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Methodology() {
    const section = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".image-expand",
                {
                    width: "30vw",
                    y: 100,
                },
                {
                    width: "100vw",
                    y: 50,

                    ease: "none",

                    scrollTrigger: {
                        trigger: ".methodology",
                        start: "top 60%",
                        end: "+=100%",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={section} className="methodology">
            <div className="image-expand">
                <img
                    src="/imagem.png"
                    alt=""
                />
            </div>

            <div className="image-caption">
                <span>Foto: Gilberto Rocha</span>
            </div>
        </section>
    );
}