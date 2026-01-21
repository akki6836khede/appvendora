"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

let interval;

export const CardStackImage = ({
    items,
    offset,
    scaleFactor,
}) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState(items);

    useEffect(() => {
        startFlipping();
        return () => clearInterval(interval);
    }, []);

    const startFlipping = () => {
        interval = setInterval(() => {
            setCards((prevCards) => {
                const newArray = [...prevCards];
                newArray.unshift(newArray.pop()); // cycle last to front
                return newArray;
            });
        }, 5000); // flip every 5 seconds — adjust as you like
    };

    return (
        <div className="relative h-60 w-100 mx-auto" style={{ perspective: 1000 }}>
            {cards.map((card, index) => (
                <motion.div
                    key={card.id}
                    className="absolute inset-0 rounded-3xl overflow-hidden w-100 h-60 shadow-2xl border border-gray-300 shadow-black/60"
                    style={{
                        transformOrigin: "top center",
                    }}
                    animate={{
                        top: index * -CARD_OFFSET,
                        scale: 1 - index * SCALE_FACTOR,
                        rotateX: index * 3, // subtle 3D feel — optional, remove if you want flat
                        zIndex: cards.length - index,
                    }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                >
                    <Image
                        src={card.image}
                        alt="Local shop aesthetic"
                        fill
                        className="object-cover z-50"
                        draggable={false}
                    />
                </motion.div>
            ))}
        </div>
    );
};