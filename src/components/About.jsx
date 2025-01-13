import React, { useEffect } from 'react'
import Lenis from "lenis";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const About = () => {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.stop();
    };
  }, []);

  useGSAP(()=>{
    gsap.from(".left",{
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power4.inOut"
    })
    gsap.from(".right",{
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.inOut"
    })
  })

  return (
    <main className='bg-[#FAF8F3] w-full min-h-screen select-none'>
      <div className='w-full h-full flex flex-col md:flex-row justify-between items-center p-12 pt-24 lg:p-24 lg:pl-52'>
        <div className='left w-full h-80 md:w-[50vw] md:h-[63vh] lg:w-[50%] lg:h-[63vh] mb-6 bg-gradient-to-t from-black via-white to-white lg:mt-[-20vw] xl:h-[80vh] xl:mt-6'>
          <img src="./Images/about.png" alt="img" className='w-full h-full object-cover' />
        </div>
        <div className='right w-full md:w-2/3 h-full flex flex-col justify-evenly md:pl-20'>
          <div className='w-full h-1/3 pb-5 md:pb-5'>
            <h1 className='text-4xl md:text-[8vw] lg:text-[6vw] whitespace-nowrap leading-none p-0 font-["font-3"] font-[100]'>About Me</h1>
          </div>
          <div className='w-full h-2/3 flex flex-col items-start p-0'>
            <div className='w-full'>
              <p className='text-md md:text-sm lg:text-lg xl:text-xl font-light font-["font-3"] leading-tight mb-3 lg:mb-5'>
                As an aspiring Frontend Developer, I am passionate about creating engaging web experiences through modern technologies. I'm currently focused on learning and implementing interactive elements using React and JavaScript, while exploring exciting technologies like Three.js for 3D graphics and animations that can make websites more dynamic and engaging.
              </p>
            </div>
            <div className='w-full'>
              <p className='text-md md:text-sm lg:text-lg xl:text-xl font-light font-["font-3"] leading-tight'>
                I'm developing my skills with popular animation libraries like GSAP to create smooth transitions and delightful user interactions. While I'm early in my journey, I have a strong foundation in HTML, CSS, and JavaScript, and I'm eager to learn and grow as a developer. I pay great attention to detail and am committed to writing clean, efficient code while building visually appealing and user-friendly web experiences.
              </p>
            </div>
          </div>
          <div className='w-full flex'>
            <button 
              onClick={() => window.open('./media/Ansh_Koshti_Resume.pdf', '_blank')}
              className='mt-7 px-4 md:px-8 lg:px-10 py-2 md:py-3 lg:py-4 text-[#111] font-["font-3"] text-xs md:text-[1.4vw] lg:text-lg lg:hover:bg-[#111] lg:hover:text-[#fff] border-[1px] border-[#111] transition-colors duration-300 flex items-center gap-2'
            >
              Download Resume
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About