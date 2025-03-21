import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from 'split-type';
import projectDetails from "../config/index.js";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {

  const projectRef = useRef([]);

  useGSAP(()=>{
    const texts = document.querySelectorAll(".mainDiv h1")
    texts.forEach(text=>{
      new SplitType(text, { types: 'words' }); 
    })
    gsap.from(".mainDiv .word", {
      opacity: 0,
      y: 500,
      duration: 1,
      stagger: 0.1,
      filter: "blur(10px)",
      ease: "power3.out"
    });
  }, []);

  useGSAP(()=>{
    document.querySelectorAll("ol li").forEach(li=>{
      gsap.from(li, {
        scrollTrigger: {
          trigger: li,
          start: "40% 80%",
          end: "40% 80%",
          scrub: 2,
        },
        opacity: 0.15,
        duration: 1,
        ease: "linear"
      })
    })
  })

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     orientation: "vertical",
  //     smoothWheel: true,
  //     wheelMultiplier: 1,
  //     touchMultiplier: 2,
  //     // smooth: true,
  //     smooth: !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
  //   });

  //   const raf = (time) => {
  //     lenis.raf(time);
  //     ScrollTrigger.update();
  //     requestAnimationFrame(raf);
  //   };
  //   requestAnimationFrame(raf);

  //   return () => {
  //     lenis.stop();
  //   };
  // }, []);

  const handleMouseEnter = (index) => {
    const targetRef = projectRef.current[index];
    if (targetRef) {
      gsap.to(targetRef, {
        scaleY: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = (index) => {
    const targetRef = projectRef.current[index];
    if (targetRef) {
      gsap.to(targetRef, {
        scaleY: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleMouseMove = (event, index) => {
    const targetRef = projectRef.current[index];
    if (targetRef) {
      const { clientX } = event;
      const parentOffset = targetRef.parentElement.getBoundingClientRect(); 
      const refWidth = targetRef.offsetWidth * 3; 
      const centerX = clientX - parentOffset.left - refWidth / 2; 
  
      gsap.to(targetRef, {
        x: centerX * 0.6,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  return (
    <main className="parent w-full z-[100] bg-[#FAF8F3] pt-20 pb-10 px-2 md:pt-20 md:pb-10 md:-px-10 flex flex-col select-none">
      <div className="w-full normal flex flex-col">
        <div className="mainDiv w-full mix-blend-difference justify-start p-6 md:px-24 md:pb-5">
          <h1 className='text-white text-[8vw] md:text-[6vw] overflow-hidden font-["font-3"] tracking-tighter leading-[1.17]'>
            Transforming Ideas into
          </h1>
          <h1 className='text-white text-[8vw] md:text-[6vw] overflow-hidden font-["font-3"] tracking-tighter leading-[1.17]'>
            Exceptional Digital Solutions.
          </h1>
        </div>
        <div className="w-full flex flex-col px-6 md:px-24">
          <div className="w-full flex gap-5">
            <div className="py-5 w-full">
              <div className="flex justify-between mix-blend-difference items-center border-b p-5 md:p-10 border-[#D1CCBF]">
                <h1 className='text-zinc-400 text-xs md:text-md lg:text-xl font-["font-3"] uppercase'>
                  project
                </h1>
                <h1 className='text-zinc-400 text-xs md:text-md lg:text-xl font-["font-3"] uppercase'>
                  year
                </h1>
              </div>
              <ol className="flex flex-col relative mb-10">
                {projectDetails.map((project, index) => (
                  <div
                    key={index}
                    className="flex md:flex-row justify-between items-center border-b border-black px-5 md:px-10 transition-colors duration-500 lg:hover:bg-[#dedede]"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onMouseMove={(event) => handleMouseMove(event, index)}
                  >
                    <li className="left py-8 lg:py-16 mix-blend-difference leading-none">
                      <h1 className='text-white w-full md:w-1/3 text-xl md:text-2xl lg:text-4xl xl:text-6xl font-["font-3"] whitespace-nowrap'>
                        <a href={project.link} target="_blank" rel="noreferrer">
                          {project.name}
                        </a>
                      </h1>
                    </li>
                    <div className="w-full md:w-3/5 flex justify-center items-center relative">
                      <div
                        ref={(el) => (projectRef.current[index] = el)}
                        className="absolute w-[60vw] h-[60vw] md:w-[20vw] md:h-[20vw] scale-y-0 opacity-0 origin-top justify-center items-center hidden lg:flex"
                      >
                        <div className="w-full h-full overflow-hidden bg-[#dfdfdf] flex justify-center items-center px-3">
                          <a href={project.link} target="_blank" rel="noreferrer"><video autoPlay loop muted src={project.video} alt={project.name} className="w-full h-full object-cover rounded-md" /></a>
                        </div>
                      </div>
                    </div>
                    <li className="right py-8 lg:py-16 mix-blend-difference leading-none">
                      <h1 className='text-white w-full md:w-1/3 text-sm md:text-sm lg:text-lg xl:text-2xl font-["font-3"]'>
                        {project.year}
                      </h1>
                    </li>
                  </div>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
