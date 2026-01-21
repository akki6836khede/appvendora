"use client"

import React from 'react'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { useEffect } from 'react'
import Form from 'next/form'
import saveShopkeeper from '@/actions/saveshopkeeper'
import { useSession } from "next-auth/react"

const page = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);

  const router = useRouter()
  const { data: session } = useSession();

  if (!session) {
    return <div className="text-white">Loading...</div>;
  }

  const { email, name, image } = session.user;

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setSuggestions(data.slice(0, 5));
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    };

    fetchSuggestions();
    return () => controller.abort();
  }, [query]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const addressObj = {
  //     address: selected?.display_name || query,
  //     lat: selected?.lat || "not selected",
  //     lon: selected?.lon || "not selected",
  //   };

  //   console.log("Address object:", addressObj);
  // };

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center bg-black'>
      <div className="left w-[60%] h-screen bg-[url('/generated-image.png')] bg-cover bg-center"></div>
      <div className="right w-[40%] h-screen flex flex-col gap-8 justify-start items-center">
        <div className="upper w-[97%] h-[20%] flex justify-start items-center">
          <Image src="/FullLogo_Transparent.png" width={200} height={200} alt="pharma logo" />
        </div>
        <div className="lower w-[77%] h-[75%] text-white flex flex-col justify-evenly items-start">
          <div className='w-[100%] h-[10%] flex justify-start items-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                bg-clip-text text-transparent italic text-xl font-bold'>Fill Shopkeeper details below</div>
          <Form action={async (formData) => {
            await saveShopkeeper(formData);
            router.push(`/shopkeeper/${email}`);
          }} className='w-[100%] h-[89%] flex flex-col justify-evenly items-center'>
            <input
              type="text"
              name="shopName"
              placeholder="Shop Name"
              className="w-full bg-gradient-to-r border-b border-gray-300 px-4 py-2 focus:outline-none text-gray-200"
            />

            <input
              type="text"
              placeholder="Owner Full Name"
              name="ownerName"
              className="w-full border-b border-gray-300 px-4 py-2 focus:outline-none text-gray-200"
            />

            <select
              name="shopCategory"
              className="w-full border-b border-gray-300 px-4 py-2 focus:outline-none"
            >
              <option className='text-black' value="">Select Category</option>
              <option className='text-black' value="grocery">Grocery</option>
              <option className='text-black' value="stationery">Stationery</option>
              <option className='text-black' value="electronics">Electronics</option>
              <option className='text-black' value="clothing">Clothing</option>
            </select>

            <input
              type="number"
              name="ownerContact"
              placeholder="Contact number"
              className="w-full border-b border-gray-300 px-4 py-2 focus:outline-none text-gray-200"
            />

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Shop address (via Google Maps)"
                name="shopAddress"
                id="address"
                className="w-full border-b border-gray-300 px-4 py-2 focus:outline-none"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(null);
                }}
              />
              <input type="hidden" name="shopLatitude" value={selected?.lat || ""} />
              <input type="hidden" name="shopLongitude" value={selected?.lon || ""} />
              {suggestions.length > 0 && (
                <ul className="absolute bg-white text-black border border-gray-300 rounded-md shadow-lg w-full max-h-48 overflow-y-auto z-10">
                  {suggestions.map((place) => (
                    <li
                      key={place.place_id}
                      onClick={() => {
                        setQuery(place.display_name);
                        setSelected(place);
                        setSuggestions([]);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <label className="text-gray-400 text-sm w-full px-4 py-2">Upload your Shop image below</label>
            <input
              type="file"
              accept="image/*"
              name="shopImage"
              className="w-full px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />

            <div className="flex items-center space-x-2">
              <label className="text-gray-600 text-sm">Open:</label>
              <input
                type="time"
                name="openingTime"
                className="bg-gradient-to-r from-zinc-400/70 to-zinc-400/50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-gray-600 text-sm">Close:</label>
              <input
                type="time"
                name="closingTime"
                className="bg-gradient-to-r from-zinc-400/70 to-zinc-400/50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type='submit' className='w-20 h-8 font-bold rounded-md bg-gradient-to-r from-blue-700 to-blue-500'>Submit</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default page
