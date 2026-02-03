"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "./ui/button"
export default function ImageTabs() {

const [active, setactive] = useState("organize");
  return (
    <div>
 <section className="bg-background border-t py-16">
          <div className=" container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="flex justify-center gap-2 mb-9">
                <Button
                  className={`rounded-lg px-6 text-sm font-medium ${active === "organize" ? " text-muted-foreground hover:disabled:" : "hover:bg-muted-foreground"}  `}
                  onClick={() => setactive("organize")}
                >
                  Organize Applications{" "}
                </Button>
                <Button
                  className={`rounded-lg px-6 text-sm font-medium ${active === "GetHired" ? " text-muted-foreground" :" hover:bg-muted-foreground" }`}
                  onClick={() => setactive("GetHired")}
                >
                  Get Hired{" "}
                </Button>
                <Button
                  className={`rounded-lg px-6 text-sm font-medium ${active === "MangeBoards" ? " text-muted-foreground" : " hover:bg-muted-foreground"}`}
                  onClick={() => setactive("MangeBoards")}
                >
                  Manage Boards{" "}
                </Button>
              </div>
              <div className=" 
              relative mx-w-5xl mx-auto overflow-hidden rounded-lg
               border-gray-200 shadow-xl flex flex-col gap-10
               dark:shadow-2xl dark:shadow-black/60">
                {active === "organize" && (
                  <Image
                    className="border-b-8"
                    src="/hero-images/hero1.png"
                    alt="Organize Applications"
                    width={1200}
                    height={800}
                  />
                )}
                {active === "GetHired" && (
                  <Image
                    className="border-b-8"
                    src="/hero-images/hero2.png"
                    alt="Organize Applications"
                    width={1200}
                    height={800}
                  />
                )}
                {active === "MangeBoards" && (
                  <Image
                    src="/hero-images/hero3.png"
                    alt="Organize Applications"
                    width={1200}
                    height={800}
                  />
                )}
              </div>
            </div>
          </div>
        </section>      
        
    </div>
  )
}
