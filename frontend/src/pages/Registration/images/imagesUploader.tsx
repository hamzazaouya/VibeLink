import ProfileImage from "./image";
import { UserFormProps } from "../types/registration.types";

function ImagesUploader(props: UserFormProps) {

  const handleUpdateImage = (index: number, file: File) => {
    const newImages = [...props.images];
    newImages[index] = file;
    console.log("=====> what's going on here ", index, newImages)
    props.updateFields({ images: newImages });
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center h-auto max-h-fit">
      {props.images.map((imageFile, index) => (
      <ProfileImage
        imageFile={imageFile}
        index={index}
        updateImage={handleUpdateImage}
      />
    ))}
    </div>

    
  );
}

export default ImagesUploader;
