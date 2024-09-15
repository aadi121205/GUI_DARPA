import React, { useContext, useState, useEffect } from "react";
import telemContext from "../../context/home/telemContext";

const renderFrame = (data, frame) => {
    if (frame) {
        return (
            <div>
                <img src={frame} alt="UAV Frame" style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />
                <button onClick={() => downloadImage(frame)}>Download Image</button>
            </div>
        );
    }
    return <p>No frame data available</p>;
};

const downloadImage = (src) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = "image.jpg";
    link.click();
};

const ImageDisplay = () => {
    const { data } = useContext(telemContext); // Assuming you have a setData function to update the context
    const [frame, setFrame] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null); // For uploaded image

    // Handle UAV frame data
    useEffect(() => {
        if (data.uav_frame) {
            const blob = new Blob([new Uint8Array(data.uav_frame)], { type: 'image/jpeg' });
            const src = URL.createObjectURL(blob);
            setFrame(src);

            return () => URL.revokeObjectURL(src);
        }
    }, [data.uav_frame]);

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ textAlign: "center", color: "white" }}>
            <h1>Image Display</h1>
            {renderFrame(data, frame)}
            
            <div style={{ marginTop: "20px" }}>
                <h2>Upload Image</h2>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {uploadedImage && (
                    <div>
                        <img src={uploadedImage} alt="Uploaded" style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageDisplay;
