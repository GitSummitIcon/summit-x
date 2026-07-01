export const siteConfig = {
  name: "Summit X",
  title: "Summit X — Alpine Elegance and Adventure",
  description:
    "Curated alpine chalets, heli-ski programmes, expeditions and lodges. Handpicked for those who seek the extraordinary.",
  tagline: "Alpine elegance and adventure. Untamed. Impeccable.",
  locale: "en_GB",
  defaultImage: "/og.png",
  email: "summitx@iconprivatecollection.com",
  nav: [
    { label: "Destinations", href: "/destinations" },
    { label: "Chalets", href: "/chalets" },
    { label: "Expeditions", href: "/expeditions" },
    { label: "Heli-Ski", href: "/heli-ski" },
    { label: "Lodges", href: "/lodges" },
    { label: "The Edit", href: "/the-edit" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "The Edit", href: "/the-edit" },
  ],
  effects: {
    reveal: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;
