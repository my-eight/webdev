export type Direction = 'web' | 'stock' | 'design'
export interface ServiceItem {
  title: string
  text: string
  tags?: string[]
}
export interface FaqItem {
  question: string
  answer: string
}
export interface SectionDetails {
  id: string
  title: string
  compactTitle: string
  outro?: string
  link?: { label: string; to: string }
}
export interface ItemSection extends SectionDetails {
  kind: 'rows' | 'split' | 'statement' | 'tags'
  gridLayout?: 'catalog'
  items: ServiceItem[]
}
export interface ProcessSection extends SectionDetails {
  kind: 'process'
  items: Pick<ServiceItem, 'title' | 'text'>[]
}
export interface PricingSection extends SectionDetails {
  kind: 'pricing'
  items: ServiceItem[]
}
export interface PortfolioSection extends SectionDetails {
  kind: 'projects'
  items: ServiceItem[]
}
export type ContentSection = ItemSection | ProcessSection | PricingSection | PortfolioSection
export interface ServicePageData {
  theme: Direction
  path: string
  title: string
  description: string
  person: 'slava' | 'erin'
  heading: string
  emphasis: string[]
  lead: string
  detail: string
  sections: ContentSection[]
  faqs: FaqItem[]
  contact: { title: string; text: string; prompts: string[] }
}
