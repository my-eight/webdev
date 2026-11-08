export const site = {
  name: 'Веб-разработка, МойСклад и графический дизайн',
  description:
    'Разработка сайтов и веб-приложений, внедрение МойСклад, автоматизация и графический дизайн. От задачи и согласованного плана до результата. Удалённо по России.',
  navigation: [
    {
      path: '/web-development',
      label: 'Веб-разработка',
      short: 'Разработка',
      theme: 'web',
      sections: [
        { label: 'Мини-квиз', id: 'quiz' },
        {
          label: 'Услуги и интеграции',
          id: 'services',
        },
        {
          label: 'Процесс',
          id: 'process',
        },
        {
          label: 'Стоимость',
          id: 'pricing',
        },
        {
          label: 'Вопросы',
          id: 'faq',
        },
      ],
    },
    {
      path: '/moysklad',
      label: 'МойСклад',
      short: 'МойСклад',
      theme: 'stock',
      sections: [
        { label: 'Мини-квиз', id: 'quiz' },
        {
          label: 'Ваша ситуация',
          id: 'situation',
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
          label: 'Процесс',
          id: 'process',
        },
        {
          label: 'Стоимость',
          id: 'pricing',
        },
        {
          label: 'Вопросы',
          id: 'faq',
        },
      ],
    },
    {
      path: '/design',
      label: 'Дизайн',
      short: 'Дизайн',
      theme: 'design',
      sections: [
        { label: 'Мини-квиз', id: 'quiz' },
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
      ],
    },
  ],
} as const
