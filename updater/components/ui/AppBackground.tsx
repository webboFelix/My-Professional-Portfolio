export function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#060b14]" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px]" />
      <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-600/8 blur-[90px]" />
    </div>
  );
}
