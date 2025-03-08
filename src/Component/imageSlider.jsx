import { useState, useEffect } from "react";

export default function ImageSlider(props) {
    const images = props.images || []; 
    console.log(images);

    // If images is not empty, set the first image as the selected image, otherwise, use a default image
    const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[0] : "");

    useEffect(() => {
        // Ensure the selected image is set to the first image when images change
        if (images.length > 0 && !selectedImage) {
            setSelectedImage(images[0]);
        }
    }, [images, selectedImage]);

    return (
        <div className="w-full h-full flex flex-col items-center">
            {selectedImage && (
                <img src={selectedImage} alt="product" className="w-full h-[550px] object-fill" />
            )}
            <div className="w-full mt-[20px] h-[150px] flex justify-center">
                {images.map((image, index) => (
                    <img 
                        key={index} 
                        src={image} 
                        alt="product" 
                        className={`w-[100px] h-[100px] mr-[2px] object-cover cursor-pointer ${
                            image === selectedImage ? "border border-accent" : ""
                        }`}
                        onClick={() => setSelectedImage(image)}
                    />
                ))}
            </div>
        </div>
    );
}
