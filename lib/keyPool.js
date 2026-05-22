const DEFAULT_RESET_MS = 60 * 60 * 1000

const memoryState = new Map()

function now(){ return Date.now() }

function splitKeys(value){
  if(!value) return []
  return value.split(',').map(function(x){return x.trim()}).filter(Boolean)
}

export function getKeyPool(provider){
  const envName = provider.toUpperCase() + '_API_KEYS'
  const singleName = provider.toUpperCase() + '_API_KEY'
  const keys = splitKeys(process.env[envName] || process.env[singleName] || '')
  return keys.map(function(key, index){
    const id = provider + ':' + index
    const state = memoryState.get(id) || { used: 0, limitUntil: 0, lastError: '' }
    return { id, provider, key, index, used: state.used, limitUntil: state.limitUntil, lastError: state.lastError }
  })
}

export function getAvailableKey(provider){
  const pool = getKeyPool(provider)
  const ready = pool.filter(function(item){ return !item.limitUntil || item.limitUntil <= now() })
  if(!ready.length) return null
  ready.sort(function(a,b){ return a.used - b.used })
  return ready[0]
}

export function markKeyUsed(keyItem){
  if(!keyItem) return
  const old = memoryState.get(keyItem.id) || { used: 0, limitUntil: 0, lastError: '' }
  memoryState.set(keyItem.id, { used: old.used + 1, limitUntil: old.limitUntil, lastError: old.lastError })
}

export function markKeyLimited(keyItem, resetMs){
  if(!keyItem) return
  const old = memoryState.get(keyItem.id) || { used: 0, limitUntil: 0, lastError: '' }
  memoryState.set(keyItem.id, { used: old.used, limitUntil: now() + (resetMs || DEFAULT_RESET_MS), lastError: 'rate_limited' })
}

export function getPoolStatus(provider){
  const pool = getKeyPool(provider)
  const active = pool.filter(function(item){ return !item.limitUntil || item.limitUntil <= now() }).length
  const cooling = pool.length - active
  return { provider, total: pool.length, active, cooling, items: pool.map(function(item){ return { index: item.index, used: item.used, cooling: item.limitUntil > now(), resetAt: item.limitUntil || null } }) }
}

export function hasKeyStock(provider){
  return getAvailableKey(provider) !== null
}
