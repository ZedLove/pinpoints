const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:0420/api'
    : process.env.REACT_APP_API_URL

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
  const json = await resp.json()
  if (resp.ok) {
    return json
  }

  const error = new Error(json.message)
  error.response = json
  throw error
}
