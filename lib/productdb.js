import mongoose from "mongoose"

const PRODUCT_DB_URI = process.env.PRODUCT_DB_URI

if (!PRODUCT_DB_URI) {
  throw new Error("Please define the PRODUCT_DB_URI environment variable")
}

let cached = global.productConn
if (!cached) {
  cached = global.productConn = { conn: null, promise: null }
}

export async function connectToProductDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const conn = mongoose.createConnection(PRODUCT_DB_URI, {
      bufferCommands: false,
    })

    cached.promise = conn.asPromise()
  }

  cached.conn = await cached.promise
  return cached.conn
}