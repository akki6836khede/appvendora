"use client"

import React from 'react'
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,400,0,0&icon_names=add_circle" />


const AboutComponent = () => {
    return (
        <div className='w-[95%] lg:w-[100%] h-[90%] backdrop-blur-lg rounded-md bg-black/95 overflow-y-scroll scrollbar-hide flex flex-col justify-start items-center absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <div className="1 h-20 text-3xl w-[95%] flex flex-col justify-evenly items-center flex-shrink-0">
                <div className='w-[100%]'><span className='bg-gradient-to-r font-bold from-blue-300 via-violet-300 to-red-300 bg-clip-text text-transparent'>About Vendora</span></div>
            </div>
            <div className='overflow-y-scroll w-[100%] scrollbar-hide flex flex-col justify-start items-center'>
                <div className="1 text-3xl w-[95%] flex flex-col justify-evenly items-center flex-shrink-0">
                    <div className='text-2xl font-bold w-[100%] text-gray-200'>
                        Bringing Local Shops & Customers Together
                    </div>
                    <div className='text-[15px] text-gray-400 w-[100%]'>
                        We are building a platform that connects local shop owners, delivery partners, and customers into one simple, powerful ecosystem.

                        Our mission is to digitize local commerce — helping neighborhood shops grow online, customers get faster deliveries, and delivery partners earn better with transparent systems.
                    </div>
                </div>
                <div className="2 w-[95%] mt-8 flex flex-col justify-evenly items-center flex-shrink-0">
                    <div className="1 w-[100%] text-2xl text-gray-200 font-bold">What we do</div>
                    <div className="1 w-[100%] text-xl text-gray-200 font-bold mt-4">🏪 For Shop Owners</div>
                    <div className="1 w-[100%] text-[15px] text-gray-400">Local shopkeepers can easily manage their business online without technical complexity.</div>
                    <div className="1 w-[100%] text-[15px] text-gray-200 font-bold">Features</div>
                    <ul className='w-[100%] list-disc pl-8 text-[15px] text-gray-400 flex flex-col justify-evenly items-start'>
                        <li>Add and manage products</li>
                        <li>Track sales in real time</li>
                        <li>View and manage orders</li>
                        <li>See delivery status (Pending, Out for Delivery, Delivered, Cancelled)</li>
                        <li>Manage both Cash on Delivery (COD) and Online Payments</li>
                    </ul>
                    <div className="1 w-[100%] text-xl text-gray-200 font-bold mt-4">🚚 For Delivery Partners</div>
                    <div className="1 w-[100%] text-[15px] text-gray-400">Delivery partners get a clear and simple system to handle deliveries efficiently.</div>
                    <div className="1 w-[100%] text-[15px] text-gray-200 font-bold">Features</div>
                    <ul className='w-[100%] list-disc text-[15px] pl-8 text-gray-400 flex flex-col justify-evenly items-start'>
                        <li>View assigned orders</li>
                        <li>See order status and customer details</li>
                        <li>Accept both COD and Online Paid orders</li>
                        <li>Update delivery status in real time</li>
                        <li>Track total deliveries and settlements</li>
                    </ul>
                    <div className="1 w-[100%] text-xl text-gray-200 font-bold mt-4">🛒 For Customers</div>
                    <div className="1 w-[100%] text-[15px] text-gray-400">Customers get the convenience of ordering from nearby shops with live tracking.</div>
                    <div className="1 w-[100%] text-[15px] text-gray-200 font-bold">Features</div>
                    <ul className='w-[100%] list-disc text-[15px] pl-8 text-gray-400 flex flex-col justify-evenly items-start'>
                        <li>Discover nearby local shops</li>
                        <li>Browse products</li>
                        <li>Place orders easily</li>
                        <li>Pay using Razorpay or Cash on Delivery</li>
                        <li>Track order status live from shop to doorstep</li>
                    </ul>
                </div>
                <div className="3 w-[95%] flex flex-col mt-8 justify-evenly items-center flex-shrink-0">
                    <div className="1 w-[100%] text-2xl text-gray-200 font-bold">Technology Behind the Platform</div>
                    <div className="1 w-[100%] text-[15px] text-gray-400">We use a modern, scalable tech stack to ensure speed, security, and reliability:</div>
                    <ul className='w-[100%] list-disc pl-8 text-[15px] text-gray-400 flex flex-col justify-evenly items-start'>
                        <li><span className='font-bold mr-1 text-gray-300'>Frontend</span> Next.js (MERN Stack) + Tailwind CSS</li>
                        <li><span className='font-bold mr-1 text-gray-300'>Backend</span> Node.js with Server Actions</li>
                        <li><span className='font-bold mr-1 text-gray-300'>Database</span> MongoDB</li>
                        <li><span className='font-bold mr-1 text-gray-300'>Payments</span> Razorpay Integration</li>
                        <li><span className='font-bold mr-1 text-gray-300'>Authentication</span> NextAuth</li>
                    </ul>
                </div>
                <div className="4 w-[95%] flex flex-col mt-8 justify-evenly items-center flex-shrink-0">
                    <div className="1 w-[100%] text-2xl text-gray-200 font-bold">Why We Built This</div>
                    <div className="1 w-[100%] text-[15px] text-gray-400">Local shops are the backbone of every community, but many still struggle to compete with big e-commerce platforms.</div>
                    <div className="1 w-[100%] text-[15px] text-gray-200 font-bold">We built this platform to:</div>
                    <ul className='w-[100%] list-disc text-[15px] pl-8 text-gray-400 flex flex-col justify-evenly items-start'>
                        <li>Empower local businesses</li>
                        <li>Create earning opportunities for delivery partners</li>
                        <li>Give customers faster, neighborhood-level service</li>
                    </ul>
                    <div className="1 w-[100%] text-[15px] text-gray-300">Local commerce deserves modern technology — and that’s exactly what we provide.</div>
                </div>
                <div className="5 w-[95%] flex flex-col justify-evenly mt-8 items-center flex-shrink-0">
                    <div className="1 w-[100%] text-2xl text-gray-200 font-bold">Contact / Credits</div>
                    <ul className="w-[100%] list-disc pl-8 text-[15px] text-gray-400 flex flex-col justify-evenly items-start">
                        <li className='text-gray-400'>Name: <span className='font-bold text-gray-300'>Atharv Khede</span></li>
                        <li className='text-gray-400'>Linkedin: <a className='font-bold text-blue-500' href="http://www.linkedin.com/in/atharv-khede-9024ba376" target="_blank">www.linkedin.com/in/atharv-khede-9024ba376</a></li>
                        <li className='text-gray-400'>Github: <a className='font-bold text-blue-500' href="https://github.com/akki6836khede" target="_blank">https://github.com/akki6836khede</a></li>
                        <li className='text-gray-400'>Gmail: <a className='font-bold text-blue-500' href="mailto:atharvkhede2004@gmail.com" target="_blank">atharvkhede2004@gmail.com</a></li>
                    </ul>
                </div>
                <div className='w-[100%] h-20 flex-shrink-0 text-gray-400 flex justify-center items-center'>
                    &copy; 2026 Vendora. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default AboutComponent
