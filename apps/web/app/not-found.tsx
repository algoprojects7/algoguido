import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white text-slate-900 bg-mesh">
      <div className="text-center px-6 max-w-md">
        <h1 className="font-display font-extrabold text-8xl text-brand-500 tracking-tight mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-slate-800 tracking-tight mb-2">Page Not Found</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          The page you are looking for does not exist, has been moved, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-full font-bold uppercase tracking-wider text-xs h-11 px-6 bg-gradient-brand text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
