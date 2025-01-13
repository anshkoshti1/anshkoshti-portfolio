import React, { useEffect, useRef, useState } from 'react'
import Lenis from "lenis";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    // Define a function to calculate responsive styles
    const getResponsiveStyle = () => {
      const screenWidth = window.innerWidth;
  
      let fontSize = "16px"; // Default size for smaller devices
      let padding = "8px 16px";
  
      if (screenWidth >= 768) {
        fontSize = "14px"; // Tablets
        padding = "10px 20px";
      }
      if (screenWidth >= 1024) {
        fontSize = "12px"; // Laptops and desktops
        padding = "12px 24px";
      }
  
      return {
        background: "#dedede",
        color: "#111",
        fontFamily: "font-3",
        fontSize,
        padding,
        borderRadius: "0px",
        boxShadow: "none",
      };
    };
  
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill all fields", {
        style: getResponsiveStyle(),
      });
      return;
    }
  
    const serviceId = "service_wl306el";
    const templateId = "template_g0xlsp3";
    const publicKey = "Gxv20eIyhpYcaTama";
  
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Ansh Koshti",
      from_message: message,
    };
  
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        (res) => {
          setName("");
          setEmail("");
          setMessage("");
          form.current.reset();
  
          toast.success("Message sent successfully!", {
            style: getResponsiveStyle(),
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
          toast.error("Failed to send message. Please try again later.", {
            style: getResponsiveStyle(),
          });
        }
      );
  };
   

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

  return (
    <main className='w-full min-h-screen z-[100] p-6 md:p-24 bg-[#FAF8F3] flex justify-center items-center'>
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000}
        hideProgressBar={true}
        closeButton={true}
        toastStyle={{
          background: '#dedede',
          color: '#111',
          fontFamily: 'font-3',
          fontSize: '0.8vw',
          padding: '12px 24px',
          borderRadius: '0px',
          boxShadow: 'none'
        }}
      />
      <div className='w-full h-full gap-5 p-4 md:p-10 flex flex-col lg:flex-row justify-between items-center'>
          <div className='w-full lg:w-1/2 mt-5 h-full flex flex-col justify-start items-start gap-2 md:border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-[#111]'>
            <div className='w-full h-1/4 mb-5'>
              <h1 className='text-[5vw] md:text-3xl lg:text-5xl text-[#111] font-extralight font-["font-3"]'>Let's Talk</h1>
              <p className='text-[3vw] md:text-lg lg:text-xl text-[#111] font-light font-["font-3"] mt-1 leading-none'>I'm excited to hear about your projects! Whether it's collaboration or just a friendly chat, I'd love to connect.</p>
            </div>
            <div className='w-full h-1/4 flex flex-col mb-5'>
              <h1 className='text-[4vw] md:text-xl lg:text-2xl text-[#111] font-extralight font-["font-3"]'>Email:</h1>
              <a href="mailto:anshkoshti1@gmail.com" className="w-full md:w-1/3 flex justify-center items-center button mt-4 px-4 md:px-8 lg:px-24 py-2 md:py-4 border-[1px] border-[#111] text-[3vw] md:text-xs lg:text-sm font-['font-3'] lg:hover:bg-[#111] lg:hover:text-[#fff] transition-colors duration-300">
                  anshkoshti1@gmail.com
              </a>
            </div>
            <div className='w-full h-1/4 flex flex-col mb-5'>
              <h1 className='text-[4vw] md:text-[1.5vw] lg:text-2xl text-[#111] font-extralight font-["font-3"]'>Social Account:</h1>
              <div className='flex gap-3'>
                <a href="https://www.linkedin.com/in/ansh-koshti-38ba3a269/" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/5 flex justify-center items-center button mt-4 px-4 md:px-8 py-2 md:py-4 border-[1px] border-[#111] text-[3vw] md:text-xs  lg:text-sm font-['font-3'] lg:hover:bg-[#111] lg:hover:text-[#fff] transition-colors duration-300" aria-label="Visit my LinkedIn profile">
                    LinkedIn
                </a>
                <a href="https://github.com/anshkoshti1" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/5 flex justify-center items-center button mt-4 px-4 md:px-8 py-2 md:py-4 border-[1px] border-[#111] text-[3vw] md:text-xs  lg:text-sm font-['font-3'] lg:hover:bg-[#111] lg:hover:text-[#fff] transition-colors duration-300" aria-label="Visit my LinkedIn profile">
                    Github
                </a>
              </div>
            </div>
          </div>
          <div className='w-full lg:w-1/2 h-full border-[1px] border-[#111] lg:border-none'>
            <form ref={form} onSubmit={sendEmail} className="w-full h-full flex flex-col gap-4 md:gap-8 p-4 md:p-10 rounded-2xl">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-[3vw] md:text-sm lg:text-xl text-[#111] font-light font-['font-3']">
                  Name
                </label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border-b-[1px] border-[#111] font-['font-3'] bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-[3vw] md:text-sm lg:text-xl text-[#111] font-light font-['font-3']">
                  Email
                </label>
                <input
                  type="email" 
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-b-[1px] border-[#111] font-['font-3'] bg-transparent focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-[3vw] md:text-sm lg:text-xl text-[#111] font-light font-['font-3']">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="w-full p-2 border-b-[1px] border-[#111] font-['font-3'] bg-transparent focus:outline-none resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full md:w-2/4 py-2 md:py-4 text-[#111] border-[1px] border-[#111] font-['font-3'] text-[3vw] md:text-sm lg:text-md lg:hover:bg-[#111] lg:hover:text-[#fff] transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
      </div>
    </main>
  )
}

export default Contact;