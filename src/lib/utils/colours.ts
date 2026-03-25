export const NOTE_COLOURS = [
  '#FEF08A', // yellow
  '#FDA4AF', // pink
  '#93C5FD', // blue
  '#86EFAC', // green
  '#FDBA74', // orange
  '#C4B5FD', // purple
  '#FFFFFF', // white
  '#FED7AA' // peach
] as const

export type NoteColour = (typeof NOTE_COLOURS)[number]

export function getRandomColour(): NoteColour {
  return NOTE_COLOURS[Math.floor(Math.random() * NOTE_COLOURS.length)]
}
