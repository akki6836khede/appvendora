import mongoose from "mongoose"

const DELIVERY_DB_URI = process.env.DELIVERY_DB_URI

if (!DELIVERY_DB_URI) {
  throw new Error("Please define the DELIVERY_DB_URI environment variable")
}

let cached = global.deliveryConn
if (!cached) {
  cached = global.deliveryConn = { conn: null, promise: null }
}

export async function connectToDeliveryDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const conn = mongoose.createConnection(DELIVERY_DB_URI, {
      bufferCommands: false,
    })

    cached.promise = conn.asPromise()
  }

  cached.conn = await cached.promise
  return cached.conn
}