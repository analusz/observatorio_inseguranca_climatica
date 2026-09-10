"use client";

import './about.css';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const container = useRef(null);

    useEffect(() => {

        const ctx = gsap.context(() => {

            const items = gsap.utils.toArray(".data-table__item");

            const chars = ".·:;°•∙⋅*";

            items.forEach((element, index) => {

                const originalText = element.textContent.trim();

                const scramble = () => {

                    let iteration = 0;

                    const interval = setInterval(() => {

                        element.textContent = originalText
                            .split("")
                            .map((char, i) => {

                                if (char === " ") return " ";

                                if (i < iteration) {
                                    return originalText[i];
                                }

                                return chars[
                                    Math.floor(Math.random() * chars.length)
                                ];

                            })
                            .join("");

                        iteration += 0.7;

                        if (iteration >= originalText.length) {
                            clearInterval(interval);
                            element.textContent = originalText;
                        }

                    }, 30);
                };

                ScrollTrigger.create({
                    trigger: '.data-table__grid',
                    start: "top 90%",
                    once: true,
                    onEnter: scramble
                });

            });

        }, container);

        return () => ctx.revert();

    }, []);

    return (
        <section className="about" ref={container}>

            <div className="data-table">

                <div className="data-table__header">
                    <div className="data-table__line"></div>

                    <h3 className="data-table__title">
                        Informações
                    </h3>
                </div>

                <div className="data-table__grid">

                    <div className="data-table__item">
                        Índice de Vulnerabilidade Climática
                    </div>

                    <div className="data-table__item">
                        48.45%
                    </div>

                    <div className="data-table__item">
                        Instituto Votorantim - 2024
                    </div>

                    <div className="data-table__item">
                        Rios e Canais
                    </div>

                    <div className="data-table__item">
                        Todos encontran-se poluídos
                    </div>

                    <div className="data-table__item">
                        Prefeitura Municipal de São João de Meriti
                    </div>

                    <div className="data-table__item">
                        Tratamento de esgoto
                    </div>

                    <div className="data-table__item">
                        Nada do esgoto coletado é tratado
                    </div>

                    <div className="data-table__item">
                        SINISA - 2025
                    </div>

                    <div className="data-table__item">
                        Quantidade de famílias beneficiárias do Bolsa Família
                    </div>

                    <div className="data-table__item">
                        41.305
                    </div>

                    <div className="data-table__item">
                        MDS,
                        SENARC e
                        DEBEN - 08/2026
                    </div>

                </div>

            </div>

        </section>
    );
}