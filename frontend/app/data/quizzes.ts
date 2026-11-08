import type { ContactQuestion, QuizDefinitions, QuizOption } from '~/types/quiz'

const options = (...labels: string[]): QuizOption[] => labels.map((label, index) => ({ id: `option-${index}`, label }))
const undecided = { id: 'undecided', label: 'Помогите определиться', exclusive: true }
const nothing = { id: 'nothing', label: 'Начинаем с нуля', exclusive: true }
const contact: ContactQuestion = { id: 'contact', kind: 'contact', title: 'Куда ответить?', stepLabel: 'Контакт' }

export const quizzes: QuizDefinitions = {
  web: {
    code: 'ВЕБ',
    questions: [
      {
        id: 'format', kind: 'single', title: 'Что создаём?', stepLabel: 'Формат',
        options: options('Лендинг', 'Сайт компании', 'Интернет-магазин', 'Веб-сервис', 'Доработку сайта', 'Помогите выбрать'),
      },
      {
        id: 'goal', kind: 'multiple', title: 'Какая цель?', stepLabel: 'Задача',
        options: options('Получать заявки', 'Продавать онлайн', 'Представить компанию', 'Упростить работу команды', 'Связать сервисы', 'Запустить новый продукт'),
      },
      {
        id: 'materials', kind: 'multiple', title: 'Что уже есть?', stepLabel: 'Материалы',
        options: [...options('Идея и описание задачи', 'Готовый дизайн', 'Действующий сайт', 'Тексты и фотографии', 'Техническое задание'), nothing],
      },
      {
        id: 'features', kind: 'multiple', title: 'Что подключим?', stepLabel: 'Функции',
        options: [...options('Каталог и поиск', 'Оплату и заказы', 'Личный кабинет', 'Формы и уведомления', 'Обмен с другими системами', 'Панель управления', 'ИИ-инструменты'), undecided],
      },
      {
        id: 'timing', kind: 'single', title: 'Какие сроки?', stepLabel: 'Сроки',
        options: options('В ближайший месяц', 'Через 1–3 месяца', 'Срок гибкий', 'Сначала обсудим задачу'),
      },
      {
        id: 'budget', kind: 'single', title: 'Какой бюджет?', stepLabel: 'Бюджет',
        options: options('До 100 000 ₽', '100 000–300 000 ₽', 'От 300 000 ₽', 'Нужна предварительная оценка'),
      },
      contact,
    ],
  },
  stock: {
    code: 'СКЛ',
    questions: [
      {
        id: 'stage', kind: 'single', title: 'На каком этапе?', stepLabel: 'Ситуация',
        options: options('МойСклад ещё не внедрён', 'Система уже работает', 'Переезжаем из другой системы', 'Нужна точечная помощь'),
      },
      {
        id: 'business', kind: 'single', title: 'Какой бизнес?', stepLabel: 'Сфера',
        options: options('Розничный магазин', 'Интернет-торговля', 'Оптовые продажи', 'Производство', 'Несколько направлений', 'Другая сфера'),
      },
      {
        id: 'processes', kind: 'multiple', title: 'Что наладить?', stepLabel: 'Процессы',
        options: options('Товары и остатки', 'Заказы и продажи', 'Закупки', 'Производство', 'Отчёты', 'Работу сотрудников', 'Обмен данными', 'Повторяющиеся действия'),
      },
      {
        id: 'integrations', kind: 'multiple', title: 'Что связать?', stepLabel: 'Обмены',
        options: [...options('Сайт или интернет-магазин', 'Систему работы с клиентами', 'Маркетплейсы', '1С', 'Кассы', 'Другие сервисы'), undecided, { id: 'no-exchange', label: 'Обмен не нужен', exclusive: true }],
      },
      {
        id: 'team', kind: 'single', title: 'Размер команды?', stepLabel: 'Команда',
        options: options('1–3 пользователя', '4–10 пользователей', '11–30 пользователей', 'Больше 30 пользователей'),
      },
      {
        id: 'timing', kind: 'single', title: 'Когда стартуем?', stepLabel: 'Сроки',
        options: options('Как можно скорее', 'В ближайший месяц', 'Через 1–3 месяца', 'Пока планируем'),
      },
      contact,
    ],
  },
  design: {
    code: 'ДЗН',
    questions: [
      {
        id: 'format', kind: 'multiple', title: 'Что создаём?', stepLabel: 'Задача',
        options: [...options('Логотип и фирменный стиль', 'Упаковку', 'Дизайн сайта', 'Полиграфию', 'Мерч', 'Графику для соцсетей', 'Оформление события'), undecided],
      },
      {
        id: 'purpose', kind: 'single', title: 'Для чего дизайн?', stepLabel: 'Повод',
        options: options('Запуск нового бренда', 'Обновление оформления', 'Новый продукт или носитель', 'Событие или кампания'),
      },
      {
        id: 'materials', kind: 'multiple', title: 'Что уже готово?', stepLabel: 'Материалы',
        options: [...options('Логотип или брендбук', 'Тексты и фотографии', 'Требования к производству', 'Примеры и референсы', 'Макеты или черновики'), nothing],
      },
      {
        id: 'mood', kind: 'multiple', title: 'Какое настроение?', stepLabel: 'Характер',
        options: [...options('Сдержанное и минималистичное', 'Яркое и смелое', 'Технологичное', 'Тёплое и живое', 'Премиальное и лаконичное'), { ...undecided, label: 'Выберем вместе' }],
      },
      {
        id: 'timing', kind: 'single', title: 'Какие сроки?', stepLabel: 'Сроки',
        options: options('В ближайшие две недели', 'В течение месяца', 'Через 1–3 месяца', 'Срок гибкий'),
      },
      {
        id: 'budget', kind: 'single', title: 'Какой бюджет?', stepLabel: 'Бюджет',
        options: options('До 30 000 ₽', '30 000–80 000 ₽', 'От 80 000 ₽', 'Обсудим по объёму задачи'),
      },
      contact,
    ],
  },
}
