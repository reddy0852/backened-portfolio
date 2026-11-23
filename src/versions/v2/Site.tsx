import type { SiteProps } from '../types';
import base from './base.module.css';
import { copy } from './copy';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Hero } from './sections/Hero';
import { Nav, type NavItem } from './sections/Nav';
import { Projects } from './sections/Projects';
import { Testimonials } from './sections/Testimonials';

export default function SiteV2({ profile }: SiteProps) {
  const hasCertifications = profile.certifications.length > 0;
  const hasTestimonials = profile.testimonials.length > 0;

  // Navigation is derived from what is actually rendered.
  const navItems: NavItem[] = [
    { href: '#experience', label: 'Experience' },
    { href: '#stack', label: 'Stack' },
    ...(hasCertifications ? [{ href: '#certifications', label: 'Certifications' }] : []),
    { href: '#projects', label: 'Projects' },
    ...(hasTestimonials ? [{ href: '#testimonials', label: 'Testimonials' }] : []),
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <div className={base.root}>
      <Nav name={profile.name} items={navItems} email={profile.contact.email} />
      <main id="main">
        <Hero profile={profile} />
        <Experience roles={profile.roles} education={profile.education} />
        {hasCertifications && <Certifications certifications={profile.certifications} />}
        <Projects projects={profile.projects} githubUrl={profile.contact.github} />
        {hasTestimonials && <Testimonials testimonials={profile.testimonials} />}
        <Contact contact={profile.contact} />
      </main>
      <footer className={base.footer}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{copy.footerNote}</p>
      </footer>
    </div>
  );
}
