const en = {
  // Header
  live: "LIVE",

  // Toolbar
  searchPlaceholder: "Search categories… (e.g. coffee, honey)",
  sortPopular: "Most popular",
  sortName: "A → Z",
  sortSection: "By section",
  liveToggle: "Live",
  resultCount: (n: number) => `${n} categor${n === 1 ? "y" : "ies"} match`,

  // Banners
  bannerPreview: "👀 Live results preview — cast your vote to lock in your picks.",
  bannerSelect: "✅ Select the categories you shop for, then tap",
  bannerSelectBold: "Cast vote",
  bannerSelectEnd: "to reveal live percentages.",

  // Floating vote bar
  pickTitle: "Pick your favourite categories",
  pickDesc: "Tick the boxes above — choose as many as you like.",
  selectedTitle: (n: number) => `${n} categor${n === 1 ? "y" : "ies"} selected`,
  selectedDesc: "Cast your vote to reveal live percentages.",
  castVote: "Cast vote",
  submitting: "Submitting…",
  voteRecorded: "Vote recorded! 🎉",
  undoAvailable: (t: string) => `Undo available for ${t}`,
  resultsLive: "Results are updating live as more people vote.",
  undo: "Undo",
  viewResults: "View results",
  results: "Results",

  // Section card
  votes: "votes",
  options: "options",
  leading: "Leading:",
  showMore: (n: number) => `Show ${n} more`,
  showLess: "Show less",
  loadingMore: "Loading more products…",

  // Option row
  picked: "Picked",
  yourPick: "Your pick",
  custom: "Custom",
  edit: "Edit",
  delete: "Delete",
  deleteConfirm: "Are you sure you want to delete this product suggestion?",

  // Suggest Product & Modal
  suggestCategory: "Suggest a category",
  suggestProduct: "Suggest a product",
  suggestProductHeader: "Suggest product",
  suggestProductShort: "Suggest",
  addTo: (s: string) => `Add to ${s}`,
  addPlaceholder: "e.g. Retro Vinyl, Plant Milk…",
  add: "Add",
  alreadySuggested: "✨ You've already suggested a product in this section.",
  modalSuggestProductTitle: "Suggest a New Product",
  modalEditProductTitle: "Edit Suggested Product",
  modalSuggestProductDesc: "Add a product you'd love to see. It will be automatically translated into English and Russian.",
  modalDeleteProductTitle: "Delete Suggested Product",
  modalDeleteProductDesc: (name: string) => `Are you sure you want to delete "${name}"? This suggestion will be permanently removed from the poll.`,
  productTitleLabel: "Product Title",
  productTitlePlaceholder: "e.g. Russian Honey Cake, Organic Matcha…",
  productDescLabel: "Description (Optional)",
  productDescPlaceholder: "Short note about the taste, brand, or flavor…",
  productEmojiLabel: "Category Icon / Emoji",
  productImageLabel: "Product Image (Optional)",
  imageUrlTab: "Image URL",
  imageUploadTab: "Upload File",
  dropOrBrowse: "Click or drop product photo here",
  autoWebPNote: "Auto-compressed in browser (Fast & Crisp)",
  compressingImage: "Optimizing image…",
  imageReady: "Image preview ready",
  removeImage: "Remove",
  imageLoadError: "Could not load image preview",
  suggestProductSubmit: "Suggest Product",
  saveChanges: "Save Changes",
  cancel: "Cancel",

  // Hero stats
  heroHeadingYou: "Which shopping categories do you",
  heroHeadingPeople: "Which shopping categories do people",
  heroHeadingEnd: "love most?",
  voters: "Voters",
  totalVotes: "Total Votes",
  categories: "Categories",
  topPick: "Top pick:",

  // Toasts
  toastVoteTitle: "Vote recorded! 🎉",
  toastVoteDesc: (n: number) => `You supported ${n} categor${n === 1 ? "y" : "ies"}. Watch the bars fill up live.`,
  toastVoteError: "Couldn't submit your vote",
  toastUndoTitle: "Vote undone",
  toastUndoDesc: "You can now cast a new vote.",
  toastUndoError: "Couldn't undo",
  toastAddedTitle: (name: string) => `Added "${name}"! ✨`,
  toastExistsTitle: (name: string, section: string) => `"${name}" is already in ${section}`,
  toastAddedDescVoted: "others can vote on it too.",
  toastAddedDescNotVoted: "we've selected it for your vote.",
  toastAddedDescPre: (section: string, suffix: string) => `It's now live in ${section} — ${suffix}`,
  toastAddedDescExisting: "We selected the existing one for you instead.",
  toastAddError: "Couldn't add that option",
  toastUpdatedTitle: (name: string) => `Updated "${name}"!`,
  toastUpdatedDesc: "Your product changes have been saved.",
  toastDeletedTitle: "Product removed",
  toastDeletedDesc: "Your suggested product has been deleted.",

  // Error / empty states
  errorLoad: "We couldn't load the poll. Please try again.",
  retry: "Retry",
  noMatch: (q: string) => `No categories match "${q}". Try a different keyword.`,

  // Navigation
  sections: "Sections",

  // Voter Information Modal
  modalVoterTitle: "Complete Your Vote",
  modalVoterDesc: "Please enter your name and email to verify and submit your vote.",
  modalVoterNameLabel: "Full Name",
  modalVoterNamePlaceholder: "e.g. Alex Smith",
  modalVoterEmailLabel: "Email Address",
  modalVoterEmailPlaceholder: "e.g. alex@example.com",
  modalVoterSubmit: "Confirm",
  modalVoterCancel: "Cancel",
  modalVoterSelected: (n: number) => `${n} selected`,
  modalVoterNameError: "Please enter your full name (at least 2 characters).",
  modalVoterEmailError: "Please enter a valid email address.",
  modalVoterPrivacyNote: "🔒 Your email will only be used for poll verification.",
};

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => unknown
    ? (...args: A) => string
    : string;
};

export type Locale = DeepStringify<typeof en>;
export default en;
