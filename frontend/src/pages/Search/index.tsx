import { Slider } from "@/components/ui/slider";
import { useState } from "react";
interface Tag {
  id: string;
  name: string;
  color: string;
}

export default function SearchPage() {
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [distance, setDistance] = useState([10]);

  const handleSubmit = () => {
    const searchData = {
      age: { min: ageRange[0], max: ageRange[1] },
      distance: distance[0],
    };
    console.log("Search data:", searchData);
    // Handle search submission here
  };

  return (
    <div className="min-h-screen w-screen pt-22 bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end flex items-center justify-center">
      <div className="max-w-6xl mx-auto bg-background/80 backdrop-blur-lg rounded-3xl p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 shadow-2xl">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="space-y-4">
            <label className="text-lg font-semibold text-card-foreground mb-3 block">
              Age Range: {ageRange[0]} - {ageRange[1]}
            </label>
            <Slider
              value={ageRange}
              onValueChange={setAgeRange}
              max={60}
              min={18}
              step={1}
              className="w-full bg-gray-200 rounded-full"
            />
          </div>

          <div className="space-y-4">
            {/* <div> */}
            <label className="text-lg font-semibold text-card-foreground mb-3 block">
              Distance: {distance[0]} km
            </label>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={100}
              min={1}
              step={1}
              className="w-full bg-gray-200 rounded-full"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold drop-shadow-lg">
              Interests :
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold drop-shadow-lg">
            Location :
          </h3>
          <div className="h-96 rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52901.38654799949!2d-80.87259484863281!3d35.22709820000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88541fc4fc381a81%3A0x884650e6bf43d164!2sCharlotte%2C%20NC!5e0!3m2!1sen!2sus!4v1694789234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-10 right-10 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-200 hover:shadow-pink-500/25"
        onClick={handleSubmit}
      >
        Start Discovering
      </button>
    </div>
  );
}
