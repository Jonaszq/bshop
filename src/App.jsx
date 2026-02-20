import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function App() {
  const containerRef = useRef();
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ballRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    // Animacja hero
    gsap.from(titleRef.current, {
      y: -40,
      opacity: 1,
      duration: 1.5,
      ease: 'power4.out',
    });
    gsap.from(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.4,
      ease: 'power4.out',
    });

    // Próba odtworzenia muzyki
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Jeśli autoplay zablokowany, odtwórz po pierwszym kliknięciu
          const playOnClick = () => {
            audioRef.current?.play();
            document.removeEventListener('click', playOnClick);
          };
          document.addEventListener('click', playOnClick);
        });
      }
    };

    playAudio();

    // Efekt parallax w hero
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      gsap.to(heroRef.current, {
        backgroundPosition: `${50 + x}% ${50 + y}%`,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.to(ballRef.current, {
        x: 30 + x * 0.5,
        y: -20 + y * 0.5,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#0a0f1a] text-gray-200 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 40%, rgba(255,140,0,0.05) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(100,100,100,0.05) 0%, transparent 40%)',
          backgroundColor: '#0a0f1a',
        }}
      >
      
        {/* Piłka w tle */}
        <div
          ref={ballRef}
          className="absolute w-96 h-96 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'2\'/%3E%3Cpath d=\'M20 20 L80 80 M80 20 L20 80\' stroke=\'%23ffffff\' stroke-width=\'2\'/%3E%3C/svg%3E")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <div className="relative z-10 text-center">
          <h1
            ref={titleRef}
            className="text-[clamp(4rem,12vw,10rem)] font-black uppercase tracking-tighter leading-none"
            style={{
              fontFamily: "'Anton', sans-serif",
              color: '#ffffff',
              textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,140,0,0.3)',
            }}
          >
            HOOPS
          </h1>
          <p
            ref={subtitleRef}
            className="mt-4 text-[clamp(1.2rem,2.5vw,2rem)] font-light tracking-widest text-gray-300"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            FEEL THE GAME. OWN THE COURT.
          </p>
          <div className="mt-12 flex gap-6 justify-center">
            <button className="px-8 py-3 border border-orange-700/50 bg-orange-900/20 backdrop-blur-sm text-orange-200 rounded-full hover:bg-orange-800/30 hover:border-orange-600 transition-all duration-300">
              Explore
            </button>
            <button className="px-8 py-3 border border-gray-600/50 bg-gray-900/20 backdrop-blur-sm text-gray-200 rounded-full hover:bg-gray-800/30 hover:border-gray-400 transition-all duration-300">
              Watch Highlights
            </button>
          </div>
        </div>

        {/* Delikatny gradient na dole */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent" />
      </section>

      {/* Background Music */}
      <audio ref={audioRef} src="/music.mp3" loop />
    </div>
  );
}