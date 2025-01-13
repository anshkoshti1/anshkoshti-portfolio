import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import Cursor from "./Cursor";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
      
      // First hide realNav quickly
      gsap.to(".realNav", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      });

      // Then show topNavbar
      gsap.to(".topNavbar", {
        y: 0,
        opacity: 1,
        zIndex: 100,
        duration: 1,
        display: "block",
        ease: "power3.out",
      });

      // Animate links with stagger
      gsap.fromTo(".links .link",
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0, 
          opacity: 0.8,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2
        }
      );

    } else {
      // Re-enable scrolling when menu closes
      document.body.style.overflow = "unset";

      // Fade out links first
      gsap.to(".links .link", {
        y: -20,
        opacity: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in"
      });

      // Then animate menu away
      gsap.to(".topNavbar", {
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        delay: 0.2,
        onComplete: () => {
          gsap.set(".topNavbar", {
            display: "none",
            zIndex: -1
          });
          // Show realNav after topNavbar is hidden
          gsap.to(".realNav", {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    }
  }, [menu]);

  const handleLinkClick = () => {
    setMenu(false);
    gsap.to(".close-btn", {
      opacity: 1, 
      scale: 1,
      duration: 0.3,
      ease: "power1.out"
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <>

      <Cursor />

      <nav className={`realNav fixed top-[0vh] z-[100] w-[100vw] mix-blend-difference bg-transparent rounded-b-md px-[4vw] py-[3vh] transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-between items-center ">
            <h1 className='text-white z-[100] text-md ~text-2xl/4xl cursor-pointer ~leading-5/8 font-["font-2"] font-medium'>
              Ansh
            </h1>
            <h1 className='text-white z-[100] text-md ~text-2xl/4xl cursor-pointer ~leading-5/8 font-["font-2"] font-medium ~ml-7/12'>
              Koshti
            </h1>
          </div>
          <button
            onClick={() => {
              setMenu(!menu);
              gsap.to(".close-btn", {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power1.out"
              });
            }}
            className=' font-["font-3"] text-white font-medium ~text-xl/3xl cursor-pointer relative after:content-[""] after:absolute after:w-0 after:h-[1.5px] after:bg-white after:left-0 after:bottom-0 after:transition-all hover:after:w-full'
          >
            Menu
          </button>
        </div>
      </nav>

      <div className="topNavbar w-full fixed top-0 text-[#FAF8F3] bg-[#111] opacity-0 z-[-1] h-screen">
        <div className="relative w-full h-full">
          <div className="w-full h-[90vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => {
                setMenu(false); 
                gsap.to(".close-btn", {
                  opacity: 1,
                  scale: 1,
                  duration: 0.3,
                  ease: "power1.out"
                });
              }}
              className="absolute top-8 right-8 cursor-pointer ~text-2xl/4xl z-[100] close-btn after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[1px] after:bg-[#ffffff] after:transition-all after:duration-300 hover:after:w-full"
            >
              Close
            </button>
            <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-full flex items-center justify-center">
              <div className='links flex flex-col justify-center items-center font-["font-3"] ~gap-1/10'>
                <NavLink
                  className={({isActive}) => `link home text-lg sm:text-xl md:text-2xl lg:text-[2.5vw] xl:text-[3vw] 2xl:text-[3.5vw] cursor-pointer font-light relative opacity-50 ${isActive ? 'text-[#66ffff]' : ''} `}
                  to="/"
                  onClick={handleLinkClick}
                  onMouseEnter={() => {
                    gsap.to(".links .home", {
                      opacity: 1,
                      x: 20,
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to(".links .home", {
                      opacity: 0.8,
                      x: 0,
                      duration: 0.3,
                    });
                  }}
                >
                  Home
                </NavLink>
                <NavLink
                  className={({isActive}) => `link about text-lg sm:text-xl md:text-2xl lg:text-[2.5vw] xl:text-[3vw] 2xl:text-[3.5vw] cursor-pointer font-light relative opacity-50 ${isActive ? 'text-[#66ffff]' : ''} `}
                  to="/about"
                  onClick={handleLinkClick}
                  onMouseEnter={() => {
                    gsap.to('.links .about', {
                      opacity: 1,
                      x: 20,
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to('.links .about', {
                      opacity: 0.8,
                      x: 0,
                      duration: 0.3,
                    });
                  }}
                >
                  About
                </NavLink>
                <NavLink
                  className={({isActive}) => `link projects text-lg sm:text-xl md:text-2xl lg:text-[2.5vw] xl:text-[3vw] 2xl:text-[3.5vw] cursor-pointer font-light relative opacity-50 ${isActive ? 'text-[#66ffff]' : ''} `}
                  to="/projects"
                  onClick={handleLinkClick}
                  onMouseEnter={() => {
                    gsap.to('.links .projects', {
                      opacity: 1,
                      x: 20,
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to('.links .projects', {
                      opacity: 0.8,
                      x: 0,
                      duration: 0.3,
                    });
                  }}
                >
                  Projects
                </NavLink>
                <NavLink
                  className={({isActive}) => `link contact text-lg sm:text-xl md:text-2xl lg:text-[2.5vw] xl:text-[3vw] 2xl:text-[3.5vw] cursor-pointer font-light relative opacity-50 ${isActive ? 'text-[#66ffff]' : ''} `}
                  to="/contact"
                  onClick={handleLinkClick}
                  onMouseEnter={() => {
                    gsap.to('.links .contact', {
                      opacity: 1,
                      x: 20,
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={() => {
                    gsap.to('.links .contact', {
                      opacity: 0.8,
                      x: 0,
                      duration: 0.3,
                    });
                  }}
                >
                  Contact
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
