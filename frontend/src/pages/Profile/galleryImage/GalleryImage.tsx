import { galleryImage } from "../types/profile.types"


const BACKEND_APP_URL = import.meta.env.VITE_BACKEND_APP_URL
 

function GalleryImage({picture_path, slot_number}: galleryImage) {
    return (
        <div
            key={slot_number}
            className="aspect-[3/4] rounded-xl overflow-hidden pb-6 hover:shadow-lg transition-shadow duration-300">
            <img
            src={`${BACKEND_APP_URL}/${picture_path}` || "/placeholder.svg"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
        </div>
    )
}

export default GalleryImage;