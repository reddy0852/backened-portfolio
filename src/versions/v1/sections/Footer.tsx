import { Symbol } from '../Symbol';

export function Footer({ name }: { readonly name: string }) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#080808] pt-8 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          &copy; {new Date().getFullYear()} {name}. <span className="text-neon opacity-70">All systems operational.</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon/10 border border-neon/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon" />
            </span>
            <span className="text-xs font-bold text-neon font-mono tracking-wider terminal-glow-green">SYSTEM STABLE</span>
          </div>
        </div>
        <div className="flex space-x-6 md:mr-20">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all group cursor-pointer"
          >
            <Symbol name="keyboard_arrow_up" className="text-gray-500 group-hover:text-primary transition-colors text-xl" />
          </button>
        </div>
      </div>
    </footer>
  );
}
