import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    gsap.set(cursor, { scale: 1, xPercent: -50, yPercent: -50 });

    const handleMouseMove = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="w-3 h-3 hidden lg:flex bg-white mix-blend-difference rounded-full fixed top-0 left-0 pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
    ></div>
  );
};

export default Cursor;
