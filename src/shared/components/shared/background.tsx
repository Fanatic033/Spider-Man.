export const BgMain = () => {
  return (
    <>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,0,0,0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(0,0,255,0.3) 0%, transparent 50%)
          `,
        }}
      ></div>

      <div className="absolute top-20 right-20 text-8xl opacity-10 animate-float">
        🕷️
      </div>
      <div className="absolute bottom-32 left-16 text-6xl opacity-15 animate-float animation-delay-2000">
        🕸️
      </div>
      <div className="absolute top-1/2 right-1/4 text-4xl opacity-20 animate-float animation-delay-4000">
        🕷️
      </div>
    </>
  );
};
