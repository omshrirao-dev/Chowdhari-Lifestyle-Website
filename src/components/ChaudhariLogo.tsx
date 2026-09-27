import React from 'react';

interface ChaudhariLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
}

export const ChaudhariLogo: React.FC<ChaudhariLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
  showTagline = true,
}) => {
  // Dimension tuning based on requested size
  const iconSize =
    size === 'sm' ? 36 : size === 'lg' ? 54 : size === 'xl' ? 68 : 46;

  const brandTitleClass =
    size === 'sm'
      ? 'text-lg tracking-wider'
      : size === 'lg'
      ? 'text-2xl sm:text-3xl tracking-wider'
      : size === 'xl'
      ? 'text-3xl sm:text-4xl tracking-wider'
      : 'text-xl sm:text-2xl tracking-wider';

  const subtitleClass =
    size === 'sm'
      ? 'text-[9px] tracking-[0.28em]'
      : size === 'lg'
      ? 'text-xs tracking-[0.35em]'
      : size === 'xl'
      ? 'text-sm tracking-[0.38em]'
      : 'text-[10px] sm:text-[11px] tracking-[0.32em]';

  const taglineClass =
    size === 'sm'
      ? 'text-[8px] tracking-wider'
      : 'text-[9px] tracking-wider';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Authentic Signboard Emblem with Teal, Magenta-Rose Swirl, and Warm Sand Petals */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 filter drop-shadow-xs"
        aria-label="Chaudhari Lifestyle Emblem"
      >
        <defs>
          {/* Subtle 3D gradient for top teal petal */}
          <linearGradient id="clTealGrad" x1="20" y1="20" x2="52" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#25726d" />
            <stop offset="1" stopColor="#174e4a" />
          </linearGradient>

          {/* Warm Sand / Amber-Peach gradient for bottom-left petal */}
          <linearGradient id="clSandGrad" x1="18" y1="52" x2="48" y2="84" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f3be84" />
            <stop offset="1" stopColor="#d59957" />
          </linearGradient>

          {/* Magenta / Raspberry Rose gradient for dynamic ribbon */}
          <linearGradient id="clMagentaGrad" x1="30" y1="24" x2="88" y2="88" gradientUnits="userSpaceOnUse">
            <stop stopColor="#cb2d63" />
            <stop offset="1" stopColor="#9a1d4b" />
          </linearGradient>
        </defs>

        {/* Soft dimensional shadow */}
        <g opacity="0.12" transform="translate(1.5, 2.5)">
          <circle cx="36" cy="34" r="18" fill="#000" />
          <circle cx="32" cy="68" r="19" fill="#000" />
          <path
            d="M52 24C65 24 72 34 70 46C68 56 56 58 48 59C38 60 32 64 34 74C36 84 48 90 62 90C76 90 88 80 88 66C88 54 78 46 70 46"
            stroke="#000"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <circle cx="68" cy="70" r="21" fill="#000" />
        </g>

        {/* 1. Top Teal-Green Petal/Circle */}
        <circle cx="36" cy="34" r="18" fill="url(#clTealGrad)" />

        {/* 2. Bottom-Left Warm Sand / Peach-Amber Petal/Circle */}
        <circle cx="32" cy="68" r="19" fill="url(#clSandGrad)" />

        {/* 3. Magenta-Rose Organic Swirl / "C" Ribbon as on Signboard */}
        <path
          d="M 52 24 C 64 24 72 32 70 44 C 68 53 58 57 48 59 C 39 61 33 66 35 74 C 37 83 48 88 62 88"
          stroke="url(#clMagentaGrad)"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />

        {/* 4. Large Right Bulb of the Magenta Swirl */}
        <circle cx="68" cy="70" r="21" fill="url(#clMagentaGrad)" />

        {/* Highlight sheen dot on the teal circle */}
        <circle cx="33" cy="31" r="5" fill="#ffffff" opacity="0.25" />
      </svg>

      {/* Typography: Bold Teal CHAUDHARI & Charcoal LIFESTYLE as on the store signboard */}
      <div className="flex flex-col justify-center">
        {/* CHAUDHARI in rich teal green matching the physical store board */}
        <span
          className={`font-sans font-extrabold uppercase leading-none tracking-tight ${brandTitleClass} ${
            variant === 'dark' ? 'text-[#2dd4bf]' : 'text-[#1c5652]'
          }`}
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            letterSpacing: '0.04em',
            textShadow: variant === 'dark' ? 'none' : '0 1px 1px rgba(28, 86, 82, 0.1)',
          }}
        >
          CHAUDHARI
        </span>

        {/* LIFESTYLE with wide tracking in dark charcoal */}
        <span
          className={`font-sans font-bold uppercase mt-1 leading-none ${subtitleClass} ${
            variant === 'dark' ? 'text-stone-200' : 'text-[#202326]'
          }`}
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          LIFESTYLE
        </span>

        {showTagline && (
          <span
            className={`font-sans uppercase mt-1 leading-none font-medium ${taglineClass} ${
              variant === 'dark' ? 'text-stone-400' : 'text-stone-500'
            }`}
          >
            Nagpur · Family Garments
          </span>
        )}
      </div>
    </div>
  );
};
