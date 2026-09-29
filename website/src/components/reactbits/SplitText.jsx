import React, { useState, useEffect } from 'react';

/**
 * SplitText component inspired by React Bits
 * Animates text words with subtle staggered reveal
 */
export default function SplitText({
  text = "",
  className = "",
  delay = 40,
  duration = 0.5,
}) {
  const [mounted, setMounted] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block whitespace-nowrap mr-[0.28em] overflow-hidden align-top"
        >
          <span
            className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transitionDuration: `${duration}s`,
              transitionDelay: `${wordIndex * delay}ms`,
              transform: mounted ? 'translateY(0)' : 'translateY(110%)',
              opacity: mounted ? 1 : 0,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}
