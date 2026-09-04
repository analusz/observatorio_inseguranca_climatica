'use client';

import './methodology.css';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Methodology() {

    useEffect(() => {

        const trigger = ScrollTrigger.create({
            trigger: '#s1',

            onUpdate: (self) => {

                let velocity = gsap.utils.clamp(
                    -2000,
                    2000,
                    self.getVelocity()
                );

                let v = gsap.utils.mapRange(
                    -2000,
                    2000,
                    0,
                    20,
                    velocity
                );

                const absVelocity = Math.abs(velocity);

                if (absVelocity < 200) return;

                gsap.killTweensOf('.edge');

                gsap.timeline()
                    .to('.edge', {
                        duration: 0.1,
                        ease: 'none',
                        attr: {
                            d: `
                                M100,10
                                100,30
                                0,30
                                0,10
                                C0,10 19,${v} 50,${v}
                                C81,${v} 100,10 100,10
                            `
                        }
                    })
                    .to('.edge', {
                        duration: 0.5 + absVelocity / 4000,
                        ease: `elastic.out(${absVelocity / 1500})`,
                        attr: {
                            d: `
                                M100,10
                                100,30
                                0,30
                                0,10
                                C0,10 19,10 50,10
                                C81,10 100,10 100,10
                            `
                        }
                    });

            }
        });

        return () => {
            trigger.kill();
        };

    }, []);

    return (
        <>
            <section id="s1">
                <svg
                    viewBox="0 0 100 30"
                    preserveAspectRatio="none"
                    fill="#000"
                >
                    <path
                        className="edge"
                        d="
                            M100,10
                            100,30
                            0,30
                            0,10
                            C0,10 19,10 50,10
                            C81,10 100,10 100,10
                            Z
                        "
                    />
                </svg>
            </section>

            <section id="s2">
                <svg
                    viewBox="0 0 100 30"
                    preserveAspectRatio="none"
                    fill="#fff"
                >
                    <path
                        className="edge"
                        d="
                            M100,10
                            100,30
                            0,30
                            0,10
                            C0,10 19,10 50,10
                            C81,10 100,10 100,10
                            Z
                        "
                    />
                </svg>
            </section>
        </>
    );
}