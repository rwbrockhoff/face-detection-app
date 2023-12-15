import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Search.css';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import FaceRecognitionPanel from '../../components/FaceRecognitionPanel/FaceRecognitionPanel';
import { submitImage, setImageURL } from '../../redux/slices/imageSlice';

export default function Search() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);

  const userId = useSelector((state) => state.user.user.id);
  const image = useSelector((state) => state.image);
  const imageRef = useRef(null);
  const dispatch = useDispatch();

  const onInputChange = (event) => {
    setInputValue(event.target.value);
    setInputError(false);
  };

  const onButtonSubmit = () => {
    // need user id and valid input
    if (!inputValue || !userId) return setInputError(true);
    // set image URL to load on UI, clear previous box list if exists
    dispatch(setImageURL(inputValue));
    dispatch(submitImage({ imageURL: inputValue, imageRef })).then(() => {
      //thunk returns a promise, allows us to do this, reset image form
      setInputValue('');
      inputError && setInputError(false);
    });
  };

  return (
    <div className="gradient-background">
      <ImageLinkForm
        inputValue={inputValue}
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
        inputError={inputError}
        noFacesFound={image.noFacesFound}
      />
      <FaceRecognitionPanel
        imageURL={image.imageURL}
        imageRef={imageRef}
        imageBoxList={image.imageBoxList}
      />
    </div>
  );
}
