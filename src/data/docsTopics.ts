export interface DocsTopic {
  id: string;
  slug: string;
  titleKey: "overview" | "srs" | "progression" | "arcade" | "audio" | "api";
  category: "guide" | "developer";
  iconName: "book" | "sparkles" | "trophy" | "gamepad" | "volume" | "code";
  readTime: string;
  badgeKey: "hub" | "coreAlgorithm" | "gameplay" | "combat" | "audioEngine" | "restApi";
}

export const DOCS_TOPICS: DocsTopic[] = [
  {
    id: "overview",
    slug: "",
    titleKey: "overview",
    category: "guide",
    iconName: "book",
    readTime: "3 min",
    badgeKey: "hub",
  },
  {
    id: "srs-methodology",
    slug: "/srs-methodology",
    titleKey: "srs",
    category: "guide",
    iconName: "sparkles",
    readTime: "6 min",
    badgeKey: "coreAlgorithm",
  },
  {
    id: "progression",
    slug: "/progression",
    titleKey: "progression",
    category: "guide",
    iconName: "trophy",
    readTime: "4 min",
    badgeKey: "gameplay",
  },
  {
    id: "arcade-engine",
    slug: "/arcade-engine",
    titleKey: "arcade",
    category: "guide",
    iconName: "gamepad",
    readTime: "5 min",
    badgeKey: "combat",
  },
  {
    id: "audio-phonetics",
    slug: "/audio-phonetics",
    titleKey: "audio",
    category: "guide",
    iconName: "volume",
    readTime: "5 min",
    badgeKey: "audioEngine",
  },
  {
    id: "api",
    slug: "/api",
    titleKey: "api",
    category: "developer",
    iconName: "code",
    readTime: "4 min",
    badgeKey: "restApi",
  },
];
