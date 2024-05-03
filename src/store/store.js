export let thisState = {}

const key = "_token"

export const saveState = (state) => {
  sessionStorage.setItem(key, JSON.stringify(state));
}

export const loadState = () => {
  return JSON.parse(sessionStorage.getItem(key));
}
