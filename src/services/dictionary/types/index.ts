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
  GENERAL = 'general',
  PRONOUNCE = 'pronouns',
  QUESTIONS = 'questions'
}

export const CategoryFriendlyNames: Record<CategoryNames, string> = {
  [CategoryNames.ANIMALS]: 'Animals',
  [CategoryNames.DAYS_OF_WEEK]: 'Days Of Week',
  [CategoryNames.FOOD]: 'Food',
  [CategoryNames.MONTH]: 'Months',
  [CategoryNames.GENERAL]: 'General',
  [CategoryNames.PRONOUNCE]: 'Pronouns',
  [CategoryNames.QUESTIONS]: 'Questions'
  /*
  * family
  * time
  * seasons?
  * */
}
