// src/lib/ai.ts
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string
const API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function generateTasks(prompt: string): Promise<string> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a task–breaking assistant.' },
        { role: 'user', content: prompt },
      ],
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`AI error (${res.status}): ${text}`)
  }
  const { choices } = await res.json()
  return choices[0].message.content as string
}
