"use server"

import { connectToDB } from "@/lib/mongodb";
import {User} from "@/models/User";

export async function saveUserToDB({ name, email, image, role }) {
  await connectToDB();

  const user = await User.findOneAndUpdate(
    { email },
    { name, email, image, role },
    { new: true, upsert: true }
  );

  return JSON.parse(JSON.stringify(user));
}