import { getDecision } from './decision'

export const TRACK_INTERVAL_MS = 4500
export const TRACK_LAST_STEP = 3

export const TRACK_STEPS = [
  { id: 'submitted', titleKey: 'track.s1Title', bodyKey: 'track.s1Body' },
  { id: 'docs', titleKey: 'track.s2Title', bodyKey: 'track.s2Body' },
  { id: 'review', titleKey: 'track.s3Title', bodyKey: 'track.s3Body' },
  { id: 'decision', titleKey: 'track.s4Title', bodyKey: 'track.s4Body' },
]

export const EMPTY_APPLICATION = {
  submitted: false,
  submittedAt: null,
  stepIndex: 0,
  outcome: null,
  pendingOutcome: null,
}

export function getDemoOutcome({ vintage, estimate, revenue, emi }) {
  const decision = getDecision({ vintage, estimate, revenue, emi })
  if (decision.id === 'apply') return 'offer'
  if (decision.id === 'talk') return 'more_docs'
  return 'not_eligible'
}

export function getStepState(stepIndex, index) {
  if (index < stepIndex) return 'done'
  if (index === stepIndex) return 'current'
  return 'waiting'
}
