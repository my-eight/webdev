import type { Direction } from './service'

export interface QuizOption {
  id: string
  label: string
  exclusive?: boolean
}
interface QuestionBase {
  id: string
  title: string
  stepLabel: string
}
export interface ChoiceQuestion extends QuestionBase {
  kind: 'single' | 'multiple'
  options: QuizOption[]
}
export interface ContactQuestion extends QuestionBase {
  kind: 'contact'
}
export type QuizQuestion = ChoiceQuestion | ContactQuestion
export interface QuizDefinition {
  code: string
  questions: [ChoiceQuestion, ChoiceQuestion, ChoiceQuestion, ChoiceQuestion, ChoiceQuestion, ChoiceQuestion, ContactQuestion]
}
export type QuizDefinitions = Record<Direction, QuizDefinition>
