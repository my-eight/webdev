export const site = {
  name: 'Разработка, МойСклад и графический дизайн',
  description:
    'Разработка сайтов и веб-приложений, внедрение МойСклад, автоматизация и графический дизайн. От задачи и согласованного плана до результата. Удалённо по России.',
  navigation: [
    {
      path: '/web-development',
      label: 'Разработка',
      short: 'Разработка',
      theme: 'web',
      sections: [
        {
          label: 'Процесс',
          id: 'process',
        },
        {
          label: 'Услуги и интеграции',
          id: 'services',
        },
        {
          label: 'Формат и оценка',
          id: 'pricing',
        },
        {
          label: 'Вопросы',
          id: 'faq',
        },
        { label: 'Мини-квиз', id: 'quiz' },
      ],
    },
    {
      path: '/moysklad',
      label: 'МойСклад',
      short: 'МойСклад',
      theme: 'stock',
      sections: [
        {
          label: 'Процесс',
          id: 'process',
        },
        {
          label: 'Услуги',
          id: 'services',
        },
        {
          label: 'Автоматизация',
          id: 'automation',
        },
        {
          label: 'Ваша ситуация',
          id: 'situation',
        },
        {
          label: 'Стоимость',
          id: 'pricing',
        },
        {
          label: 'Вопросы',
          id: 'faq',
        },
        { label: 'Мини-квиз', id: 'quiz' },
      ],
    },
    {
      path: '/design',
      label: 'Дизайн',
      short: 'Дизайн',
      theme: 'design',
      sections: [
        {
          label: 'Процесс',
          id: 'process',
        },
        {
          label: 'Стоимость',
          id: 'pricing',
        },
        {
          label: 'Услуги',
          id: 'services',
        },
        {
          label: 'Работы',
          id: 'projects',
        },
        {
          label: 'Обо мне',
          id: 'about',
        },
        {
          label: 'Вопросы',
          id: 'faq',
        },
        { label: 'Мини-квиз', id: 'quiz' },
      ],
    },
  ],
} as const
