"use server"

import { connectToDB } from "@/lib/mongodb";
import {User} from "@/models/User";

export async function checkUserExistence(email) {
  await connectToDB();

  const user = await User.findOne(
    { email }
  );
  return JSON.parse(JSON.stringify(user));
}

export default checkUserExistence
