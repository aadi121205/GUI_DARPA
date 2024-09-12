import React, { useContext, useState, useEffect } from "react";
import telemContext from "../../context/home/telemContext";

const renderFrame = (data, frame) => {
    if (frame) {
        return (
            <div>
                <img src={frame} alt="UAV Frame" />
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

    useEffect(() => {
        if (data.uav_frame) {
            // Convert the array buffer to a Blob
            const blob = new Blob([new Uint8Array(data.uav_frame)], { type: 'image/jpeg' });
            // Create a URL for the Blob
            const src = URL.createObjectURL(blob);
            setFrame(src);

            // Clean up the URL object when the component unmounts or data changes
            return () => URL.revokeObjectURL(src);
        }
    }, [data.uav_frame]);

    return (
        <div style={{ textAlign: "center", color: "white" }}>
            <h1>Image Display</h1>
            {renderFrame(data, frame)}
        </div>
    );
};

export default ImageDisplay;
