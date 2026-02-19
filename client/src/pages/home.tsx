import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Navbar from "@/components/navbar";

// Import images from attached assets
import bgImg from "@assets/banner_background_1771534612380.jpg";
import mgImg from "@assets/banner_middleground_1771534612380.png";
import fgImg from "@assets/banner_foreground_1771534612375.png";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position values (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the motion
  const smoothOptions = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(mouseX, smoothOptions);
  const smoothY = useSpring(mouseY, smoothOptions);

  // Parallax transform values (how far each layer moves)
  // Background moves slightly opposite
  const bgX = useTransform(smoothX, [-1, 1], [15, -15]);
  const bgY = useTransform(smoothY, [-1, 1], [15, -15]);

  // Middleground moves slightly with mouse
  const mgX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const mgY = useTransform(smoothY, [-1, 1], [-20, 20]);

  // Foreground moves more with mouse to create depth
  const fgX = useTransform(smoothX, [-1, 1], [-45, 45]);
  const fgY = useTransform(smoothY, [-1, 1], [-45, 45]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized position from center (-1 to 1)
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    // Reset to center smoothly when mouse leaves
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main>
        {/* Parallax Hero Section */}
        <section 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[100svh] overflow-hidden bg-[#E2E8F0] flex items-center justify-center"
        >
          {/* Background Layer (Office) */}
          <motion.div 
            style={{ x: bgX, y: bgY }}
            className="absolute inset-[-5%] w-[110%] h-[110%] z-0"
          >
            <img 
              src={bgImg} 
              alt="Office Background" 
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>

          {/* Middleground Layer (Plant) */}
          <motion.div 
            style={{ x: mgX, y: mgY }}
            className="absolute right-[-5%] top-1/4 h-[50%] md:h-[70%] z-10 flex justify-end opacity-90 pointer-events-none"
          >
            <img 
              src={mgImg} 
              alt="Plant Foreground" 
              className="w-auto h-full object-contain object-right"
            />
          </motion.div>

          {/* Foreground Layer (People) */}
          <motion.div 
            style={{ x: fgX, y: fgY }}
            className="absolute inset-[-5%] w-[110%] h-[110%] z-20"
          >
            <img 
              src={fgImg} 
              alt="People Collaborating" 
              className="w-full h-full object-cover object-center scale-105"
            />
          </motion.div>

          {/* Overlay to help text stand out */}
          <div className="absolute inset-0 bg-black/40 z-30" />

          {/* Text Content */}
          <div className="relative z-40 flex flex-col items-center justify-center text-center text-white px-4 pt-16 pointer-events-none">
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 drop-shadow-xl" 
              style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
            >
              UNLOCKING
            </h1>
            <p 
              className="text-sm md:text-xl lg:text-2xl font-medium tracking-wide max-w-3xl mb-4 drop-shadow-md uppercase"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
            >
              Connecting crypto infrastructure with real world assets
            </p>
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight drop-shadow-xl"
              style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
            >
              GENEROUSITY
            </h2>
          </div>
        </section>

        {/* Filler Content for Scrolling */}
        <section className="bg-[#0f1214] text-gray-300 py-32 px-6 lg:px-24 min-h-[50vh] flex flex-col justify-center">
          <div className="max-w-4xl">
            <h3 className="text-xl mb-6 font-medium">Infinet Development, Inc.</h3>
            <p className="text-gray-400">
              For more information contact us at matt@b4.vc
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
