
import { useEffect, useState } from "react";

function SliderIndicators({ activeIndex }: { activeIndex: number }){
  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={index}
          className={`w-[2rem] h-1.5 rounded-full transition-all ${
            index === activeIndex
              ? 'bg-pink-500'
              : 'bg-white opacity-50'
          }`}
        />
      ))}
    </div>
  )
}

const slideImages = [ 
    "/assets/login/slide1.png", 
    "/assets/login/slide2.png", 
    "/assets/login/slide3.png"];
const slogans = [
    "Creating Memories",
    "Find Real Connections",
    "Share the Moment"
]
function Slider() {
    const [index, setIndex] = useState(0);
        useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % 3);
        }, 4000);

        return () => clearInterval(interval);
    }, []); 
    return (
        <>
            <div>
                <div className="relative w-[25rem] h-[35rem] rounded-2xl overflow-hidden shadow-lg">
                    {slideImages.map((src, i) => (
                        <img
                        key={i}
                        src={src}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                            i === index ? "opacity-100 z-10" : "opacity-0"
                        }`}
                        />
                    ))}
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-35 z-10"></div>
                    <div className="absolute top-0 left-0 right-0 h-[3rem] flex items-center  z-10">
                            <h1 className="text-[1.5rem] ml-5 font-[1000] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent-pink from-30% via-accent-red to-accent-salmon">VibeLink</h1>
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 text-white z-20 flex flex-col">
                        <div className="grow text-black flex items-end justify-center">
                            <div className="h-[4rem]">
                                <h3 className="font-bold text-[1.5rem] text-white">
                                    {slogans[index]}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 z-20 flex items-end justify-center p-4">
                        <SliderIndicators activeIndex={index} />
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default Slider