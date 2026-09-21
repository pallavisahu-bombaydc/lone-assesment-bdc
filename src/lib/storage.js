export const PROGRESS_KEY = 'loanready_progress'

export function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveProgress(data) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data))
  } catch {
    // Ignore private-mode write errors.
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(PROGRESS_KEY)
  } catch {
    // Ignore.
  }
}
