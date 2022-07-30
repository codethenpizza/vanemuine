export enum DictionaryLoadingState {
  PENDING = 'pending',
  LOADING = 'loading',
  ERROR = 'error',
}

export enum CategoryNames {
  ANIMALS = 'animals',
  DAYS_OF_WEEK = 'daysOfWeek',
  FOOD = 'food',
  // TIME = 'time',
  MONTH = 'month',
  BASIC = 'basic',
  PRONOUNCE = 'pronouns',
  QUESTIONS = 'questions'
}

export const CategoryFriendlyNames: Record<CategoryNames, string> = {
  [CategoryNames.ANIMALS]: 'Animals',
  [CategoryNames.DAYS_OF_WEEK]: 'Days Of Week',
  [CategoryNames.FOOD]: 'Food',
  // TIME = 'time',
  [CategoryNames.MONTH]: 'Months',
  [CategoryNames.BASIC]: 'Basics',
  [CategoryNames.PRONOUNCE]: 'Pronouns',
  [CategoryNames.QUESTIONS]: 'Questions'
}
