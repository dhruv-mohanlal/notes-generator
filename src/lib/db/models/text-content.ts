import mongoose, { Schema, type Document } from 'mongoose'

export interface TextContentDocument extends Document {
  noteId: mongoose.Types.ObjectId
  body: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

const textContentSchema = new Schema<TextContentDocument>(
  {
    noteId: {
      type: Schema.Types.ObjectId,
      ref: 'Note',
      required: true
    },
    body: { type: Schema.Types.Mixed, default: {} }
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

textContentSchema.index({ noteId: 1, createdAt: -1 })

export const TextContent =
  mongoose.models.TextContent || mongoose.model<TextContentDocument>('TextContent', textContentSchema)
