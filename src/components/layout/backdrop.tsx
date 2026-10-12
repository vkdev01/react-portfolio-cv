const EQUATIONS = [
  { text: "θ ← θ − η∇L(θ)", className: "top-[14%] left-[3%] text-sm", rotate: -6, delay: 0 },
  { text: "softmax(QKᵀ/√dₖ)V", className: "top-[22%] right-[4%] text-sm", rotate: 4, delay: 2 },
  { text: "σ(x) = 1 / (1 + e⁻ˣ)", className: "top-[48%] left-[2%] text-xs hidden xl:block", rotate: 3, delay: 4 },
  { text: "−Σᵢ yᵢ log ŷᵢ", className: "top-[58%] right-[3%] text-sm", rotate: -4, delay: 1 },
  { text: "∂L/∂w", className: "top-[78%] left-[6%] text-base hidden xl:block", rotate: 5, delay: 3 },
  { text: "ŷ = Wx + b", className: "top-[86%] right-[8%] text-xs hidden md:block", rotate: -3, delay: 5 },
  { text: "λ‖w‖²", className: "top-[36%] right-[12%] text-base hidden lg:block", rotate: 8, delay: 6 },
  { text: "P(A|B) = P(B|A)P(A) / P(B)", className: "top-[64%] left-[1%] text-xs hidden xl:block", rotate: -2, delay: 2.5 },
  { text: "KL(P ‖ Q)", className: "top-[6%] left-[38%] text-xs hidden lg:block", rotate: 2, delay: 4.5 },
  { text: "max(0, x)", className: "top-[92%] left-[42%] text-xs hidden md:block", rotate: -5, delay: 1.5 },
];

const GLYPHS = [
  { text: "∇", className: "top-[30%] left-[9%] text-6xl hidden xl:block", delay: 1 },
  { text: "Σ", className: "top-[72%] right-[14%] text-7xl", delay: 3.5 },
  { text: "∂", className: "top-[8%] right-[26%] text-5xl hidden md:block", delay: 2 },
  { text: "∫", className: "top-[88%] left-[4%] text-6xl hidden xl:block", delay: 4 },
];

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none">
      <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="absolute -top-40 left-1/2 h-112 w-3xl -translate-x-1/2 rounded-full bg-brand/20 blur-[120px] dark:bg-brand/15" />
      <div className="absolute top-40 -right-40 size-96 rounded-full bg-brand-2/10 blur-[120px]" />

      {EQUATIONS.map(({ text, className, rotate, delay }) => (
        <span
          key={text}
          className={`absolute font-mono whitespace-nowrap text-foreground/[0.09] ${className}`}
          style={{ rotate: `${rotate}deg` }}
        >
          <span className="block animate-float motion-reduce:animate-none" style={{ animationDelay: `-${delay}s` }}>
            {text}
          </span>
        </span>
      ))}
      {GLYPHS.map(({ text, className, delay }) => (
        <span key={text} className={`absolute font-serif text-brand/[0.12] ${className}`}>
          <span className="block animate-float-slow motion-reduce:animate-none" style={{ animationDelay: `-${delay}s` }}>
            {text}
          </span>
        </span>
      ))}
    </div>
  );
}
