import { useField } from "@formiz/core";
import { Box } from "@mui/material";
import { useRef, useState } from "react";

const InputImage = (props: any) => {
  const { setValue } = useField(props);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files![0];
    setSelectedImage(imageFile);
    setValue(imageFile);
  };
  return (
    <Box className="input-container input-image-container">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
        ref={inputRef}
      />
      <img
        src={
          selectedImage
            ? URL.createObjectURL(selectedImage)
            : "imageToUpload.jpg"
        }
        alt="image-to-upload"
        style={{ height: "300px", cursor: "pointer" }}
        onClick={() => inputRef.current?.click()}
      />
    </Box>
  );
};

export default InputImage;
