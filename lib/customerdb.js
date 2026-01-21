import mongoose from "mongoose"

const CUSTOMER_DB_URI = process.env.CUSTOMER_DB_URI

if (!CUSTOMER_DB_URI) {
  throw new Error("Please define the CUSTOMER_DB_URI environment variable")
}

let cached = global.customerConn
if (!cached) {
  cached = global.customerConn = { conn: null, promise: null }
}

export async function connectToCustomerDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const conn = mongoose.createConnection(CUSTOMER_DB_URI, {
      bufferCommands: false,
    })

    cached.promise = conn.asPromise()
  }

  cached.conn = await cached.promise
  return cached.conn
}