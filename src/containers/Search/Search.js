import React, { Component } from 'react';
import './Search.css';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import FaceRecognitionPanel from '../../components/FaceRecognitionPanel/FaceRecognitionPanel';
import Rank from '../../components/Rank/Rank';
import Form from '../../components/Form/Form';
import { faceDetectionAPI } from '../../axios';

const initialState = {
  isSignedIn: false,
  inputValue: '',
  imageURL: '',
  imageBoxList: [],
  inputError: false,
  noFacesFound: false,
  user: {
    id: 13,
    name: 'Joshua Dobbs',
    email: '',
    entries: 0,
    joined: '',
  },
};

class Search extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onRouteChange = () => {
    //do something here
    console.log('Route Change');
  };

  onInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
      inputError: false,
      noFacesFound: false,
    });
  };

  onInputError = () => {
    this.setState({ inputError: true });
  };

  onButtonSubmit = () => {
    const { inputValue, user } = this.state;
    // need user id and valid input
    if (!inputValue || !user.id) return this.onInputError();
    // set image URL to load on UI, clear previous box list if exists
    this.setState({ imageURL: inputValue, imageBoxList: [] }, this.submitImage);
  };

  submitImage = async () => {
    const { imageURL } = this.state;
    if (!imageURL) return this.onInputError();
    try {
      const response = await faceDetectionAPI.post('/image', { imageURL });
      this.calculateFaceLocation(await response);
      this.updateEntries();
    } catch (err) {
      this.setState({ noFacesFound: true, inputValue: '' });
    }
  };

  createBoxDimensions = (faceDetectionList) => {
    const image = document.getElementById('user-uploaded-image');
    const width = Number(image.width);
    const height = Number(image.height);

    if (faceDetectionList.length) {
      const mappedList = faceDetectionList.map((item, index) => {
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
    } else {
      this.setState({ noFacesFound: true });
    }
  };

  calculateFaceLocation = (response) => {
    const responseList = response.data.outputs[0].data.regions;
    const imageBoxList = this.createBoxDimensions(responseList);
    this.setState({ imageBoxList, inputValue: '' });
  };

  updateEntries = async () => {
    const { id, entries } = this.state.user;
    const response = await faceDetectionAPI.put('/user/entry', { id, entries });
    let newEntries = response.data.entries++;
    this.setState({ entries: newEntries++ });
  };

  render() {
    const { inputValue, imageURL, noFacesFound, imageBoxList, inputError } =
      this.state;
    return (
      <div className="gradient-background">
        <Rank />
        <Form />
        <ImageLinkForm
          inputValue={inputValue}
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          inputError={inputError}
          noFacesFound={noFacesFound}
        />
        <FaceRecognitionPanel imageURL={imageURL} imageBoxList={imageBoxList} />
      </div>
    );
  }
}

export default Search;
