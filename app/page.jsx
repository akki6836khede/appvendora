"use client"


import Image from "next/image";
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-black'>
      <div className="left md:flex hidden md:w-[30%] lg:w-[60%] h-screen bg-[url('/generated-image.png')] bg-cover bg-center"></div>
      <div className="right w-[100%] md:w-[70%] lg:w-[40%] h-screen flex flex-col gap-8 justify-between items-center">
        <div className="upper w-[100%] md:w-[97%] h-[20%] flex justify-center md:justify-start items-center">
          <Image src="/FullLogo_Transparent.png" width={200} height={200} alt="pharma logo" />
        </div>
        <div className="lower w-[77%] h-[50%] text-white flex flex-col justify-evenly items-start">
          <p className="font-bold text-xl italic text-gray-200">Welcome to Vendora</p>
          <p className="italic text-gray-400">Connecting Local Shops to Your Doorstep</p>
          <p className="italic text-gray-400">Vendora brings customers, local shopkeepers, and delivery partners together on one platform.</p>
          <p className="italic text-gray-400">Shop from nearby stores, help local businesses grow, and get orders delivered quickly and reliably.</p>
          <p className="italic text-gray-400">Whether you want to buy, sell, or deliver — Vendora makes it simple.</p>
          <p className="italic text-gray-200">Local markets. Digitized. Delivered.</p>
        </div>
        <div className="lower w-[77%] h-[20%] text-white flex flex-col justify-evenly items-start">
          <p className="text-gray-500 italic">Click on the button to get started</p>
          <button
            className="rounded-md w-30 h-10 bg-gradient-to-r from-violet-500 via-blue-500 to-red-500 flex justify-evenly items-center text-white font-bold hover:from-violet-700 hover:via-blue-700 hover:to-red-700 hover:scale-103 cursor-pointer" onClick={() => {
              router.push("/login")
            }}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
