import type { Locale } from "./en";

const ru: Locale = {
  // Header
  live: "LIVE",

  // Toolbar
  searchPlaceholder: "Поиск категорий… (например, кофе, мёд)",
  sortPopular: "Популярные",
  sortName: "А → Я",
  sortSection: "По разделу",
  liveToggle: "Live",
  resultCount: (n: number) => `${n} категор${n === 1 ? "ия" : "ии"} найден${n === 1 ? "а" : "о"}`,

  // Banners
  bannerPreview: "👀 Предварительный просмотр — проголосуйте, чтобы зафиксировать выбор.",
  bannerSelect: "✅ Выберите категории, в которых вы делаете покупки, затем нажмите",
  bannerSelectBold: "Проголосовать",
  bannerSelectEnd: "чтобы увидеть результаты.",

  // Floating vote bar
  pickTitle: "Выберите любимые категории",
  pickDesc: "Отметьте нужные — можно выбрать сколько угодно.",
  selectedTitle: (n: number) => `Выбрано ${n} категор${n === 1 ? "ия" : "ии"}`,
  selectedDesc: "Проголосуйте, чтобы увидеть результаты.",
  castVote: "Проголосовать",
  submitting: "Отправка…",
  voteRecorded: "Голос записан! 🎉",
  undoAvailable: (t: string) => `Отмена доступна ещё ${t}`,
  resultsLive: "Результаты обновляются в реальном времени.",
  undo: "Отменить",
  viewResults: "Результаты",
  results: "Результаты",

  // Section card
  votes: "голосов",
  options: "вариантов",
  leading: "Лидирует:",
  showMore: (n: number) => `Показать ещё ${n}`,
  showLess: "Скрыть",

  // Option row
  picked: "Выбрано",
  yourPick: "Ваш выбор",
  custom: "Своё",

  // Add option
  suggestCategory: "Предложить категорию",
  addTo: (s: string) => `Добавить в ${s}`,
  addPlaceholder: "например, Ретро-винил, Растительное молоко…",
  add: "Добавить",
  alreadySuggested: "✨ Вы уже предложили категорию.",

  // Hero stats
  heroHeadingYou: "Какие категории товаров вы",
  heroHeadingPeople: "Какие категории товаров люди",
  heroHeadingEnd: "любят больше всего?",
  voters: "Голосующих",
  totalVotes: "Всего голосов",
  categories: "Категорий",
  topPick: "Лидер:",

  // Toasts
  toastVoteTitle: "Голос записан! 🎉",
  toastVoteDesc: (n: number) => `Вы поддержали ${n} категор${n === 1 ? "ию" : "ии"}. Следите за результатами.`,
  toastVoteError: "Не удалось проголосовать",
  toastUndoTitle: "Голос отменён",
  toastUndoDesc: "Теперь вы можете проголосовать снова.",
  toastUndoError: "Не удалось отменить",
  toastAddedTitle: (name: string) => `Добавлено «${name}»! ✨`,
  toastExistsTitle: (name: string, section: string) => `«${name}» уже есть в разделе ${section}`,
  toastAddedDescVoted: "другие тоже могут за это проголосовать.",
  toastAddedDescNotVoted: "мы добавили это в ваш выбор.",
  toastAddedDescPre: (section: string, suffix: string) => `Теперь это в разделе ${section} — ${suffix}`,
  toastAddedDescExisting: "Мы выбрали существующий вариант для вас.",
  toastAddError: "Не удалось добавить вариант",

  // Error / empty states
  errorLoad: "Не удалось загрузить опрос. Попробуйте ещё раз.",
  retry: "Повторить",
  noMatch: (q: string) => `Категории по запросу «${q}» не найдены. Попробуйте другое слово.`,

  // Navigation
  sections: "Разделы",

  // Voter Information Modal
  modalVoterTitle: "Завершите голосование",
  modalVoterDesc: "Пожалуйста, введите ваше имя и email, чтобы подтвердить выбор и отправить голос.",
  modalVoterNameLabel: "Ваше имя",
  modalVoterNamePlaceholder: "например, Алексей Иванов",
  modalVoterEmailLabel: "Электронная почта",
  modalVoterEmailPlaceholder: "например, alex@example.com",
  modalVoterSubmit: "Подтвердить",
  modalVoterCancel: "Отмена",
  modalVoterSelected: (n: number) => `Выбрано: ${n}`,
  modalVoterNameError: "Пожалуйста, введите имя (не менее 2 символов).",
  modalVoterEmailError: "Пожалуйста, введите корректный адрес email.",
  modalVoterPrivacyNote: "🔒 Ваш email используется исключительно для защиты от накрутки голосов.",
};

export default ru;
