export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'

export function toggleCategory (category) {
  return {
    type: TOGGLE_CATEGORY,
    category
  }
}