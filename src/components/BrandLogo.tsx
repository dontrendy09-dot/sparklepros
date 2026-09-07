import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({
  className = '',
  variant = 'light',
  size = 'md',
}: BrandLogoProps) {
  const isDark = variant === 'dark';
  const [hasError, setHasError] = useState(false);

  // Height configurations
  const heightClasses = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-10 md:h-11',
    lg: 'h-11 sm:h-12 md:h-14',
  };

  // Select asset based on light/dark theme
  // For dark footer: use the white silhouette version or original framed
  // For light nav: use the transparent PNG extracted from the uploaded JPEG
  const logoSrc = isDark
    ? '/sparkle-pros-logo-white.png'
    : '/sparkle-pros-logo-transparent.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {!hasError ? (
        <img
          src={logoSrc}
          alt="Sparkle Pros - STEAM CLEANS BETTER"
          className={`${heightClasses[size]} w-auto object-contain transition-opacity duration-300 block`}
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Direct fallback to original uploaded JPEG with clean rounded presentation */
        <img
          src="/sparkle-pros-logo.jpeg"
          alt="Sparkle Pros - STEAM CLEANS BETTER"
          className={`${heightClasses[size]} w-auto object-contain rounded-md block ${
            isDark ? 'brightness-110 contrast-105' : ''
          }`}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}


