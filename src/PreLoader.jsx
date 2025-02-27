import { useEffect, useState } from "react";
import gsap from "gsap";

const PreLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scroll when the preloader is active
    document.body.style.overflow = "hidden";

    // Create a GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // When the timeline completes, hide the preloader
        setLoading(false);
        document.body.style.overflow = "auto"; // Enable scroll
      },
    });

    // Horizontal line animation
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
  }, []);

  return (
    <>
      {loading ? (
        <div className="preloader-container fixed inset-0 w-full h-full bg-[#FAF8F3] flex justify-center items-center z-50 overflow-hidden">
          {/* Two lines for animation */}
          <div className="line line-top bg-black h-[2px] w-0 absolute top-1/2 left-0"></div>
          <div className="line line-bottom bg-black h-[2px] w-0 absolute top-1/2 left-0"></div>
          {/* Website description text */}
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
