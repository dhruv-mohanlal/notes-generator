export interface Position {
  x: number
  y: number
}

export interface Dimensions {
  width: number
  height: number
}

export interface INote {
  id: string
  title: string
  color: string
  position: Position
  dimensions: Dimensions
  clusterId?: string
  ownerId: string
  collaborators: string[]
  shareToken?: string
  isPublic: boolean
  tabOrder: string[]
  createdAt: string
  updatedAt: string
}

export interface ITextContent {
  id: string
  noteId: string
  body: Record<string, unknown>
  createdAt: string
  updatedAt: string
}
