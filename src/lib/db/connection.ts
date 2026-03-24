import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined')
}

const globalWithMongoose = globalThis as typeof globalThis & {
  _mongooseConnection?: Promise<typeof mongoose>
}

export function connectDB(): Promise<typeof mongoose> {
  if (globalWithMongoose._mongooseConnection) {
    return globalWithMongoose._mongooseConnection
  }

  globalWithMongoose._mongooseConnection = mongoose.connect(MONGODB_URI)
  return globalWithMongoose._mongooseConnection
}
