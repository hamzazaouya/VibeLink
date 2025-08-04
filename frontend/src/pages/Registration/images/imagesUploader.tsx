import { useState } from 'react';

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col items-center">
      <label className="cursor-pointer rounded-2xl w-60 h-80 flex justify-center items-center text-gray-500">
        {image ? 
          <img src={image} alt="preview" className="object-cover h-full w-full rounded" />
        : 
          <spna>Upload Image</spna>}
        <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
      </label>
    </div>
  );
}

export default ImageUploader;
