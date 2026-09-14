/**
 * Design-2 client configuration types.
 * Components receive ONLY these typed props — never import website.json
 * directly. Presentation stays reusable across prospects.
 */

export type SectionId =
  | 'hero'
  | 'trust'
  | 'expertise'
  | 'why'
  | 'approach'
  | 'experience'
  | 'industries'
  | 'testimonials'
  | 'faq'
  | 'contact';

export interface Business {
  name: string;
  principal: string;
  title: string;
  designation: string;
  currency: string;
  qualifications: string[];
  membershipNo: string;
  location: string;
  areasServed: string[];
  email: string;
  phone: string;
  phoneDisplay: string;
  contactHref: string;
}

export interface WebsiteConfig {
  design: 'design-2';
  templateVersion: string;
  theme: { accent: string; note: string };
  business: Business;
  sections: SectionId[];
  content: {
    hero: {
      kicker: string;
      headlineA: string;
      headlineB: string;
      sub: string;
      primaryCta: { label: string; href: string };
      secondaryCta: { label: string; href: string };
      locationLine: string;
      portrait: { src: string; alt: string };
      credentialFloat: { title: string; body: string };
      backdropWord: string;
    };
    trust: {
      statement: string;
      items: string[];
      previously: string[];
      qualified: string[];
      stats: { figure: string; target: number; suffix: string; label: string }[];
    };
    expertise: {
      kicker: string;
      heading: string;
      lede: string;
      services: { id: string; index: string; title: string; body: string; points: string[] }[];
    };
    why: {
      heading: string;
      statement: string;
      body: string;
      values: { title: string; body: string }[];
      signoff: string;
    };
    approach: {
      heading: string;
      lede: string;
      steps: { index: string; title: string; body: string }[];
    };
    experience: {
      kicker: string;
      heading: string;
      lede: string;
      roles: { period: string; role: string; body: string }[];
      proof: { figure: string; target: number; suffix: string; label: string }[];
    };
    industries: {
      heading: string;
      lede: string;
      groups: { title: string; body: string; icon: 'factory' | 'store' | 'briefcase' | 'rocket' }[];
    };
    testimonials: {
      heading: string;
      lede: string;
      featured: { quote: string; name: string; role: string };
      more: { quote: string; name: string; role: string }[];
      note: string;
    };
    faq: {
      heading: string;
      lede: string;
      items: { question: string; answer: string }[];
      sideTitle: string;
      sideBody: string;
    };
    contact: {
      kicker: string;
      label: string;
      heading: string;
      lede: string;
      closing: string;
      assurances: { title: string; body: string }[];
      channels: { label: string; value: string; href: string }[];
      hours: { label: string; value: string }[];
    };
    footer: {
      tagline: string;
      columns: { title: string; links: { label: string; href: string }[] }[];
      compliance: string;
    };
  };
  seo: { title: string; description: string };
  assets: { portrait: string };
}
