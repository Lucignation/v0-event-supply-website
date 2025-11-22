'use client'

import { BlocksIcon, CupSoda, GlassWaterIcon } from "lucide-react"
import { MdNoDrinks } from "react-icons/md"
import { GiStoneBlock } from "react-icons/gi"
import { CiGlass } from "react-icons/ci"
import Image from "next/image"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function EverythingCaterer() {
    const router = useRouter()
    return (
       <section className="py-16  bg-background">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-start">
                <div className="w-[100%] md:w-[50%] py-[50px]">
                    <p className="mb-[30px]">You've got options</p>
                    <h1 className="md:text-[60px] text-[40px] w-full md:w-[90%] leading-[1.1] mb-[20px] font-bold">Everything a caterer could want</h1>
                    <p className="text-foreground/70 w-full md:w-[90%] mb-[20px]">From premium table water to soft drinks, ice blocks to disposable wares. We stock what matters. One order covers all your event needs.</p>
                    <div className="mb-[40px]">
                        <div className="flex items-center gap-2 mb-[12px]">
                        <CiGlass color="#000" />
                            <p>Table water in multiple brands</p>
                        </div>
                        <div className="flex items-center gap-2 mb-[12px]">
                        <MdNoDrinks />
                            <p>Soft drinks and juice packs</p>
                        </div>
                        <div className="flex items-center gap-2">
                        <GiStoneBlock />
                            <p>Ice blocks and event consumables</p>
                        </div>
                    </div>
                    <Button onClick={() =>  router.push('/signup')}>Start booking</Button>
                </div>
                <div className="w-[100%] md:w-[50%]">
                 <Image src="/caterer.png" width={1800} height={1800} className="object-cover rounded-lg" alt="Everything Caterer" />
                </div>
            </div>
        </section>
    )
}