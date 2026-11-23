import type { Profile } from './types';

/**
 * Single source of truth for everything the site says about Vinay.
 * Edit this file to add roles, skills, certifications, projects or testimonials —
 * every site version picks the change up automatically. Empty lists hide or
 * replace their section with an empty state.
 */
export const profile: Profile = {
  name: 'Vinay Reddy',
  initials: 'VR',
  pitch: 'I build scalable, event-driven backend systems that stay fast and reliable in production.',
  shortBio: 'I build Java and Spring Boot microservices that move data through Kafka and run on Google Cloud.',
  summary:
    'Software engineer with hands-on experience building scalable microservices and backend systems, improving performance and reliability through robust architectural patterns and cloud-native technologies.',
  about:
    'I design and own production-grade microservices end to end — from API contracts and data models to secure service-to-service communication and zero-downtime delivery. Working on financial platforms taught me to care about data flow, integration patterns and reliability under load.',

  contact: {
    email: 'vinayreddi@gmail.com',
    github: 'https://github.com/reddy0852',
    linkedin: 'https://www.linkedin.com/in/vinay-reddy-9b97491a0',
  },

  featuredSkills: ['Java', 'Spring Boot', 'Kafka', 'GCP', 'Microservices'],

  // Newest first is conventional, but order doesn't matter — views sort by date.
  roles: [
    {
      id: 'empower-se',
      title: 'Software Engineer',
      shortLabel: 'Empower',
      company: 'Empower',
      companyUrl: 'https://www.empower.com/',
      start: { year: 2026, month: 11 },
      highlights: [],
      tech: [],
    },
    {
      id: 'wissen-se',
      title: 'Software Engineer',
      shortLabel: 'Engineer',
      company: 'Wissen Technology',
      start: { year: 2026 },
      end: { year: 2026, month: 11 },
      highlights: [],
      tech: [],
    },
    {
      id: 'wissen-ase',
      title: 'Associate Software Engineer',
      shortLabel: 'Associate',
      company: 'Wissen Technology',
      start: { year: 2025, month: 3 },
      end: { year: 2026 },
      tagline: 'Building production-grade microservices & scalable APIs',
      highlights: [
        'Built and owned production microservices in Java, Spring Boot, Kafka and SQL Server.',
        'Designed scalable APIs and data models, with OAuth2 securing service-to-service calls.',
        'Shipped zero-downtime releases through Jenkins CI/CD and automated tests.',
      ],
      tech: ['Java', 'Spring Boot', 'Kafka', 'OAuth2', 'Python', 'Autosys', 'Quartz Scheduler'],
    },
    {
      id: 'wissen-trainee',
      title: 'Trainee Analyst',
      shortLabel: 'Trainee',
      company: 'Wissen Technology',
      start: { year: 2024, month: 1 },
      end: { year: 2025, month: 3 },
      tagline: 'Learning enterprise systems & building microservices',
      highlights: [
        'Built small microservices and database schemas while learning enterprise systems.',
        'Learned how data flows and integrates across microservices in banking platforms.',
      ],
      tech: ['Java', 'Spring Boot', 'SQL Server', 'Docker', 'Kafka'],
    },
  ],

  education: [
    {
      id: 'btech',
      qualification: 'B.Tech in Computer Science',
      shortLabel: 'B.Tech, Computer Science',
      start: { year: 2019 },
      end: { year: 2023 },
    },
  ],

  focusAreas: [
    {
      id: 'microservices',
      title: 'Microservices',
      description: 'Spring Boot and Spring Cloud services with clean API boundaries and Resilience4j fault tolerance.',
    },
    {
      id: 'streaming',
      title: 'Event streaming',
      description: 'Apache Kafka pipelines for decoupled, asynchronous communication between services.',
    },
    {
      id: 'cloud',
      title: 'Cloud-native',
      description: 'Google Cloud certified, running containerised workloads with Docker on GCP.',
    },
    {
      id: 'delivery',
      title: 'Reliable delivery',
      description: 'Jenkins CI/CD, automated testing and SonarQube quality gates for zero-downtime releases.',
    },
  ],

  // From code (first) up to cloud (last).
  skills: [
    { id: 'languages', name: 'Languages', items: ['Java', 'Python', 'SQL'] },
    {
      id: 'frameworks',
      name: 'Frameworks',
      items: ['Spring Boot', 'Spring MVC', 'Spring Data JPA', 'RESTful APIs', 'Resilience4j'],
    },
    {
      id: 'data',
      name: 'Data & systems',
      items: ['MongoDB', 'PostgreSQL', 'Linux', 'SDLC', 'Data structures', 'Microservices', 'Spring Cloud'],
    },
    {
      id: 'workflow',
      name: 'Developer workflow',
      items: ['Git', 'Docker', 'Gradle', 'Apache Kafka', 'Jenkins', 'GitHub Copilot', 'Postman', 'SonarQube', 'Jira', 'gRPC', 'Redis'],
    },
    { id: 'cloud', name: 'Cloud platform', items: ['Google Cloud Platform'] },
  ],

  certifications: [
    {
      id: 'gcp-ace',
      name: 'Associate Cloud Engineer',
      issuer: 'Google Cloud',
      organisation: 'Google',
      tag: 'GCP',
      description: 'Deploying, monitoring and managing workloads on Google Cloud.',
      verifyUrl: 'https://www.credly.com/badges/a63ab532-10ac-437a-90f9-32a6ebb47eab/public_url',
      verifyLabel: 'Verify on Credly',
    },
    {
      id: 'google-genai-leader',
      name: 'Generative AI Leader',
      issuer: 'Google',
      organisation: 'Google',
      description: 'How generative AI is adopted, applied and governed in organisations.',
      verifyUrl: 'https://www.credly.com/badges/4a331037-0f51-4692-88c3-4d48c6ad109f/public_url',
      verifyLabel: 'Verify on Credly',
    },
  ],

  // Add case studies here; each version shows an empty state until there is at least one.
  projects: [],

  // Add quotes here; the section stays hidden while this is empty.
  testimonials: [],
};
