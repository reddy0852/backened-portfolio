import type { Profile } from '@/content/types';
import { careerMonths, yearsLabel } from '@/lib/profile';
import { Symbol } from '../Symbol';

export function Hero({ profile }: { readonly profile: Profile }) {
  const handle = profile.name.toLowerCase().replace(/\s+/g, '_');
  const firstName = profile.name.split(' ')[0]?.toLowerCase() ?? 'profile';

  return (
    <section id="home" aria-label="Introduction" className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electric/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
            System Identity
          </div>
        </div>

        <div className="bg-card-light dark:bg-card-dark rounded-3xl shadow-clay-light dark:shadow-clay-dark border border-gray-200 dark:border-gray-800 transition-transform duration-500 hover:scale-[1.005]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm rounded-t-3xl">
            <div className="flex space-x-2" aria-hidden="true">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/30" />
              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/30" />
              <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/30" />
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 select-none">
              <Symbol name="terminal" className="text-sm" />
              <span className="hidden sm:inline">{handle}@profile:~</span>
              <span className="sm:hidden">profile:~</span>
            </div>
            <div className="w-12" />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-7/12 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-mono font-bold border border-green-500/20 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span>SYSTEM ONLINE</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight font-display">
                  Backend Engineer ;<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">Building Scalable Systems</span>
                </h1>
                <div className="font-mono text-sm text-gray-500 dark:text-gray-400 border-l-2 border-primary pl-4 py-1 bg-gray-50 dark:bg-background-dark/50 rounded-r">
                  <span className="text-primary mr-2">$</span> cat {firstName}_summary.txt
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">{profile.summary}</p>
              </div>

              <div className="lg:w-5/12 w-full grid grid-cols-1 gap-5">
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-orange-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
                  <div className="relative flex items-center justify-between p-5 bg-background-light dark:bg-[#151515] rounded-xl border border-gray-200 dark:border-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <div>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Total Uptime</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{yearsLabel(careerMonths(profile.roles))}</span>
                        <span className="text-sm text-gray-500 font-medium">Years</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Years of Experience</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-black shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] dark:shadow-[5px_5px_10px_#0b0b0b,-5px_-5px_10px_#252525] flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300 border border-white/20 dark:border-black/20">
                      <Symbol name="hourglass_top" className="text-primary text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
