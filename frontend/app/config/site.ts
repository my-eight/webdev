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
