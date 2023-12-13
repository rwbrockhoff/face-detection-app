import React from "react";
import "./FaceRecognitionPanel.css";

const FaceRecognitionPanel = ({imageURL, imageBoxList}) => {
    return imageURL && (
        <div className="panel-container">
            <div className="image-container">
                {imageBoxList.length ? imageBoxList.map(box => {
                    return (
                     <div className="face-detection-box"
                        key={box.id}
                        style={
                        {width: box.width, 
                         height: box.height, 
                         top: box.top, 
                         left: box.left}}/>)
                    }) : null }
            
                <img 
                className="face-recognition-image" 
                id="user-uploaded-image" 
                src={imageURL} 
                alt="face detection result"
                />
            </div>
        </div>
    )
}

export default FaceRecognitionPanel;