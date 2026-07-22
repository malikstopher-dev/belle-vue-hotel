export default function Loading() {
  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <div className="w-16 h-16 border border-gold-500/30 rotate-45 animate-spin-slow">
            <div className="absolute inset-2 border border-gold-500/20" />
          </div>
        </div>
        <p className="text-sm text-cream/40 tracking-widest uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}