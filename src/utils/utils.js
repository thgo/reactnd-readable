export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function getDate() {
  const d = new Date()
  const time = d.toLocaleTimeString('en-US')
  const teste = time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  console.log('TIME', teste)
  return teste
}