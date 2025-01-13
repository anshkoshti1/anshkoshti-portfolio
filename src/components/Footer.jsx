import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import SplitType from 'split-type';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 200);
  };

  // useGSAP(() => {
  //   const texts = document.querySelectorAll(".topSection h1");
  //   texts.forEach(text => {
  //     new SplitType(text, { types: 'chars' });
  //   });

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".topSection",
  //       start: "top 50%",
  //       end: "bottom 50%",
  //       scrub: 2,
  //     }
  //   });
  //   tl.from(".topSection .char", {
  //     y: -250,
  //     opacity:0,
  //     duration: 2,
  //     stagger:0.1,
  //     ease: "power3.out"
  //   });
  //   tl.from(".textLeft", {
  //     x: -250,
  //     opacity:0,
  //     duration: 2,
  //     stagger:0.1,
  //     ease: "power3.out"
  //   } ,"same");
  //   tl.from(".textRight", {
  //     x: 250,
  //     opacity:0,
  //     duration: 2,
  //     stagger:0.1,
  //     ease: "power3.out"
  //   } ,"same");
  //   tl.from(".textDown", {
  //     y: 250,
  //     opacity:0,
  //     duration: 2,
  //     stagger:0.1,
  //     ease: "power3.out"
  //   });
  // });

  return (
    <div className="relative min-w-full w-full text-[#FFFCF1] overflow-hidden select-none">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="./videos/v1.mp4"
      ></video>

      {/* Footer Content */}
      <div className="relative w-full min-h-screen flex flex-col justify-evenly md:justify-evenly lg:justify-between p-4 md:p-[1vw]">
        {/* Top Section with "Get in Touch" */}
        <div className="topSection flex overflow-hidden justify-center items-center w-full py-8 md:py-[2vw]">
          <h1 className="text-8xl md:text-[16vw] font-['font-2'] leading-none tracking-tight drop-shadow-lg text-center">
            Get in Touch
          </h1>
        </div>

        {/* Middle Section: Navigation and Contact */}
        <div className="flex flex-col md:flex-row justify-evenly items-center md:items-start gap-8 md:gap-[4vw] w-full">
          <div className="flex flex-col gap-4 md:gap-[2vw] mb-5 w-full max-w-md md:w-auto">
            <div className='textLeft'>
              <h1 className="~text-xl/3xl font-['font-3'] drop-shadow-lg text-center md:text-left">Email</h1>  
            </div>
            <div className="flex flex-row justify-center md:justify-start">
              {/* Email */}
              <div className='textLeft'>
                <a
                  href="mailto:anshkoshti@gmail.com"
                  className="button px-4 py-2 md:px-[2vw] md:py-[1vw] border-2 border-[#FFE4E1] ~text-sm/xl font-['font-3'] hover:bg-[#FFE4E1] hover:text-[#111] transition-colors duration-300 whitespace-nowrap"
                >
                  anshkoshti1@gmail.com
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:gap-[1vw]">
              {/* Social Media Links */}
              <div className='textLeft'>
                <h1 className="~text-xl/3xl font-['font-3'] drop-shadow-lg text-center md:text-left">Social Account</h1>  
              </div>
              <div className='textLeft flex justify-center gap-3 md:justify-start'>
                <a
                  href="https://www.linkedin.com/in/ansh-koshti-38ba3a269/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button px-4 py-2 md:px-[2vw] md:py-[0.8vw] border-2 border-[#FFE4E1] ~text-sm/xl font-['font-3'] hover:bg-[#FFE4E1] hover:text-[#111] transition-colors duration-300"
                  aria-label="Visit my LinkedIn profile"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/anshkoshti1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button px-4 py-2 md:px-[2vw] md:py-[0.8vw] border-2 border-[#FFE4E1] ~text-sm/xl font-['font-3'] lg:hover:bg-[#FFE4E1] lg:hover:text-[#111] transition-colors duration-300"
                  aria-label="Visit my LinkedIn profile"
                >
                  Github
                </a>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="textRight flex justify-center items-center">
            <button
              onClick={handleContactClick}
              className="button ~w-40/64 ~h-40/64 font-['font-3'] bg-transparent ~text-lg/3xl border-2 border-[#FFE4E1] hover:bg-[#FFE4E1] hover:text-[#111] transition-colors duration-300 font-semibold rounded-full flex justify-center items-center"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="textDown ~text-sm/xl font-['font-3'] text-center text-zinc-400 mt-8 md:mt-[2vw] w-full">
          &copy; 2024 Ansh Koshti | All rights reserved. 
          <div className="mt-1 md:mt-[0.3vw]">
            Local Time: <span id="current-time" className="text-zinc-300">
              {(() => {
                const [time, setTime] = useState(new Date());
                
                useEffect(() => {
                  const timer = setInterval(() => {
                    setTime(new Date());
                  }, 1000);
                  
                  return () => clearInterval(timer);
                }, []);

                return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
