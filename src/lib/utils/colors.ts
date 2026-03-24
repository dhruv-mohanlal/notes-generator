export const NOTE_COLORS = [
  '#FEF08A', // yellow
  '#FDA4AF', // pink
  '#93C5FD', // blue
  '#86EFAC', // green
  '#FDBA74', // orange
  '#C4B5FD', // purple
  '#FFFFFF', // white
  '#FED7AA' // peach
] as const

export type NoteColor = (typeof NOTE_COLORS)[number]

export function getRandomColor(): NoteColor {
  return NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)]
}
