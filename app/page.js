"use client";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useEffect } from "react";
import About from "./components/About";
import Methodology from "./components/Methodology";
import ClientWrapper from "./components/ClientWrapper";
import MapContainer from "./components/Map";
import Stats from "./components/Data";

gsap.registerPlugin(ScrollSmoother);

export default function App() {

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    return () => smoother.kill();
  }, []);

  return (
    <ClientWrapper>
      <main>
        <NavBar />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Home />
            <MapContainer />
            <Stats />

            <Methodology />
            <About />

          </div>
        </div>
      </main>
   </ClientWrapper>
  );
}