import React from 'react';
import './FaceRecognitionPanel.css';

const createBoxDimensions = (imageBoxList) => {
  const image = document.getElementById('user-uploaded-image');
  const width = Number(image.width);
  const height = Number(image.height);

  const mappedList = imageBoxList.map((item, index) => {
    const id = item.id || item.value || index;
    const box = item.region_info.bounding_box;
    const left = width * box.left_col;
    const right = width * box.right_col;
    const drawnBoxWidth = Math.round(right - left);

    const top = height * box.top_row;
    const bottom = height * box.bottom_row;
    const drawnBoxHeight = Math.round(bottom - top);

    return { id, width: drawnBoxWidth, height: drawnBoxHeight, top, left };
  });
  return mappedList;
};

const FaceRecognitionPanel = ({ imageURL, imageBoxList }) => {
  const displayReadyBoxList = imageBoxList.length
    ? createBoxDimensions(imageBoxList)
    : [];
  return (
    imageURL && (
      <div className="panel-container">
        <div className="image-container">
          {displayReadyBoxList.length
            ? displayReadyBoxList.map((box) => {
                return (
                  <div
                    className="face-detection-box"
                    key={box.id}
                    style={{
                      width: box.width,
                      height: box.height,
                      top: box.top,
                      left: box.left,
                    }}
                  />
                );
              })
            : null}

          <img
            className="face-recognition-image"
            id="user-uploaded-image"
            src={imageURL}
            alt="face detection result"
          />
        </div>
      </div>
    )
  );
};

export default FaceRecognitionPanel;
