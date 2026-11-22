// Search in the pictogram set by Dutch name and search words (T-2.3). Pure, so it is easy to test.
export type PictoWords = Record<string, { name: string; keywords: string[] }>

// Lower case and without accents, so "Geïrriteerd" is found with "geirriteerd"
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// Every typed word must be the start of a word in the name or the search words.
// An empty search gives all pictograms, in the given order.
export function searchPictos(ids: readonly string[], words: PictoWords, query: string): string[] {
  const typed = normalize(query).split(/\s+/).filter(Boolean)
  if (typed.length === 0) return [...ids]
  return ids.filter((id) => {
    const entry = words[id]
    if (!entry) return false
    const known = [entry.name, ...entry.keywords].flatMap((w) => normalize(w).split(/\s+/))
    return typed.every((q) => known.some((k) => k.startsWith(q)))
  })
}
