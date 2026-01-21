import mongoose from "mongoose"

const SHOPKEEPER_DB_URI = process.env.SHOPKEEPER_DB_URI

if (!SHOPKEEPER_DB_URI) {
  throw new Error("Please define the SHOPKEEPER_DB_URI environment variable")
}

let cached = global.medicineConn
if (!cached) {
  cached = global.medicineConn = { conn: null, promise: null }
}

export async function connectToShopkeeperDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const conn = mongoose.createConnection(SHOPKEEPER_DB_URI, {
      bufferCommands: false,
    })

    cached.promise = conn.asPromise()
  }

  cached.conn = await cached.promise
  return cached.conn
}