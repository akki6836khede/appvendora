import mongoose from "mongoose"

const ORDER_DB_URI = process.env.ORDER_DB_URI

if (!ORDER_DB_URI) {
    throw new Error("Please define the ORDER_DB_URI environment variable")
}

let cached_O = global.orderConn
if (!cached_O) {
    cached_O = global.orderConn = { conn: null, promise: null }
}

export async function connectToOrderDB() {
    if (cached_O.conn) return cached_O.conn

    if (!cached_O.promise) {
        const conn = mongoose.createConnection(ORDER_DB_URI, {
            bufferCommands: false,
        })

        cached_O.promise = conn.asPromise()
    }

    cached_O.conn = await cached_O.promise
    return cached_O.conn
}