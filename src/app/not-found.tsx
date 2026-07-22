import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative inline-block mb-8">
          <div className="w-24 h-24 border border-gold-500/30 rotate-45">
            <div className="absolute inset-2 border border-gold-500/20" />
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display text-gold-500 text-5xl font-bold">
            404
          </span>
        </div>
        
        <h1 className="text-3xl font-display text-cream mb-4">
          Page Not Found
        </h1>
        <p className="text-cream/60 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 text-black font-medium rounded-lg hover:bg-gold-400 transition-colors duration-300"
        >
          Return Home
          <span>→</span>
        </a>
      </div>
    </div>
  );
}