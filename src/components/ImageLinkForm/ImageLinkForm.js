import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({inputValue, inputError, noFacesFound, onInputChange, onButtonSubmit}) => {
    return (
        <div className="form-container">
            <p className="description-text">This app will detect faces in your photos. Give it a try!</p>
            <div className="search-bar">
                <input className="search-input" value={inputValue} onChange={onInputChange}/>
                <button onClick={onButtonSubmit}>Enter</button>
            </div>
            {inputError && <p className="error-text">Please provide a valid URL.</p>}
            {noFacesFound && <p className="error-text">No faces found. Nice photo though!</p>}
        </div>
    )
}

export default ImageLinkForm;