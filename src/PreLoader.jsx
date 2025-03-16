import { useEffect, useState } from "react";
import gsap from "gsap";

const PreLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Check if all content (including images) is loaded
    const handleLoad = () => {
      setContentLoaded(true);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (contentLoaded) {
      // Create GSAP timeline for the preloader animation
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          document.body.style.overflow = "auto"; // Enable scrolling after animation
        },
      });

      tl.to(".line", {
        width: "100%",
        duration: 1.5,
        ease: "power3.inOut",
      })
        .to(".line", {
          height: "2px",
          duration: 0.3,
        })
        .to(
          ".line-top",
          {
            y: "-50vh",
            duration: 0.5,
            ease: "power3.inOut",
          },
          "a"
        )
        .to(
          ".line-bottom",
          {
            y: "50vh",
            duration: 0.5,
            ease: "power3.inOut",
          },
          "a"
        )
        .to(
          ".text",
          {
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.2,
          },
          "-=0.1"
        )
        .to(".preloader-container", {
          opacity: 0,
          duration: 2,
          ease: "power3.inOut",
          transform: "translateY(-100vh)",
        });
    }
  }, [contentLoaded]);

  return (
    <>
      {loading ? (
        <div className="preloader-container fixed inset-0 w-full h-full bg-[#FAF8F3] flex justify-center items-center z-50 overflow-hidden">
          {/* Animated lines */}
          <div className="line line-top bg-black h-[2px] w-0 absolute top-1/2 left-0"></div>
          <div className="line line-bottom bg-black h-[2px] w-0 absolute top-1/2 left-0"></div>
          {/* Loader text */}
          <div className="text absolute text-center opacity-0">
            <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-8xl font-['font-3'] font-extralight">
              Innovate - Create - Transform
            </h1>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PreLoader;
