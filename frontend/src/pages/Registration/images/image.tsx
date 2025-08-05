import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

function ProfileImage({
  imageFile,
  index,
  updateImage,
}: {
  imageFile: File | null;
  index: number;
  updateImage: (index: number, file: File) => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // clean up memory
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateImage(index, file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="cursor-pointer rounded-2xl w-28 h-40 flex justify-center items-center bg-black bg-opacity-30 overflow-hidden">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            className="object-cover h-full w-full rounded"
          />
        ) : (
          <IoIosAddCircleOutline size={24} className="text-white" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default ProfileImage;
