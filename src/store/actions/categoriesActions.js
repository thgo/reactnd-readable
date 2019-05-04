export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const BY_CATEGORY = 'BY_CATEGORY'

export function receiveCategories (categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function receiveByCategory (category) {
  return {
    type: BY_CATEGORY,
    category
  }
}