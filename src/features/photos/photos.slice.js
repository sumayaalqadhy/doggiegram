import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

const initialState = {
  photos,
};

const options = {
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.photos.unshift(action.payload);
  },
    // Created `addPhoto()` case reducer that adds a photo to state.photos. 
   
    removePhoto: (state, action) => {
      state.photos.splice(
        state.photos.findIndex((photos) => photos.id === action.payload), 1
      )
    }
    // Created an `removePhoto()` case reducer that removes a photo from state.photos
  
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  // Task 12: Complete `selectFilteredPhotos()` selector to return a filtered list of photos whose captions match the user's search term
  const searchTerm = selectSearchTerm(state);

  if (!searchTerm) {
    // returns all photos if search is blank
    return state.photos.photos;
  }

  // returns photos by caption based on search term
  return state.photos.photos.filter(photo => photo.caption.toLowerCase().includes(searchTerm.toLowerCase()));
};
