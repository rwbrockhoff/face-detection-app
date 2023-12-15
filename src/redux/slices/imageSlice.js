import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { faceDetectionAPI } from '../../api/axios';

export const submitImage = createAsyncThunk('submitImage', async (imageURL) => {
  const response = await faceDetectionAPI.post('/image', imageURL);
  const imageBoxList = (await response.data.outputs[0].data.regions) || [];
  return await imageBoxList;
});

const initialState = {
  imageURL: '',
  imageBoxList: [],
  noFacesFound: false,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
      state.noFacesFound = false;
      state.imageBoxList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitImage.fulfilled, (state, action) => {
      const { payload } = action;
      console.log();
      if (!payload.length) {
        //show image with no faces found error
        state.noFacesFound = true;
      } else {
        //show image and face boxes
        state.imageBoxList = payload;
        state.noFacesFound = false;
      }
    });
  },
});

export const { setImageURL } = imageSlice.actions;
export default imageSlice.reducer;
