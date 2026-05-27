/**
 * Top-nav structure. The Enquo logo links to "/" so the home page is
 * implicit — these are the 6 secondary routes shown as nav items.
 */
export type NavItem = {
  path: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { path: "/services",     label: "Services" },
  { path: "/industries",   label: "Industries" },
  { path: "/case-studies", label: "Case Studies" },
  { path: "/insights",     label: "Insights" },
  { path: "/who-we-are",   label: "Who We Are" },
  { path: "/careers",      label: "Careers" },
];
