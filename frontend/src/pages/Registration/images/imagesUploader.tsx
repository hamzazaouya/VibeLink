import ProfileImage from "./image";
import { UserFormProps } from "../types/registration.types";

function ImagesUploader(props: UserFormProps) {

  const handleUpdateImage = (index: number, file: File) => {
    const newImages = [...props.images];
    newImages[index] = file;
    props.updateFields({ images: newImages });
  };

  const handleUpdateProfileImage = (index: number, file: File) => {
    let newProfileImage = props.profileImage;
    newProfileImage = file;
    props.updateFields({ profileImage: newProfileImage });
  };
  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center h-auto max-h-fit">
      <ProfileImage 
        imageFile={props.profileImage} 
        index={0} 
        updateImage={handleUpdateProfileImage} 
        isProfileImage={true}
        />
      {props.images.map((imageFile, index) => (
      <ProfileImage
        imageFile={imageFile}
        index={index}
        updateImage={handleUpdateImage}
        isProfileImage={false}
      />
    ))}
    </div>

    
  );
}

export default ImagesUploader;
