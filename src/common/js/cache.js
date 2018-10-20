import localStore from './localStore'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 10

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch (query) {
  let searches = localStore.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  localStore.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch (query) {
  let searches = localStore.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  localStore.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  localStore.remove(SEARCH_KEY)
  return []
}

export function loadSearch () {
  return localStore.get(SEARCH_KEY, [])
}
