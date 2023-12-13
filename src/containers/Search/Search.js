import React, {Component} from 'react';
import "./Search.css";
import Navigation from '../../components/Navigation/Navigation';
import ImageLinkForm from "../../components/ImageLinkForm/ImageLinkForm";
import FaceRecognitionPanel from '../../components/FaceRecognitionPanel/FaceRecognitionPanel';
import Rank from '../../components/Rank/Rank';
import faceDetectionRequest from './FaceDetection';

class Search extends Component {
    constructor(){
        super()
        this.state = {
            inputValue: "",
            imageURL: "",
            imageBoxList: [],
            inputError: false,
            noFacesFound: false
        }
    }
    onInputChange = event => {
        this.setState({inputValue: event.target.value, inputError: false, noFacesFound: false})
    }

    onButtonSubmit = () => {
        const {inputValue} = this.state;
        if(inputValue){
            this.setState({imageURL: inputValue}, () => this.getFaceDetection())
        }
        else {
           this.setState({inputError: true})
        }
    }

    getFaceDetection = async () => {
       try {
        const response = await faceDetectionRequest(this.state.inputValue)
        this.calculateFaceLocation(await response);
       } catch(error){
         this.setState({noFacesFound: true, inputValue: ""})
       }
    }

    createBoxDimensions = (faceDetectionList) => {
        const image = document.getElementById("user-uploaded-image");
        const width = Number(image.width);
        const height = Number(image.height);

        if(faceDetectionList.length){
            const mappedList = faceDetectionList.map((item, index) => {
                const id = item.id || item.value || index;
                const box = item.region_info.bounding_box
                const left = width * box.left_col;
                const right = width * box.right_col;
                const drawnBoxWidth = Math.round(right - left); 

                const top = height * box.top_row;
                const bottom = height * box.bottom_row;
                const drawnBoxHeight = Math.round(bottom - top); 

                return {id, width: drawnBoxWidth, height: drawnBoxHeight, top, left };
            })
            return mappedList;
        } else {
            this.setState({noFacesFound: true})
        }
    }

    calculateFaceLocation = responseData => {
        const responseList = responseData.outputs[0].data.regions
        const imageBoxList = this.createBoxDimensions(responseList)
        this.setState({imageBoxList, inputValue: ""})
    }

    render(){
        const {inputValue, imageURL, noFacesFound, imageBoxList, inputError} = this.state;
        return (
            <div className="search-container">
                <Navigation/>
                <Rank/>
                <ImageLinkForm 
                inputValue={inputValue} 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                inputError={inputError}
                noFacesFound={noFacesFound}
                />
                <FaceRecognitionPanel imageURL={imageURL} imageBoxList={imageBoxList}/>
            </div>
        )
    }
}

export default Search;