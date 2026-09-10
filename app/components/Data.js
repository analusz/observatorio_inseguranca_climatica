"use client";

import './data.css'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            document.querySelectorAll(".number").forEach((element) => {
                const target = Number(element.dataset.value);
                const counter = { value: 0 };

                const decimals = Number.isInteger(target) ? 0 : 2;

                gsap.to(counter, {
                    value: target,
                    duration: 2,
                    ease: "power3.out",

                    onUpdate: () => {
                        element.textContent = counter.value.toLocaleString("pt-BR", {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals,
                        });
                    },

                    scrollTrigger: {
                        trigger: element,
                        start: "top 100%",
                        toggleActions: "play none none none",
                    },
                });
            });

            gsap.from(".indicators", {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power2.out",

                scrollTrigger: {
                    trigger: ".indicators",
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            });


            const titleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".title-reveal",
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
            });

            titleTl
                .fromTo(".title-reveal span",
                    {
                        scale: 1.35,
                    },
                    {
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out"
                    }
                )
                .to(".curtain-left", {
                    xPercent: -100,
                    duration: 1.2,
                    ease: "power3.out"
                }, "<")
                .to(".curtain-right", {
                    xPercent: 100,
                    duration: 1.2,
                    ease: "power3.out"
                }, "<");


        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section className="data" ref={container}>

            <div className='surcafe_temperature'>

                <div className='text-container'>
                    <p className="p1-text">Equação do algoritmo Statistical Mono-Window (SMW)</p>
                    <div className="title-reveal">
                        <span>Temperatura de Superfície</span>
                        <div className="curtain-left"></div>
                        <div className="curtain-right"></div>
                    </div>
                    <p className="p2-text">
                        O dado gerado representa a Temperatura da Superfície Terrestre (LST), que mede o calor real emitido pela superfície — como asfalto, telhados, solo exposto e vegetação —, diferindo da temperatura do ar.
                        O mapa possui uma resolução espacial na qual cada pixel corresponde a um quadrado de 30 metros por 30 metros no solo.
                        Produzido a partir de imagens térmicas capturadas pelo satélite Landsat 9 entre os anos de 2022 e 2025,
                        o valor atribuído a cada ponto reflete a mediana das temperaturas registradas ao longo desse período, descartando automaticamente os dias com presença de nuvens ou sombras.
                        Além disso, o cálculo inclui correções para descontar a interferência do vapor de água na atmosfera e ajustar o efeito da vegetação na emissividade da superfície.
                    </p>

                    <div className='github-container'>
                        <a>
                            <button className="Btn">
                                <span className="svgContainer">
                                    <svg fill="white" viewBox="0 0 496 512" height="20px"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
                                </span>
                                <span className="BG" />

                            </button>
                            <p>Veja o código</p>
                        </a>
                    </div>
                </div>

                <div className='image-container'>
                    <img src="/lst_bairros.png" alt="Imagem de Temperatura de Superfície" />
                    <p>Min - 26,64 --| |-- Máx - 41,85</p>
                </div>
            </div>


            <div className="indicators">

                <div className="stat">
                    <span className="number" data-value="35216">0</span>
                    <span> km²</span>
                    <p>Área Territorial - 2025</p>
                </div>

                <div className="stat">
                    <span className="number" data-value="440962">0</span>
                    <span> pessoas</span>
                    <p>População no último censo - 2022</p>
                </div>

                <div className="stat">
                    <span className="number" data-value="12521.64">0</span>
                    <span> hab/km²</span>
                    <p>Densidade demográfica - 2022</p>
                </div>

                <div className="stat">
                    <span className="number" data-value="466487">0</span>
                    <span> pessoas</span>
                    <p>População estimada - 2026</p>
                </div>
            </div>

        </section>
    );
}