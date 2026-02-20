import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef();
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const ballRef = useRef();
  const quoteRef = useRef();
  const cardsRef = useRef([]);
  //const statsRef = useRef([]);
  const historyRef = useRef();
  const footerRef = useRef();

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

    // Cytat – animacja przy scrollu
    gsap.from(quoteRef.current, {
      scrollTrigger: {
        trigger: quoteRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.9,
      opacity: 1,
      y: 50,
      duration: 1.2,
      ease: 'power3.out',
    });

    // Karty zawodników – pojawiają się kolejno
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 60,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'back.out(1.2)',
      });
    });
  
    // Sekcja historii – animacja tła i tekstu
    gsap.from(historyRef.current.querySelector('h2'), {
      scrollTrigger: {
        trigger: historyRef.current,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      x: -100,
      opacity: 0,
      duration: 1,
    });
    gsap.from(historyRef.current.querySelector('p'), {
      scrollTrigger: {
        trigger: historyRef.current,
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
    });

    // Stopka – fade in
    gsap.from(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        end: 'bottom 0%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 40,
      duration: 1,
    });

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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Dane zawodników
  const players = [
    {
      name: 'Michael Jordan',
      number: '23',
      desc: 'Legenda, która zdefiniowała grę.',
      color: 'bg-orange-900/30',
    },
    {
      name: 'LeBron James',
      number: '23',
      desc: 'Wszechstronność i dominacja.',
      color: 'bg-amber-900/30',
    },
    {
      name: 'Kobe Bryant',
      number: '24',
      desc: 'Mamba Mentality – zawsze gotowy.',
      color: 'bg-yellow-900/30',
    },
    {
      name: 'Shaquille O\'Neal',
      number: '34',
      desc: 'Siła, której nie da się zatrzymać.',
      color: 'bg-stone-900/30',
    },
  ];

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

      {/* Cytat */}
      <section className="py-32 px-4 bg-[#0e141f]">
        <div ref={quoteRef} className="max-w-4xl mx-auto text-center">
          <p className="text-3xl md:text-4xl lg:text-5xl font-light italic text-gray-300 leading-relaxed">
            "To nie jest tylko gra. To styl życia, pasja, która łączy pokolenia."
          </p>
          <p className="mt-8 text-xl text-orange-300/70">— Nieznany koszykarz</p>
        </div>
      </section>

      {/* Karty zawodników */}
      <section className="py-20 px-4 bg-[#0a0f1a]">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-100">
          Legendy <span className="text-orange-600/80">Parkietu</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {players.map((player, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`${player.color} p-8 rounded-3xl backdrop-blur-sm border border-white/5 hover:border-orange-500/30 transition-all duration-500 group`}
            >
              <div className="text-7xl font-black text-white/10 group-hover:text-orange-500/20 transition-colors duration-500">
                #{player.number}
              </div>
              <h3 className="text-2xl font-bold mt-4 text-white">{player.name}</h3>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">{player.desc}</p>
              <div className="mt-6 w-12 h-0.5 bg-orange-700/50 group-hover:w-20 transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Historia */}
      <section ref={historyRef} className="relative py-32 px-4 bg-[#0a0f1a] overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 5 L55 30 L30 55 L5 30 Z\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-100">
            Od <span className="text-orange-600/80">1891</span> do dziś
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Koszykówka narodziła się w Springfield jako prosta gra, by stać się globalnym fenomenem.
            Dziś to nie tylko sport – to kultura, styl życia i język, którym mówi cały świat.
            Nasza strona oddaje hołd tej niesamowitej podróży.
          </p>
        </div>
      </section>

      {/* Stopka */}
      <footer
        ref={footerRef}
        className="py-16 px-4 bg-[#060a12] border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">HOOPS</h3>
            <p className="text-gray-400 text-sm">
              Feel the Game. Own the Court. <br />
              Łączymy pasjonatów koszykówki na całym świecie.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">Odkrywaj</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Historia</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Legendy</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Statystyki</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Galeria</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">Dołącz</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Newsletter</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Społeczność</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Kontakt</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          © 2025 HOOPS. Wszelkie prawa zastrzeżone.
        </div>
      </footer>
    </div>
  );
}