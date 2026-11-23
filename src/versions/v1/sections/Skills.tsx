import type { SkillLayer } from '@/content/types';
import { Symbol } from '../Symbol';
import { LAYER_ACCENTS, layerTitle, skillIcon } from '../theme';

export function Skills({ skills }: { readonly skills: readonly SkillLayer[] }) {
  const lastIndex = skills.length - 1;

  return (
    <section id="skills" aria-label="Technical Skills" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden section-reveal">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            SYSTEM_v2.0_DEPLOYED
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            Tech <span className="text-primary">Stack</span> Grid
          </h2>
          <p className="text-tech-gray text-lg max-w-2xl leading-relaxed">
            A multi-layered architectural overview of the systems and technologies I leverage to build scalable,
            high-performance backend solutions.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((layer, i) => {
            // The final layer uses the neutral cloud look and spans the row when it would sit alone.
            const accent = i === lastIndex ? LAYER_ACCENTS[LAYER_ACCENTS.length - 1]! : LAYER_ACCENTS[i % (LAYER_ACCENTS.length - 1)]!;
            const wide = i === lastIndex && skills.length % 2 === 1;
            return (
              <li key={layer.id} className={`tech-card group ${wide ? 'md:col-span-2' : ''}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${accent.box}`}>
                      <Symbol name={accent.icon} />
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono tracking-widest uppercase ${accent.label}`}>
                        Layer {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{layerTitle(layer.id, layer.name)}</h3>
                    </div>
                  </div>
                  <Symbol name="arrow_forward" className={`text-gray-300 dark:text-border-dark transition-colors ${accent.arrow}`} />
                </div>
                <ul className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <li key={item} className="tech-tag">
                      <Symbol name={skillIcon(item)} className="text-xs" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] font-mono text-tech-gray border-t border-gray-200 dark:border-border-dark pt-8" aria-hidden="true">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-border-dark">MEM_USAGE:</span>
              <div className="w-24 h-1.5 bg-border-dark rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[42%]" />
              </div>
              <span>42%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-border-dark">CPU_LOAD:</span>
              <div className="w-24 h-1.5 bg-border-dark rounded-full overflow-hidden">
                <div className="bg-neon h-full w-[12%]" />
              </div>
              <span>12%</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-neon rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <span className="tracking-widest">SYSTEM_OPTIMAL_STABLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
