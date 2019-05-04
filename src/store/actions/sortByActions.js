export const SORT_BY = 'SORT_BY'

export function sortBy (sortBy) {
  return {
    type: SORT_BY,
    sortBy
  }
}