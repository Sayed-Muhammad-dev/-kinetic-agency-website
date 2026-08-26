export interface Service {
  number: string;
  title: string;
  blurb: string;
  deliverables: string[];
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  title: string;
  blurb: string;
  year: string;
  services: string[];
  image: string;
  metric: { value: string; label: string };
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const studio = {
  name: "Kinetic",
  tagline: "We build brands that refuse to blend in.",
  intro:
    "A twelve-person brand and product studio in Lisbon and Brooklyn. We take companies with something to prove and give them an identity, a product and a story that hold up under scrutiny.",
  email: "hello@kinetic.studio",
  locations: ["Lisbon · Rua da Boavista 84", "Brooklyn · 61 Greenpoint Ave"]
};

export const stats = [
  { value: "12", label: "People, no account managers" },
  { value: "84", label: "Projects shipped" },
  { value: "6wk", label: "Median engagement" },
  { value: "9", label: "Awards, if you care" }
];

export const services: Service[] = [
  {
    number: "01",
    title: "Brand identity",
    blurb:
      "Naming, positioning, wordmark, type system and the rules that keep it intact after we leave. We hand over a system, not a logo file.",
    deliverables: ["Naming & positioning", "Identity system", "Type & colour", "Brand guidelines"]
  },
  {
    number: "02",
    title: "Digital product",
    blurb:
      "Interface design and front-end build for products people use daily. We design in the browser, so what you approve is what ships.",
    deliverables: ["Product strategy", "UI systems", "Prototyping", "Front-end build"]
  },
  {
    number: "03",
    title: "Websites",
    blurb:
      "Marketing sites that load fast, read well and convert. Built on a CMS your team can actually use without calling us.",
    deliverables: ["Art direction", "Copywriting", "Development", "CMS & handover"]
  },
  {
    number: "04",
    title: "Motion & film",
    blurb:
      "Product films, launch trailers and the motion language that ties an identity together across every surface it appears on.",
    deliverables: ["Motion identity", "Product film", "Launch assets", "Sound design"]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: "helio",
    client: "Helio Grid",
    sector: "Energy",
    title: "An identity for the grid that runs on sunlight",
    blurb:
      "Helio needed to look like infrastructure, not a startup. We built a system around measured type, engineering diagrams and a single high-voltage yellow.",
    year: "2026",
    services: ["Brand identity", "Website", "Motion"],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1400&q=80",
    metric: { value: "3.1×", label: "inbound enterprise leads" }
  },
  {
    id: "verso",
    client: "Verso",
    sector: "Fintech",
    title: "Rebuilding a banking product people did not dread",
    blurb:
      "Nine months redesigning a business banking product end to end, from account opening to reconciliation, then building the front end with their team.",
    year: "2026",
    services: ["Digital product", "Front-end build"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    metric: { value: "-62%", label: "support tickets at onboarding" }
  },
  {
    id: "atlas-press",
    client: "Atlas Press",
    sector: "Publishing",
    title: "A hundred-year-old publisher, argued into the present",
    blurb:
      "We kept the century-old colophon and threw out everything else. New type system, new site, and a cover-design language that scales across forty titles a year.",
    year: "2025",
    services: ["Brand identity", "Website"],
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
    metric: { value: "+41%", label: "direct book sales" }
  },
  {
    id: "northmark",
    client: "Northmark",
    sector: "Architecture",
    title: "Portfolio as argument, not gallery",
    blurb:
      "An architecture practice with extraordinary work and a site that buried it. We rebuilt around the projects, with typography doing the heavy lifting.",
    year: "2025",
    services: ["Website", "Art direction"],
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    metric: { value: "4.8min", label: "median time on site" }
  },
  {
    id: "cadence",
    client: "Cadence Labs",
    sector: "Biotech",
    title: "Making clinical rigour look like clinical rigour",
    blurb:
      "A research platform whose credibility depended on its interface. We designed the data views, the reporting system and the language around both.",
    year: "2025",
    services: ["Digital product", "Brand identity"],
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=80",
    metric: { value: "11", label: "research sites onboarded" }
  },
  {
    id: "fold",
    client: "Fold",
    sector: "Consumer",
    title: "A launch that sold out in nineteen hours",
    blurb:
      "Identity, packaging, film and the launch site for a furniture brand with one product and no budget for a second attempt.",
    year: "2024",
    services: ["Brand identity", "Motion", "Website"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
    metric: { value: "19hr", label: "to sell the first run" }
  }
];

export const team: TeamMember[] = [
  {
    name: "Nadia Cruz",
    role: "Founder, Creative Director",
    bio: "Fifteen years in brand, six of them at Pentagram. Starts every project by arguing with the brief.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Ravi Menon",
    role: "Design Director",
    bio: "Type obsessive. Draws the wordmark before anyone has agreed on the name, then usually turns out to be right.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Elin Sandberg",
    role: "Head of Product",
    bio: "Came from engineering, which is why our product work ships instead of sitting in Figma.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Marcus Adeyemi",
    role: "Technical Director",
    bio: "Builds what we design and tells us early when we have designed something that cannot be built well.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sofia Bianchi",
    role: "Motion Lead",
    bio: "Makes the identity move. Previously at Buck, previously before that an animator nobody had heard of.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tomás Ferreira",
    role: "Strategy Lead",
    bio: "Writes the positioning. Responsible for most of the sentences clients end up repeating in board meetings.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
  }
];

export const clients = [
  "HELIO GRID",
  "VERSO",
  "ATLAS PRESS",
  "NORTHMARK",
  "CADENCE",
  "FOLD",
  "MERIDIAN",
  "ORBITAL",
  "SUNDERLAND",
  "FIELDNOTE"
];

export const process = [
  {
    phase: "Week 1",
    title: "Argue about the brief",
    body: "Most briefs describe the symptom. We spend the first week finding what is actually wrong, which occasionally means telling you the project you asked for is the wrong project."
  },
  {
    phase: "Week 2–3",
    title: "Make three real options",
    body: "Not mood boards. Three genuinely different, fully-argued directions, each far enough along that you can judge it rather than imagine it."
  },
  {
    phase: "Week 4–5",
    title: "Build the system",
    body: "The chosen direction becomes a system: type, colour, layout, motion, the lot, with the rules written down so it survives contact with your team."
  },
  {
    phase: "Week 6",
    title: "Hand over properly",
    body: "Files, guidelines, a working build and a session with whoever inherits it. We are reachable afterwards; we would rather you not need us."
  }
];
