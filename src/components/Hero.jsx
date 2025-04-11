import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplitType from "split-type";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const marqueeRef = useRef(null);
  const navigate = useNavigate();

  const handleProjectsClick = () => {
    navigate("/projects");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleAboutClick = () => {
    navigate("/about");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const tiltRef = useRef(null);
  const [xVal, setXVal] = useState(0);
  const [yVal, setYVal] = useState(0);

  const mouseMoving = (e) => {
    setXVal(
      (e.clientX -
        tiltRef.current.getBoundingClientRect().width -
        tiltRef.current.getBoundingClientRect().x) /
        30
    );

    setYVal(
      -(
        e.clientY -
        tiltRef.current.getBoundingClientRect().height -
        tiltRef.current.getBoundingClientRect().y
      ) / 30
    );

    // tiltRef.current.style.transform = `rotateX(${yVal}deg) rotateY(${xVal}deg)`;
  };

  useGSAP(() => {
    gsap.to(tiltRef.current, {
      transform: `rotateX(${yVal * 1.5}deg) rotateY(${xVal * 1.5}deg)`,
      duration: 3,
      ease: "power4.Out",
    });
  }, [xVal, yVal]);

  useGSAP(() => {
    // Marquee animation
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const marqueeContent = marquee.querySelector(".marquee-content");
    if (!marqueeContent) return;

    // Clone the content for seamless scrolling
    const clone = marqueeContent.cloneNode(true);
    marquee.appendChild(clone);

    // Set initial position
    gsap.set(marqueeContent, { xPercent: 0 });
    gsap.set(clone, { xPercent: 100 });

    // Create infinite scrolling animation
    gsap.to([marqueeContent, clone], {
      xPercent: "-100",
      repeat: -1,
      duration: 20,
      ease: "none",
    });

    // Split text into words
    const texts = document.querySelectorAll(
      ".animate0 h1, .animate1 h1, .animate2 h1, .animate3 h1, .animate4 h1, .animate5 h1"
    );
    texts.forEach((text) => {
      new SplitType(text, { types: "words" });
    });

    const letters = document.querySelectorAll(".animate6 h1");
    letters.forEach((letter) => {
      new SplitType(letter, { types: "chars" });
    });
  });

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 2,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     orientation: "vertical",
  //     smoothWheel: true,
  //     wheelMultiplier: 1,
  //     touchMultiplier: 2,
  //     smooth: true,
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

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".landingParent",
        start: "3% 2%",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    tl.to(".landing", {
      scale: 0.9,
      opacity: 0.8,
      ease: "linear",
    });
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".parent",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    // Animate0 sequence
    tl.from(
      ".animate0 .word",
      {
        opacity: 0,
        y: 50,
        duration: 10,
        stagger: 0.5,
        ease: "power3.out",
      },
      "-=10"
    );
    tl.to(
      ".animate0 .word",
      {
        opacity: 0,
        y: -50,
        duration: 10,
        stagger: 0.5,
        ease: "power3.in",
      },
      "animate0"
    );

    // Circle animation
    tl.to(
      ".circle",
      {
        scale: 80,
        borderRadius: "9999px",
        duration: 25,
        ease: "power2.inOut",
      },
      "animate0"
    );

    tl.to(
      ".newParent",
      {
        scale: 0.9,
        duration: 10,
        ease: "power3.out",
      },
      "-=12",
      "animate1"
    );

    // Animate1 sequence
    tl.from(
      ".animate1 .word",
      {
        opacity: 0,
        y: 50,
        duration: 10,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=12",
      "animate1"
    );
    tl.from(
      ".animate11",
      {
        opacity: 0,
        y: 1000,
        duration: 10,
        ease: "power3.out",
      },
      "-=12",
      "animate1"
    );
    tl.from(
      ".b1",
      {
        opacity: 0,
        y: 100,
        display: "none",
        duration: 10,
        ease: "power3.out",
      },
      "-=15",
      "animate1"
    );
    tl.to(".animate1 .word", {
      opacity: 0,
      y: -50,
      duration: 10,
      stagger: 0.2,
      ease: "power3.in",
    });
    tl.to(
      ".animate11",
      {
        opacity: 0,
        y: -1000,
        duration: 10,
        ease: "power3.in",
      },
      "-=5",
      "animate1"
    );
    tl.to(
      ".b1",
      {
        opacity: 0,
        y: 100,
        display: "none",
        duration: 10,
        ease: "power3.in",
      },
      "-=5"
    );

    // Animate2 sequence
    tl.from(
      ".animate2 .word",
      {
        opacity: 0,
        y: 50,
        duration: 10,
        stagger: 0.2,
        ease: "power3.out",
      },
      "animate2"
    );
    tl.to(
      ".circle",
      {
      background: "linear-gradient(135deg, #d6d1d1, #f5f5f5)",
      duration: 10,
      ease: "power3.out",
      },
      "animate2"
    );
    tl.from(
      ".b2",
      {
        opacity: 0,
        y: 100,
        display: "none",
        duration: 10,
        ease: "power3.out",
      },
      "animate2"
    );
    tl.from(
      ".animate21",
      {
        opacity: 0,
        y: 1000,
        duration: 10,
        ease: "power3.in",
      },
      "-=20",
      "animate2"
    );
    tl.to(".animate2 .word", {
      opacity: 0,
      y: -50,
      duration: 10,
      stagger: 0.2,
      ease: "power3.in",
    });
    tl.to(
      ".animate21",
      {
        opacity: 0,
        y: -1000,
        duration: 10,
        ease: "power3.in",
      },
      "-=5",
      "animate2"
    );
    tl.to(
      ".b2",
      {
        opacity: 0,
        y: 100,
        display: "none",
        duration: 10,
        ease: "power3.in",
      },
      "-=5"
    );

    // Animate3 sequence
    tl.from(
      ".animate3 .word",
      {
        opacity: 0,
        y: 50,
        duration: 10,
        stagger: 0.2,
        ease: "power3.out",
      },
      "animate3"
    );
    tl.to(
      ".circle",
      {
      background: "linear-gradient(135deg, #d1e822, #f5f5f5)",
      duration: 10,
      ease: "power3.out",
      },
      "animate3"
    );
    tl.from(
      ".b3",
      {
        opacity: 0,
        y: 100,
        display: "none",
        duration: 10,
        ease: "power3.out",
      },
      "animate3"
    );
    tl.from(
      ".animate31",
      {
        opacity: 0,
        y: 1000,
        duration: 10,
        ease: "power3.in",
      },
      "-=20",
      "animate3"
    );
    tl.to(".animate3 .word", {
      opacity: 0,
      y: -50,
      duration: 10,
      stagger: 0.2,
      ease: "power3.in",
    });
    tl.to(
      ".animate31",
      {
        opacity: 0,
        y: -1000,
        duration: 10,
        ease: "power3.in",
      },
      "-=5",
      "animate3"
    );
    tl.to(
      ".b3",
      {
        opacity: 0,
        y: 100,
        display: "none",
        duration: 10,
        ease: "power3.in",
      },
      "-=5"
    );

    // Animate4 sequence
    tl.from(
      ".animate4 .word",
      {
        opacity: 0,
        y: 50,
        duration: 10,
        stagger: 0.2,
        ease: "power3.out",
      },
      "animate4"
    );
    tl.to(
      ".circle",
      {
      background: "linear-gradient(135deg, #FFB499, #FFD1C4)",
      duration: 10,
      ease: "power3.out",
      },
      "animate4"
    );
    tl.from(
      ".b4",
      {
        opacity: 0,
        y: 100,
        display: "none",
        duration: 10,
        ease: "power3.out",
      },
      "animate4"
    );
    tl.from(
      ".animate41",
      {
        opacity: 0,
        y: 1000,
        duration: 10,
        ease: "power3.in",
      },
      "-=20",
      "animate4"
    );
    tl.to(".animate4 .word", {
      opacity: 0,
      y: -50,
      duration: 10,
      stagger: 0.2,
      ease: "power3.in",
    });
    tl.to(
      ".animate41",
      {
        opacity: 0,
        y: -1000,
        duration: 10,
        ease: "power3.in",
      },
      "-=5",
      "animate4"
    );
    tl.to(
      ".b4",
      {
        opacity: 0,
        y: 100,
        display: "none",
        duration: 10,
        ease: "power3.in",
      },
      "-=5"
    );

    // Animate5 sequence
    tl.from(
      ".animate5 .word",
      {
        opacity: 0,
        y: 50,
        duration: 10,
        display: "none",
        stagger: 0.2,
        ease: "power3.out",
      },
      "animate5"
    );

    tl.from(
      ".b5",
      {
        opacity: 0,
        y: 100,
        duration: 10,
        ease: "power3.out",
      },
      "animate5"
    );

    tl.to(
      ".circle",
      {
      background: "linear-gradient(135deg, #FFF3E0, #FFD1C4)",
      duration: 10,
      ease: "power3.out",
      },
      "animate5"
    );

    tl.to(
      ".animate5 .word",
      {
        opacity: 0,
        y: -50,
        duration: 10,
        stagger: 0.2,
        display: "none",
        ease: "power3.in",
      },
      "animate6"
    );

    tl.to(
      ".b5",
      {
        opacity: 0,
        y: 100,
        duration: 10,
        ease: "power3.in",
      },
      "animate6"
    );

    tl.to(".newParent", {
      scale: 1,
      duration: 10,
      ease: "power3.in",
    });

    // Circle animation
    tl.to(
      ".circle",
      {
        scale: 1,
        duration: 25,
        ease: "power2.inOut",
      },
      "-=20"
    );

    // Animate6 sequence
    tl.from(
      ".animate6 .char",
      {
        opacity: 0,
        y: 50,
        duration: 5,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=5"
    );
  }, []);

  useGSAP(() => {
    const splitTxt = document.querySelectorAll(".splitTxt p");
    splitTxt.forEach((txt) => {
      new SplitType(txt, { types: "words" });
    });

    const textAnimation = document.querySelectorAll(".textAnimation h3");
    textAnimation.forEach((txtAni) => {
      new SplitType(txtAni, { types: "chars" });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".abtParent",
        start: "-50% top",
        end: "30% top",
        scrub: 2,
      },
    });

    tl.from(
      ".splitTxt p .word",
      {
        y: 40,
        duration: 0.5,
        ease: "linear",
        stagger: 0.1,
        opacity: 0,
        filter: "blur(10px)",
      },
      "same"
    );

    tl.from(
      ".inviDiv",
      {
        opacity: 0,
        duration: 1,
        ease: "linear",
      },
      "same"
    );

    gsap.to(".rotateImg", {
      rotate: 360,
      duration: 50,
      ease: "linear",
      repeat: -1,
    });

    tl.from(".svgDown", {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "linear",
      stagger: 0.2,
      filter: "blur(10px)",
    });

    tl.from(".textAnimation .char", {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "linear",
      stagger: 0.2,
      filter: "blur(10px)",
    });
  }, []);

  useEffect(() => {
    let animation;
    let rotateAnimation;

    const handleWheel = (e) => {
      if (animation) animation.kill();
      if (rotateAnimation) rotateAnimation.kill();

      if (e.deltaY > 0) {
        animation = gsap.to(".mark", {
          xPercent: -200,
          duration: 10,
          repeat: -1,
          ease: "none",
          modifiers: {
            xPercent: gsap.utils.wrap(-200, 0),
          },
        });

        rotateAnimation = gsap.to(".mark img", {
          rotate: 180,
          duration: 1,
        });
      } else {
        animation = gsap.to(".mark", {
          xPercent: 0,
          duration: 10,
          repeat: -1,
          ease: "none",
          modifiers: {
            xPercent: gsap.utils.wrap(-200, 0),
          },
        });

        rotateAnimation = gsap.to(".mark img", {
          rotate: 360,
          duration: 1,
        });
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (animation) animation.kill();
      if (rotateAnimation) rotateAnimation.kill();
    };
  }, []);

  useGSAP(() => {
    gsap.from(".upwards", {
      y: "100%",
      duration: 1,
      opacity: 0,
      ease: "power3.out",
    });
  });

  return (
    <>
      <div className="bg-[#FAF8F3] select-none">
        <div className="upwards w-full">
          <div className="landingParent w-full h-[100vh] relative mb-10">
            <div
              onMouseMove={(e) => {
                mouseMoving(e);
              }}
              id="sec2"
              className="landing w-full h-full relative flex justify-end items-end z-10 overflow-hidden"
              style={{
                backgroundImage: "url('/Images/final-img.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#FAF8F3",
              }}
            >
              {/* Frontend Developer Text */}
              <div className="absolute flex flex-col justify-center items-start top-[40vh] left-[20vw] transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
                <div className="w-full h-full flex flex-row justify-between items-start">
                  <div className="w-[10vw] -mt-10 ml-10 hidden lg:flex flex-col justify-center items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#111"
                      className="w-[3.5vw] h-[3.5vw] rotate-45"
                    >
                      <path
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        strokeWidth={1.5}
                        stroke="#2E3340"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    ref={tiltRef}
                    className="w-[20vw] lg:mt-10 lg:-ml-32 flex flex-col justify-center items-start"
                  >
                    <h2 className="text-2xl md:text-[4.5vw] font-['font-3'] font-light leading-[2.7vw] text-[#111] tracking-wider mb-4">
                      Frontend
                    </h2>
                    <h2 className="text-2xl md:text-[4.5vw] font-['font-3'] font-light leading-[2.7vw] text-[#111] tracking-wider mb-4">
                      Developer
                    </h2>
                  </div>
                </div>
              </div>

              {/* Marquee Section */}
              <div className="w-full h-[40vh] flex whitespace-nowrap overflow-hidden mix-blend-difference">
                <div
                  ref={marqueeRef}
                  className="w-full font-['font-2'] flex items-center whitespace-nowrap"
                >
                  <div className="marquee-content text-7xl lg:text-[10vw] flex items-center whitespace-nowrap">
                    <h1 className="text-white tracking-tight mr-8">
                      Ansh Koshti
                    </h1>
                    <h1 className="text-white tracking-tight mr-8">—</h1>
                    <h1 className="text-white tracking-tight mr-8">
                      Ansh Koshti
                    </h1>
                    <h1 className="text-white tracking-tight mr-8">—</h1>
                    <h1 className="text-white tracking-tight mr-8">
                      Ansh Koshti
                    </h1>
                    <h1 className="text-white tracking-tight mr-8">—</h1>
                    <h1 className="text-white tracking-tight mr-8">
                      Ansh Koshti
                    </h1>
                    <h1 className="text-white tracking-tight mr-8">—</h1>
                    <h1 className="text-white tracking-tight mr-8">
                      Ansh Koshti
                    </h1>
                    <h1 className="text-white tracking-tight mr-8">—</h1>
                    <h1 className="text-white tracking-tight mr-8">
                      Ansh Koshti
                    </h1>
                    <h1 className="text-white tracking-tight mr-8">—</h1>
                    <h1 className="text-white tracking-tight mr-8">
                      Ansh Koshti
                    </h1>
                    <h1 className="text-white tracking-tight mr-8">—</h1>
                    <h1 className="text-white tracking-tight mr-8">
                      Ansh Koshti
                    </h1>
                    <h1 className="text-white tracking-tight mr-8">—</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="abtParent w-full h-screen lg:h-[120vh]">
          {/* Main Content */}
          <div className="w-full h-2/3 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 px-6 md:px-20">
            {/* Text Section */}
            <div className="splitTxt w-full md:w-2/4 xl:w-1/3 flex justify-center items-center">
              <p className="text-black text-[6vw] sm:text-[4vw] md:text-lg lg:text-2xl xl:text-4xl font-['font-3'] font-light text-left tracking-tighter leading-tight">
                Hello, I am Ansh Koshti, a Frontend Developer focused on
                creating engaging web applications. I strive to utilize modern
                technologies and enhance my skills to deliver user-friendly
                interfaces and exceptional experiences.
              </p>
            </div>

            {/* Button Section */}
            <div className="inviDiv w-full md:w-2/4 xl:w-1/3 h-full flex justify-center items-center relative">
              <img
                src="./Images/explore-more.svg"
                alt="explore-more"
                className="rotateImg w-[40vw] sm:w-[22vw] md:w-[30vw] lg:w-[18vw] xl:w-[15vw] h-[40vw] sm:h-[30vw] md:h-[22vw] lg:h-[18vw] xl:h-[15vw] absolute mix-blend-difference"
              />
              <button
                onClick={handleAboutClick}
                className="cursor-pointer w-[25vw] sm:w-[20vw] md:w-[10vw] xl:w-[10.2vw] h-[25vw] sm:h-[20vw] md:h-[10vw] xl:h-[10.2vw] rounded-full flex justify-center items-center absolute hover:bg-[#2E3340] hover:text-[#FAF8F3] transition-colors duration-300 ease-linear"
              >
                <h1 className="text-[4vw] sm:text-[2vw] md:text-[1.5vw] xl:text-[1.2vw] font-['font-3'] font-light text-center z-10">
                  Explore more
                </h1>
              </button>
            </div>
          </div>

          {/* Scroll Down Section */}
          <div className="w-full h-1/3 flex justify-center items-start">
            <div className="textAnimation w-full h-full flex flex-col items-center">
              <img
                src="./Images/down-arrow.svg"
                className="w-[10vw] sm:w-[8vw] md:w-[4.5vw] xl:w-[3.8vw] h-[10vw] sm:h-[8vw] md:h-[4.5vw] xl:h-[3.8vw] svgDown overflow-hidden"
                alt="img"
              />
              <h3 className="text-black text-[6vw] sm:text-[4vw] md:text-[2.5vw] xl:text-[2vw] font-['font-3'] font-light text-center tracking-tighter leading-tight">
                Scroll Down
              </h3>
            </div>
          </div>
        </div>

        <div className="w-full lg:mb-10">
          <div className="parent relative w-full h-[1000vh] md:h-[1500vh] lg:h-[2000vh]">
            <div className="newParent w-full sticky top-0 left-0 h-screen overflow-hidden select-none">
              <div className="w-full h-full select-none">
                {/* title */}
                <div className="w-full h-full flex justify-center items-center z-[10] animate0 select-none">
                  <h1 className="text-2xl md:text-4xl lg:text-6xl overflow-hidden font-['font-3'] font-extralight text-center py-8 tracking-tight">
                    Featured Projects & Innovations
                  </h1>
                </div>

                {/* circle */}
                <div className="w-full h-full hidden xl:flex justify-center items-center z-[10] select-none">
                  <div className="circle w-[20vw] md:w-[10vw] h-[20vw] md:h-[10vw] bg-[#D5C4FA] absolute -bottom-[80vw] md:-bottom-[40vw]"></div>
                </div>

                {/* animate1 */}
                <div className="absolute overflow-hidden flex flex-col xl:flex-row-reverse top-0 w-full h-full">
                  {/* Right Section */}
                  <div className="w-full xl:w-1/2 h-full flex justify-center items-center mt-20 md:mt-0 pb-6 xl:pb-20 pr-0 xl:pr-20 select-none">
                    <div className="animate11 w-full h-full xl:h-2/4 overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="./videos/blobmixer.mp4"
                      ></video>
                    </div>
                  </div>

                  {/* Left Section */}
                  <div className="w-full xl:w-1/2 flex flex-col justify-center items-start text-[#111] md:mt-20 lg:mt-10 xl:mt-0 px-6 xl:px-32 pb-44 xl:pb-0">
                    <div className="animate1 w-full flex flex-col justify-center items-start select-none">
                      <h1 className="leading-tight z-[1000] font-['font-8'] tracking-tighter text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-2 xl:mb-6 sm:mb-10 whitespace-nowrap">
                        Blobmixer
                      </h1>
                      <h1 className="text-lg md:text-xl lg:text-2xl z-[1000] font-['font-3'] font-extralight tracking-tight">
                        A mesmerizing WebGL experiment crafted with Three.js and
                        custom GLSL shaders, creating fluid, interactive blob
                        animations that respond to user input in real-time.
                      </h1>
                      <a
                        href="https://blobmixer-two.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="b1 z-[1001] mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 border-2 border-[#111] rounded-full text-md md:text-lg font-['font-3'] lg:hover:bg-[#111] lg:hover:text-white transition-colors duration-300"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>

                {/* animate2 */}
                <div className="absolute overflow-hidden flex flex-col xl:flex-row-reverse top-0 w-full h-full">
                  {/* Right Section */}
                  <div className="w-full xl:w-1/2 h-full flex justify-center items-center mt-20 md:mt-0 pb-6 xl:pb-20 pr-0 xl:pr-20 select-none">
                    <div className="animate21 w-full h-full xl:h-2/4 overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="./videos/zajno.mp4"
                      ></video>
                    </div>
                  </div>

                  {/* Left Section */}
                  <div className="w-full xl:w-1/2 flex flex-col justify-center items-start text-[#111] md:mt-20 lg:mt-0 px-6 xl:px-32 pb-44 xl:pb-0">
                    <div className="animate2 w-full flex flex-col justify-center items-start select-none">
                      <h1 className="leading-tight z-[1000] font-['font-8'] tracking-tighter text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-2 xl:mb-6 sm:mb-10 whitespace-nowrap">
                        zajno.com
                      </h1>
                      <h1 className="text-lg md:text-xl lg:text-2xl z-[1000] font-['font-3'] font-extralight tracking-tight">
                        A captivating recreation of Zajno's award-winning
                        website, featuring advanced WebGL effects and custom
                        GLSL shaders. This project showcases intricate 3D
                        animations, dynamic text distortions, and fluid
                        transitions powered by Three.js, creating an immersive
                        digital experience.
                      </h1>
                      <a
                        href="https://zajno-com.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="b2 z-[1001] mt-6 sm:mt-8 lg:mt-6 px-6 sm:px-8 py-2 sm:py-3 border-2 border-[#111] rounded-full text-md md:text-lg font-['font-3'] lg:hover:bg-[#111] lg:hover:text-white transition-colors duration-300"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>

                {/* animate3 */}
                <div className="absolute overflow-hidden flex flex-col xl:flex-row-reverse top-0 w-full h-full">
                  {/* Right Section */}
                  <div className="w-full xl:w-1/2 h-full flex justify-center items-center mt-20 md:mt-0 pb-6 xl:pb-20 pr-0 xl:pr-20 select-none">
                    <div className="animate31 w-full h-full xl:h-2/4 overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="./videos/ochi.mp4"
                      ></video>
                    </div>
                  </div>

                  {/* Left Section */}
                  <div className="w-full xl:w-1/2 flex flex-col justify-center items-start text-[#111] md:mt-20 lg:mt-0 px-6 xl:px-32 pb-44 xl:pb-0">
                    <div className="animate3 w-full flex flex-col justify-center items-start select-none">
                      <h1 className="leading-tight z-[1000] font-['font-8'] tracking-tighter text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-2 xl:mb-6 sm:mb-10 whitespace-nowrap">
                        ochi.design
                      </h1>
                      <h1 className="text-lg md:text-xl lg:text-2xl z-[1000] font-['font-3'] font-extralight tracking-tight">
                        A dynamic recreation of ochi.design's website, featuring
                        smooth locomotive scrolling and intricate GSAP
                        animations. This project demonstrates advanced
                        scroll-based interactions, parallax effects, and
                        seamless transitions, all orchestrated through custom
                        JavaScript animations and precise timing sequences.
                      </h1>
                      <a
                        href="https://ochi-design-six-snowy.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="b3 z-[1001] mt-6 sm:mt-8 lg:mt-2 px-6 sm:px-8 py-2 sm:py-3 border-2 border-[#111] rounded-full text-md md:text-lg font-['font-3'] lg:hover:bg-[#111] lg:hover:text-white transition-colors duration-300"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>

                {/* animate4 */}
                <div className="absolute overflow-hidden flex flex-col xl:flex-row-reverse top-0 w-full h-full">
                  {/* Right Section */}
                  <div className="w-full xl:w-1/2 h-full flex justify-center items-center mt-20 md:mt-0 pb-6 xl:pb-20 pr-0 xl:pr-20 select-none">
                    <div className="animate41 w-full h-full xl:h-2/4 overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="./videos/thomas-vance.mp4"
                      ></video>
                    </div>
                  </div>

                  {/* Left Section */}
                  <div className="w-full xl:w-1/2 flex flex-col justify-center items-start text-[#111] md:mt-20 lg:mt-0 px-6 xl:px-32 pb-44 xl:pb-0">
                    <div className="animate4 w-full flex flex-col justify-center items-start select-none">
                      <h1 className="leading-tight z-[1000] font-['font-8'] tracking-tighter text-[2.9rem] md:text-6xl lg:text-7xl mb-6 md:mb-2 xl:mb-6 sm:mb-10 whitespace-nowrap">
                        Thomas Vance®
                      </h1>
                      <h1 className="text-lg md:text-xl lg:text-2xl z-[1000] font-['font-3'] font-extralight tracking-tight">
                        A meticulous recreation of Thomas Vance's portfolio
                        website, showcasing advanced GSAP animations and smooth
                        Lenis scrolling. This project features intricate text
                        animations, dynamic image transitions, and seamless
                        scroll-based interactions, demonstrating mastery of
                        modern web animation techniques.
                      </h1>
                      <a
                        href="https://thomas-vance.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="b4 z-[1001] mt-6 sm:mt-8 lg:mt-2 px-6 sm:px-8 py-2 sm:py-3 border-2 border-[#111] rounded-full text-md md:text-lg font-['font-3'] lg:hover:bg-[#111] lg:hover:text-white transition-colors duration-300"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>

                {/* animate5 */}
                <div className="absolute overflow-hidden w-full h-screen flex flex-col justify-center items-center animate5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#111] text-center p-4 md:p-10">
                  <div className="w-full xl:w-1/2 flex flex-col justify-center items-center h-1/3">
                    <div className="w-full h-1/3 flex justify-center items-center">
                      <h1 className="leading-10 md:leading-20 font-['font-8'] tracking-tighter text-4xl md:text-6xl mb-8 md:mb-10">
                        Featured Projects
                      </h1>
                    </div>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <div className="w-full h-full flex justify-center items-center">
                        <h1 className="text-md md:text-2xl font-['font-3'] font-extralight tracking-tighter">
                          These are just a few highlights from my portfolio of
                          creative web experiences. Each project represents my
                          commitment to pushing technical boundaries while
                          delivering engaging user experiences.
                        </h1>
                      </div>
                      <div className="w-full h-1/2 flex flex-col justify-center items-center">
                        <h1 className="text-md md:text-2xl font-['font-3'] font-extralight tracking-tighter mt-4 md:mt-6">
                          Ready to explore more?
                        </h1>
                      </div> 
                    </div>
                    <div className="">
                      <button
                        onClick={handleProjectsClick}
                        className="b5 mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 border-2 border-[#111] rounded-full text-md md:text-lg font-['font-3'] hover:bg-[#111] hover:text-white transition-colors duration-300 pointer-events-auto">
                        view all projects
                      </button>
                    </div>
                  </div>
                </div>

                {/* animate6 */}
                <div className="absolute animate6 z-[100] top-full left-1/2 -translate-x-1/2 -translate-y-full text-[#111] text-center p-10">
                  <h1 className="word whitespace-nowrap leading-20 font-['font-8'] tracking-tighter text-3xl md:text-6xl lg:text-7xl ">
                    Keep Exploring
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[20vh] md:h-[35vh] lg:h-[40vh] xl:h-[50vh] py-5 md:py-10 lg:py-5 xl:py-10 overflow-hidden">
          <div
            id="move"
            className="flex py-8 md:py-12 lg:py-16 xl:py-24 overflow-hidden bg-[#D1CCBF]"
          >
            <div className="mark flex items-center gap-[6vw] md:gap-[3vw] px-[3vw] md:px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
            <div className="mark flex items-center gap-[3vw] px-[1.5vw] -translate-x-full whitespace-nowrap flex-shrink-0">
              <h1 className="text-xl md:text-3xl lg:text-5xl xl:text-7xl uppercase font-['font-2']">
                Innovate • Create • Transform
              </h1>
              <img className="h-[3.5vw]" src="./Images/arrow.svg" alt="svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
