import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

const ImageUploader = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");
  const { toast } = useToast();

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImageToImgbb(file);
      setUploadedImage(imageUrl);
      onImageUpload(imageUrl);
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully!",
        duration: 5000,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label
        htmlFor="upload"
        className={`flex items-center gap-2 w-full h-12 px-3 text-sm border border-input rounded-md transition 
        focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-[#e8f0fe] text-foreground
        cursor-pointer select-none
        ${uploading ? "opacity-50 cursor-not-allowed" : ""}
      `}
      >
        <ImageIcon className="w-5 h-5" />
        <span className="text-gray-500 select-none">
          {uploading
            ? "Uploading..."
            : uploadedImage
            ? "Image uploaded"
            : "Click to upload image"}
        </span>
      </label>

      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        disabled={uploading}
        className="hidden"
      />
      {uploadedImage && (
        <p className="mt-2 text-sm text-muted-foreground break-all">
          {uploadedImage}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
