import mongoose from "mongoose"

const CART_DB_URI = process.env.CART_DB_URI

if (!CART_DB_URI) {
  throw new Error("Please define the CART_DB_URI environment variable")
}

let cached1 = global.cartConn
if (!cached1) {
  cached1 = global.cartConn = { conn: null, promise: null }
}

export async function connectToCartDB() {
  if (cached1.conn) return cached1.conn

  if (!cached1.promise) {
    const conn = mongoose.createConnection(CART_DB_URI, {
      bufferCommands: false,
    })

    cached1.promise = conn.asPromise()
  }

  cached1.conn = await cached1.promise
  return cached1.conn
}