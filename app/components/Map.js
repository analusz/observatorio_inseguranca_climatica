'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './map.css';

gsap.registerPlugin(ScrollTrigger);

export default function MapContainer() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const map = mapRef.current;

    if (!section || !map) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        map,
        {
          scale: 0.7,
    
        },
        {
          scale: 0.9,
        
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="map-section"
    >
      <div
        ref={mapRef}
        className="map-wrapper"
      >
        <iframe
          title="Observatório de Insegurança Climática de São João de Meriti"
           src="https://umap.hotosm.org/pt-br/map/observatorio-de-inseguranca-climatica-sao-joao-de-_5697?scaleControl=false&miniMap=false&scrollWheelZoom=true&zoomControl=true&editMode=disabled&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true"
          allowFullScreen
          allow="geolocation"
          className="map-iframe"
        />
      </div>
    </section>
  );
}
