export const handleDrop = (event) => {
  console.log(event);
};

// Images Uploads
export const handleImageUploadBefore = (files, info, uploadHandler) => {
  console.log(files, info);
};

export const imageUploadHandler = (xmlHttpRequest, info, core) => {
  console.log(xmlHttpRequest, info, core);
};

export const handleImageUploadError = (errorMessage, result) => {
  console.log(errorMessage, result);
};

// Audio Uploads
export const handleAudioUploadBefore = (files, info, uploadHandler) => {
  console.log(files, info);
};

export const handleAudioUpload = (
  targetElement,
  index,
  state,
  info,
  remainingFilesCount
) => {
  console.log(targetElement, index, state, info, remainingFilesCount);
};

export const handleAudioUploadError = (errorMessage, result) => {
  console.log(errorMessage, result);
};

// Video Uploads
export const handleVideoUploadBefore = (files, info, uploadHandler) => {
  console.log(files, info);
};

export const handleVideoUpload = (
  targetElement,
  index,
  state,
  info,
  remainingFilesCount
) => {
  console.log(targetElement, index, state, info, remainingFilesCount);
};

export const handleVideoUploadError = (errorMessage, result) => {
  console.log(errorMessage, result);
};
