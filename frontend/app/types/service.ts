export type Direction = 'web' | 'stock' | 'design'
export interface ServiceItem { title: string; text: string; tags?: string[] }
export interface FaqItem { question: string; answer: string }
export interface ContentSection {
  id: string
  label: string
  title: string
  intro?: string
  outro?: string
  kind: 'rows' | 'split' | 'process' | 'pricing' | 'projects' | 'statement' | 'tags'
  items: ServiceItem[]
  link?: { label: string; to: string }
}
export interface ServicePageData {
  theme: Direction
  path: string
  title: string
  description: string
  person: 'slava' | 'erin'
  eyebrow: string
  heading: string
  emphasis: string
  lead: string
  detail: string
  secondary: { label: string; to: string }
  note: string
  anchors: { label: string; id: string }[]
  sections: ContentSection[]
  faqs: FaqItem[]
  contact: { title: string; text: string; prompts: string[] }
}
