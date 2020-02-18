const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:0420/api'

export async function listLogEntries() {
  const resp = await fetch(`${API_URL}/logs`)
  return resp.json()
}

export async function createLogEntry(entry) {
  const resp = await fetch(`${API_URL}/logs`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(entry)
  })
  return resp.json()
}
