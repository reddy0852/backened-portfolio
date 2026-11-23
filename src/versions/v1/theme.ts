/**
 * Presentation lookups for the terminal design. Tailwind needs full class names
 * written out literally, so accent variants live here as complete strings.
 */

/** Material Symbol per skill (case-insensitive). Unknown skills fall back to `code`. */
const SKILL_ICONS: Record<string, string> = {
  java: 'coffee',
  python: 'terminal',
  sql: 'database',
  'spring boot': 'bolt',
  'spring mvc': 'dashboard',
  'spring data jpa': 'table_rows',
  'restful apis': 'settings_ethernet',
  resilience4j: 'shield',
  mongodb: 'description',
  postgresql: 'database',
  linux: 'terminal',
  sdlc: 'cycle',
  'data structures': 'data_object',
  microservices: 'apps',
  'spring cloud': 'cloud_queue',
  git: 'fork_right',
  docker: 'deployed_code',
  gradle: 'construction',
  'apache kafka': 'stream',
  kafka: 'stream',
  jenkins: 'precision_manufacturing',
  'github copilot': 'smart_toy',
  postman: 'send',
  sonarqube: 'bug_report',
  jira: 'task_alt',
  grpc: 'sync_alt',
  redis: 'cached',
  'google cloud platform': 'cloud',
};

export const skillIcon = (skill: string): string => SKILL_ICONS[skill.toLowerCase()] ?? 'code';

/** Layer titles as the original page worded them; other ids use the content name. */
const LAYER_TITLES: Record<string, string> = {
  frameworks: 'Libraries & Frameworks',
  workflow: 'Developer Workflow',
  data: 'Data & Systems',
  cloud: 'Cloud Platform',
};

export const layerTitle = (id: string, fallback: string): string => LAYER_TITLES[id] ?? fallback;

export interface LayerAccent {
  readonly icon: string;
  readonly box: string;
  readonly label: string;
  readonly arrow: string;
}

/** Cycled by layer position; the last style is the neutral "cloud" look. */
export const LAYER_ACCENTS: readonly LayerAccent[] = [
  { icon: 'code', box: 'bg-neon/10 border-neon/20 text-neon', label: 'text-neon', arrow: 'group-hover:text-neon' },
  {
    icon: 'library_books',
    box: 'bg-secondary/10 border-secondary/20 text-secondary',
    label: 'text-secondary',
    arrow: 'group-hover:text-secondary',
  },
  { icon: 'storage', box: 'bg-primary/10 border-primary/20 text-primary', label: 'text-primary', arrow: 'group-hover:text-primary' },
  {
    icon: 'construction',
    box: 'bg-electric/10 border-electric/20 text-electric',
    label: 'text-electric',
    arrow: 'group-hover:text-electric',
  },
  {
    icon: 'cloud_circle',
    box: 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white',
    label: 'text-tech-gray',
    arrow: 'group-hover:text-gray-900 dark:group-hover:text-white',
  },
];

export interface RoleAccent {
  readonly node: string;
  readonly nodeIcon: string;
  readonly nodeIconClass: string;
  readonly badge: string;
  readonly prompt: string;
  readonly bulletIcon: string;
  readonly bullet: string;
  readonly chip: string;
  readonly cardIcon: string;
}

export const CURRENT_ROLE: RoleAccent = {
  node: 'w-8 h-8 border-accent-teal shadow-glow transition-transform duration-300 group-hover:scale-110',
  nodeIcon: 'verified',
  nodeIconClass: 'text-accent-teal',
  badge: 'text-accent-teal bg-accent-teal/10',
  prompt: 'text-green-500',
  bulletIcon: 'check_circle',
  bullet: 'text-accent-teal',
  chip: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  cardIcon: 'dns',
};

export const PAST_ROLE: RoleAccent = {
  node: 'w-8 h-8 border-blue-500 shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300',
  nodeIcon: 'commit',
  nodeIconClass: 'text-blue-500',
  badge: 'text-blue-500 bg-blue-500/10',
  prompt: 'text-blue-500',
  bulletIcon: 'arrow_right',
  bullet: 'text-blue-500',
  chip: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  cardIcon: 'code',
};

export interface CertAccent {
  readonly icon: string;
  readonly card: string;
  readonly iconBox: string;
  readonly iconText: string;
  readonly title: string;
  readonly link: string;
}

export const CERT_ACCENTS: readonly CertAccent[] = [
  {
    icon: 'cloud_done',
    card: 'dark:hover:border-secondary/30 dark:hover:shadow-glow',
    iconBox: 'group-hover:border-secondary/50',
    iconText: 'group-hover:text-secondary',
    title: 'group-hover:text-secondary',
    link: 'text-secondary',
  },
  {
    icon: 'smart_toy',
    card: 'dark:hover:border-primary/30 dark:hover:shadow-glow-primary',
    iconBox: 'group-hover:border-primary/50',
    iconText: 'group-hover:text-primary',
    title: 'group-hover:text-primary',
    link: 'text-primary',
  },
];
