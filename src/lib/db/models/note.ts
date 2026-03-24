import mongoose, { Schema, type Document } from 'mongoose'

export interface NoteDocument extends Document {
  title: string
  color: string
  position: { x: number; y: number }
  dimensions: { width: number; height: number }
  clusterId?: string
  ownerId: string
  collaborators: string[]
  shareToken?: string
  isPublic: boolean
  tabOrder: string[]
  createdAt: Date
  updatedAt: Date
}

const noteSchema = new Schema<NoteDocument>(
  {
    title: { type: String, required: true, default: 'Untitled' },
    color: { type: String, default: '#FEF08A' },
    position: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 }
    },
    dimensions: {
      width: { type: Number, default: 240 },
      height: { type: Number, default: 200 }
    },
    clusterId: { type: String },
    ownerId: { type: String, default: 'anonymous' },
    collaborators: { type: [String], default: [] },
    shareToken: { type: String, unique: true, sparse: true },
    isPublic: { type: Boolean, default: false },
    tabOrder: { type: [String], default: ['text'] }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform(_doc: any, ret: any) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      }
    }
  }
)

export const Note = mongoose.models.Note || mongoose.model<NoteDocument>('Note', noteSchema)
