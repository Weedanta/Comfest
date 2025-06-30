export interface NavItem {
  id: number;
  title: string;
  href: string;
}

export interface NavbarProps {
  items: NavItem[];
}