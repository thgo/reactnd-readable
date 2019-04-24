export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const BY_CATEGORY = 'BY_CATEGORY'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'

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

// export function toggleActiveCategory (category) {
//   return {
//     type: TOGGLE_CATEGORY,
//     category,
//   }
// }