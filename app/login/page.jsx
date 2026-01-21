"use client" 

import { useSession, signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'
import checkUserExistence from "@/actions/checkUserExistence" 

const page = () => {
    const { data: session, status } = useSession()
    if (!session) return;
    const router = useRouter()

    const checkUser = async () => {
        const email = session.user.email;
        const user = await checkUserExistence(email);

        if (!user) {
            router.replace("/rolepage");
            return;
        }

        if (user.role === "customer") {
            router.replace(`/userpage/${email}`);
        } else if (user.role === "deliverypartner") {
            router.replace(`/delivery/${email}`);
        } else if (user.role === "shopkeeper") {
            router.replace(`/shopkeeper/${email}`);
        }
    };

    checkUser();
}, [session, status, router]);
    return (
        <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-black'>
            <div className="left md:flex hidden md:w-[30%] lg:w-[60%] h-screen bg-[url('/generated-image.png')] bg-cover bg-center"></div>
            <div className="right w-[100%] md:w-[70%] lg:w-[40%] h-screen flex flex-col gap-8 justify-start items-center">
                <div className="upper w-[100%] md:w-[97%] h-[20%] flex justify-center md:justify-start items-center">
                    <Image src="/FullLogo_Transparent.png" width={200} height={200} alt="pharma logo" />
                </div>
                <div className="lower w-[77%] h-[10%] text-white flex flex-col justify-start items-start">
                    <p className="font-bold text-xl italic text-gray-200">Welcome to Vendora</p>
                    <p className="italic text-gray-400">Your trusted platform to discover and shop from local businesses.</p>
                </div>
                <div className="lower w-[77%] h-[20%] text-white flex flex-col justify-evenly items-start">
                    <p className="text-gray-500 italic">Sign in securely with Google</p>
                    <button
                        className="rounded-md w-30 h-10 bg-white text-black flex justify-evenly items-center font-bold hover:bg-gray-400 cursor-pointer" onClick={() => {
                            signIn("google")
                        }}
                    >
                        <Image src="/og-google.png" width={30} height={30} alt="pharma logo" />
                        Sign in
                    </button>
                    <p className="text-blue-600 w-[80%] text-[15px]">
                        By signing in, you agree to our Terms & Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page

