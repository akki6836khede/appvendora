"use client"

import { useSession, signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== "authenticated") return

    const { role, email } = session.user

    if (!role) {
      router.replace("/rolepage")
    } else if (role === "customer") {
      router.replace(`/userpage/${email}`)
    } else if (role === "deliverypartner") {
      router.replace(`/delivery/${email}`)
    } else if (role === "shopkeeper") {
      router.replace(`/shopkeeper/${email}`)
    }
  }, [status, session, router])

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div className="hidden md:flex md:w-[30%] lg:w-[60%] h-screen bg-[url('/generated-image.png')] bg-cover bg-center"></div>

      <div className="w-full md:w-[70%] lg:w-[40%] h-screen flex flex-col gap-8 justify-start items-center">
        <div className="w-full md:w-[97%] h-[20%] flex justify-center md:justify-start items-center">
          <Image src="/FullLogo_Transparent.png" width={200} height={200} alt="Vendora logo" />
        </div>

        <div className="w-[77%] text-white">
          <p className="font-bold text-xl italic text-gray-200">Welcome to Vendora</p>
          <p className="italic text-gray-400">
            Your trusted platform to discover and shop from local businesses.
          </p>
        </div>

        <div className="w-[77%] text-white flex flex-col gap-4">
          <p className="text-gray-500 italic">Sign in securely with Google</p>

          <button
            onClick={() => signIn("google")}
            className="rounded-md w-36 h-10 bg-white text-black flex justify-evenly items-center font-bold hover:bg-gray-300"
          >
            <Image src="/og-google.png" width={30} height={30} alt="Google" />
            Sign in
          </button>

          <p className="text-blue-600 text-sm">
            By signing in, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}


