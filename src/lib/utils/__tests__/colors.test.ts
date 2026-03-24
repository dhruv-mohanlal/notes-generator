import { NOTE_COLORS, getRandomColor, type NoteColor } from '../colors'

describe('NOTE_COLORS', () => {
  it('contains 8 colors', () => {
    expect(NOTE_COLORS).toHaveLength(8)
  })

  it('contains only valid hex color strings', () => {
    for (const color of NOTE_COLORS) {
      expect(color).toMatch(/^#[0-9A-F]{6}$/i)
    }
  })
})

describe('getRandomColor', () => {
  it('returns a color from NOTE_COLORS', () => {
    const color = getRandomColor()
    expect(NOTE_COLORS).toContain(color)
  })

  it('returns different colors over many calls', () => {
    const colors = new Set(Array.from({ length: 100 }, () => getRandomColor()))
    expect(colors.size).toBeGreaterThan(1)
  })
})
