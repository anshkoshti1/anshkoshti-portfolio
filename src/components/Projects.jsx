import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import projectDetails from "../config/index.js";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectRef = useRef([]);
  const overlayRefs = useRef([]);
  const liTextRefs = useRef([]);

  useGSAP(() => {
    const texts = document.querySelectorAll(".mainDiv h1");
    texts.forEach((text) => {
      new SplitType(text, { types: "words" });
    });
    gsap.from(".mainDiv .word", {
      opacity: 0,
      y: 500,
      duration: 1,
      stagger: 0.1,
      filter: "blur(10px)",
      ease: "power3.out",
    });
  }, []);

  useGSAP(() => {
    document.querySelectorAll("ol li").forEach((li) => {
      gsap.from(li, {
        scrollTrigger: {
          trigger: li,
          start: "40% 80%",
          end: "40% 80%",
          scrub: 2,
        },
        opacity: 0.15,
        duration: 1,
        ease: "linear",
      });
    });
  });

  const handleMouseEnter = (index) => {
    const targetRef = projectRef.current[index];
    const overlay = overlayRefs.current[index];
    const textRef = liTextRefs.current[index];

    if (targetRef) {
      gsap.to(targetRef, {
        scaleY: 1,
        opacity: 1,
        duration: 0.5,
        filter: "blur(0px)",
        ease: "power3.out",
      });
    }

    if (overlay) {
      gsap.to(overlay, {
        scaleX: 1,
        duration: 0.7,
        ease: "expo.out",
      });
    }

    if (textRef) {
      gsap.to([textRef.nameEl, textRef.yearEl], {
        duration: 0.2,
        fontStyle: "italic",
        ease: "expo.out",
        color: "transparent",
        WebkitTextStroke: "1px white",
      });
    }
  };

  const handleMouseLeave = (index) => {
    const targetRef = projectRef.current[index];
    const overlay = overlayRefs.current[index];
    const textRef = liTextRefs.current[index];

    if (targetRef) {
      gsap.to(targetRef, {
        scaleY: 0,
        opacity: 0,
        duration: 0.5,
        filter: "blur(10px)",
        ease: "power3.out",
      });
    }

    if (overlay) {
      gsap.to(overlay, {
        scaleX: 0,
        duration: 1,
        ease: "expo.out",
      });
    }

    if (textRef) {
      gsap.to([textRef.nameEl, textRef.yearEl], {
        color: "#000000",
        duration: 0.2,
        fontStyle: "normal",
        ease: "expo.out",
        WebkitTextStroke: "0px black",
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
                    className="group flex md:flex-row justify-between items-center border-b border-black px-5 md:px-10 overflow-visible relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onMouseMove={(event) => handleMouseMove(event, index)}
                  >
                    <li className="left py-8 lg:py-16 leading-none z-10">
                      <h1
                        ref={(el) => {
                          liTextRefs.current[index] = {
                            ...liTextRefs.current[index],
                            nameEl: el,
                          };
                        }}
                        className='text-black w-full md:w-1/3 text-xl md:text-2xl lg:text-4xl xl:text-6xl font-["font-3"] whitespace-nowrap'
                      >
                        <a href={project.link} target="_blank" rel="noreferrer">
                          {project.name}
                        </a>
                      </h1>
                    </li>
                    <div className="w-full md:w-3/5 flex justify-center items-center relative z-10">
                      <div
                        ref={(el) => (projectRef.current[index] = el)}
                        className="absolute w-[60vw] h-[60vw] md:w-[20vw] md:h-[20vw] scale-y-0 opacity-0 origin-top justify-center items-center hidden lg:flex"
                      >
                        <div className="w-full h-full overflow-hidden bg-[#dfdfdf] flex justify-center items-center px-3">
                          <a href={project.link} target="_blank" rel="noreferrer">
                            <video
                              autoPlay
                              loop
                              muted
                              src={project.video}
                              alt={project.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <li className="right py-8 lg:py-16 leading-none z-10">
                      <h1
                        ref={(el) => {
                          liTextRefs.current[index] = {
                            ...liTextRefs.current[index],
                            yearEl: el,
                          };
                        }}
                        className='w-full md:w-1/3 text-sm md:text-sm lg:text-lg xl:text-2xl font-["font-3"]'
                      >
                        {project.year}
                      </h1>
                    </li>
                    <div
                      ref={(el) => (overlayRefs.current[index] = el)}
                      className="absolute top-0 left-0 h-full w-full scale-x-0 origin-left bg-black z-0 pointer-events-none"
                    ></div>
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
