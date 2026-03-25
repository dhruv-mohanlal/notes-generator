import { NOTE_COLOURS, getRandomColour } from './colours'

describe('NOTE_COLOURS', () => {
  it('contains 8 colours', () => {
    expect(NOTE_COLOURS).toHaveLength(8)
  })

  it('contains only valid hex colour strings', () => {
    for (const colour of NOTE_COLOURS) {
      expect(colour).toMatch(/^#[0-9A-F]{6}$/i)
    }
  })
})

describe('getRandomColour', () => {
  it('returns a colour from NOTE_COLOURS', () => {
    const colour = getRandomColour()
    expect(NOTE_COLOURS).toContain(colour)
  })

  it('returns different colours over many calls', () => {
    const colours = new Set(Array.from({ length: 100 }, () => getRandomColour()))
    expect(colours.size).toBeGreaterThan(1)
  })
})
