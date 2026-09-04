'use client';
import './preloader.css';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const wrapperWidth = 180;
    const finalPosition = windowWidth - wrapperWidth;
    const stepDistance = finalPosition / 6;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".count", {
        x: -900,
        duration: 0.85,
        delay: 0.5,
        ease: "power4.inOut",
      });

      for (let i = 1; i <= 6; i++) {
        const xPosition = -900 + i * 180;
        tl.to(".count", {
          x: xPosition,
          duration: 0.85,
          ease: "power4.inOut",
          onStart: () => {
            gsap.to(".count-wrapper", {
              x: stepDistance * i,
              duration: 0.85,
              ease: "power4.inOut",
            });
          }
        });
      }

      gsap.set(".revealer svg", { scale: 0, transformOrigin: "50% 50%" });

      const delays = [6, 6.5, 7];
      const revealers = gsap.utils.toArray(".revealer svg");

      revealers.forEach((el, i) => {
        tl.to(el, {
          scale: 45,
          duration: 1.5,
          ease: "power4.inOut",
          onComplete: () => {
            if (i === delays.length - 1) {
              setLoading(false);
              setTimeout(() => {
                if (onComplete) onComplete();
              }, 500);
            }
          },
        }, delays[i]); // posiciona na timeline em vez de usar "delay"
      });
    });

    return () => ctx.revert(); // mata TODAS as tweens/timelines criadas aqui dentro
  }, [onComplete]);

  return (
    <div
      className={`loader transition-opacity duration-500 ease-in-out ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div className='count-wrapper'>
        <div className='count'>
          <div className='digit'><h1>9</h1></div>
          <div className='digit'><h1>8</h1></div>
          <div className='digit'><h1>7</h1></div>
          <div className='digit'><h1>4</h1></div>
          <div className='digit'><h1>2</h1></div>
          <div className='digit'><h1>0</h1></div>
        </div>
      </div>
      <div className='count-wrapper'>
        <div className='count'>
          <div className='digit'><h1>9</h1></div>
          <div className='digit'><h1>5</h1></div>
          <div className='digit'><h1>1</h1></div>
          <div className='digit'><h1>7</h1></div>
          <div className='digit'><h1>4</h1></div>
          <div className='digit'><h1>0</h1></div>
        </div>
      </div>

      <div className='revealer revealer-1'>
        <svg fill="#0000A8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10 22v-4a2 2 0 0 1 4 0v4h4V12a1 1 0 0 0-.485-.857L13 8.434V6h2V4h-2V2h-2v2H9v2h2v2.434l-4.515 2.709A1 1 0 0 0 6 12v10h4zm-7 0h2v-8.118l-2.447 1.224A.998.998 0 0 0 2 16v5a1 1 0 0 0 1 1zm18.447-6.895L19 13.882V22h2a1 1 0 0 0 1-1v-5c0-.379-.214-.725-.553-.895z"></path></g></svg>
      </div>
      <div className='revealer revealer-2'>
        <svg fill="#FDC806" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10 22v-4a2 2 0 0 1 4 0v4h4V12a1 1 0 0 0-.485-.857L13 8.434V6h2V4h-2V2h-2v2H9v2h2v2.434l-4.515 2.709A1 1 0 0 0 6 12v10h4zm-7 0h2v-8.118l-2.447 1.224A.998.998 0 0 0 2 16v5a1 1 0 0 0 1 1zm18.447-6.895L19 13.882V22h2a1 1 0 0 0 1-1v-5c0-.379-.214-.725-.553-.895z"></path></g></svg>
      </div>
      <div className='revealer revealer-3'>
        <svg fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10 22v-4a2 2 0 0 1 4 0v4h4V12a1 1 0 0 0-.485-.857L13 8.434V6h2V4h-2V2h-2v2H9v2h2v2.434l-4.515 2.709A1 1 0 0 0 6 12v10h4zm-7 0h2v-8.118l-2.447 1.224A.998.998 0 0 0 2 16v5a1 1 0 0 0 1 1zm18.447-6.895L19 13.882V22h2a1 1 0 0 0 1-1v-5c0-.379-.214-.725-.553-.895z"></path></g></svg>
      </div>
    </div>
  );
}
