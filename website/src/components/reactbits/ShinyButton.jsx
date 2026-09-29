import React from 'react';

/**
 * ShinyButton inspired by React Bits
 * Minimalist high-tech button with subtle animated border and metallic sheen
 */
export default function ShinyButton({
  children,
  onClick,
  className = "",
  variant = "primary", // 'primary', 'secondary', 'ghost'
  ...props
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl overflow-hidden group select-none active:scale-[0.98]";

  const variantStyles = {
    primary: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold px-5 py-3 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)]",
    secondary: "bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 border border-slate-800 hover:border-slate-700 px-5 py-3 backdrop-blur-sm shadow-sm",
    amberOutline: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:border-amber-500/60 px-5 py-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {/* Subtle shine sweep overlay */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
