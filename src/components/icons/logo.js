import { useState, useEffect } from 'react';

const Logo = () => {
  const [currentVariant, setCurrentVariant] = useState(0);
  const [currentColors, setCurrentColors] = useState({});

  // Array các logo variants
  const logoVariants = [
    // GitHub Cat
    {
      title: "github-cat",
      paths: [
        <circle key="bg" cx="32" cy="32" r="28" className="logo-bg" />,
        <path key="cat" className="logo-main" d="M32,12c-8.8,0-16,7.2-16,16c0,7.1,4.6,13.1,10.9,15.2c0.8,0.1,1.1-0.3,1.1-0.8c0-0.4,0-1.4,0-2.7c-4.5,1-5.4-2.1-5.4-2.1c-0.7-1.8-1.8-2.3-1.8-2.3c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.6,2.5,1.6c1.4,2.4,3.7,1.7,4.6,1.3c0.1-1,0.6-1.7,1-2.1c-3.6-0.4-7.3-1.8-7.3-8c0-1.8,0.6-3.2,1.6-4.4c-0.2-0.4-0.7-2,0.2-4.2c0,0,1.3-0.4,4.4,1.7c1.3-0.4,2.6-0.5,4-0.5c1.4,0,2.7,0.2,4,0.5c3.1-2.1,4.4-1.7,4.4-1.7c0.9,2.2,0.3,3.8,0.2,4.2c1,1.1,1.6,2.6,1.6,4.4c0,6.2-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5c0,0.4,0.3,0.9,1.1,0.8C43.4,41.1,48,35.1,48,28C48,19.2,40.8,12,32,12z"/>,
        <circle key="star1" cx="15" cy="18" r="2" className="logo-accent1" />,
        <circle key="star2" cx="49" cy="22" r="1.5" className="logo-accent2" />
      ]
    },
    // Rocket
    {
      title: "rocket-ship",
      paths: [
        <circle key="bg" cx="32" cy="32" r="28" className="logo-bg" />,
        <path key="rocket" className="logo-main" d="M32,8 L38,20 L44,18 L42,24 L48,32 L42,40 L44,46 L38,44 L32,56 L26,44 L20,46 L22,40 L16,32 L22,24 L20,18 L26,20 Z" />,
        <path key="flame1" className="logo-accent1" d="M28,52 L32,60 L36,52 L32,48 Z" />,
        <path key="flame2" className="logo-accent2" d="M30,50 L32,56 L34,50 L32,46 Z" />,
        <circle key="window" cx="32" cy="28" r="4" className="logo-window" />
      ]
    },
    // Code Symbol
    {
      title: "code-symbol",
      paths: [
        <circle key="bg" cx="32" cy="32" r="28" className="logo-bg" />,
        <path key="bracket1" className="logo-main" d="M20,16 L16,20 L16,24 L12,28 L12,36 L16,40 L16,44 L20,48" strokeWidth="3" fill="none" stroke="currentColor" />,
        <path key="bracket2" className="logo-main" d="M44,16 L48,20 L48,24 L52,28 L52,36 L48,40 L48,44 L44,48" strokeWidth="3" fill="none" stroke="currentColor" />,
        <path key="slash" className="logo-accent1" d="M28,16 L36,48" strokeWidth="4" fill="none" stroke="currentColor" />,
        <circle key="dot1" cx="24" cy="32" r="2" className="logo-accent2" />,
        <circle key="dot2" cx="40" cy="32" r="2" className="logo-accent2" />
      ]
    },
    // Star Burst
    {
      title: "star-burst",
      paths: [
        <circle key="bg" cx="32" cy="32" r="28" className="logo-bg" />,
        <path key="star" className="logo-main" d="M32,10 L34,22 L46,20 L36,28 L42,38 L32,32 L22,38 L28,28 L18,20 L30,22 Z" />,
        <path key="burst1" className="logo-accent1" d="M32,6 L32,14 M54,32 L46,32 M32,58 L32,50 M10,32 L18,32" strokeWidth="3" stroke="currentColor" />,
        <path key="burst2" className="logo-accent2" d="M45,17 L39,23 M45,47 L39,41 M19,17 L25,23 M19,47 L25,41" strokeWidth="2" stroke="currentColor" />
      ]
    },
    // Hexagon Tech
    {
      title: "hexagon-tech",
      paths: [
        <circle key="bg" cx="32" cy="32" r="28" className="logo-bg" />,
        <path key="hex" className="logo-main" d="M32,12 L44,20 L44,44 L32,52 L20,44 L20,20 Z" />,
        <path key="inner" className="logo-accent1" d="M32,18 L38,22 L38,42 L32,46 L26,42 L26,22 Z" />,
        <circle key="center" cx="32" cy="32" r="6" className="logo-accent2" />,
        <circle key="core" cx="32" cy="32" r="3" className="logo-window" />
      ]
    }
  ];

  // Random color schemes
  const colorSchemes = [
    {
      bg: ['#6366f1', '#4f46e5'],
      main: '#ffffff',
      accent1: '#10b981',
      accent2: '#f59e0b',
      window: '#ffffff'
    },
    {
      bg: ['#ec4899', '#be185d'],
      main: '#ffffff',
      accent1: '#8b5cf6',
      accent2: '#06b6d4',
      window: '#ffffff'
    },
    {
      bg: ['#f59e0b', '#d97706'],
      main: '#ffffff',
      accent1: '#ef4444',
      accent2: '#10b981',
      window: '#ffffff'
    },
    {
      bg: ['#10b981', '#059669'],
      main: '#ffffff',
      accent1: '#6366f1',
      accent2: '#f59e0b',
      window: '#ffffff'
    },
    {
      bg: ['#8b5cf6', '#7c3aed'],
      main: '#ffffff',
      accent1: '#ec4899',
      accent2: '#06b6d4',
      window: '#ffffff'
    }
  ];

  // Random chọn variant và colors
  useEffect(() => {
    const randomVariant = Math.floor(Math.random() * logoVariants.length);
    const randomColorScheme = Math.floor(Math.random() * colorSchemes.length);
    
    setCurrentVariant(randomVariant);
    setCurrentColors(colorSchemes[randomColorScheme]);

    // Auto change mỗi 10 giây
    const interval = setInterval(() => {
      const newVariant = Math.floor(Math.random() * logoVariants.length);
      const newColorScheme = Math.floor(Math.random() * colorSchemes.length);
      
      setCurrentVariant(newVariant);
      setCurrentColors(colorSchemes[newColorScheme]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentLogo = logoVariants[currentVariant] || logoVariants[0];

  return (
    <svg 
      id='githunt-logo' 
      xmlns="http://www.w3.org/2000/svg" 
      width="64" 
      height="64" 
      viewBox="0 0 64 64"
      style={{
        transition: 'all 0.8s ease-in-out',
        transform: 'rotate(0deg)',
        animation: 'logoSpin 20s linear infinite'
      }}
    >
      <defs>
        <linearGradient id="dynamicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={currentColors.bg?.[0] || '#6366f1'} />
          <stop offset="100%" stopColor={currentColors.bg?.[1] || '#4f46e5'} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <style>{`
        #githunt-logo {
          filter: drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3));
        }
        #githunt-logo .logo-bg { 
          fill: url(#dynamicGradient);
          filter: url(#glow);
        }
        #githunt-logo .logo-main { 
          fill: ${currentColors.main || '#ffffff'};
          transition: all 0.8s ease;
        }
        #githunt-logo .logo-accent1 { 
          fill: ${currentColors.accent1 || '#10b981'};
          transition: all 0.8s ease;
        }
        #githunt-logo .logo-accent2 { 
          fill: ${currentColors.accent2 || '#f59e0b'};
          transition: all 0.8s ease;
        }
        #githunt-logo .logo-window { 
          fill: ${currentColors.window || '#ffffff'};
          transition: all 0.8s ease;
        }
        
        @keyframes logoSpin {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.05); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes colorShift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
      
      <title>{currentLogo.title}</title>
      <g id="random-logo" style={{ animation: 'colorShift 3s ease-in-out infinite' }}>
        {currentLogo.paths}
      </g>
    </svg>
  );
};

export default Logo;
