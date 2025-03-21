const ImageSelectorFunc = (
  image: any,
  setSelectedImage: any,
  selectedImage: any
) => {
  if (selectedImage) {
    setSelectedImage(null);
  } else {
    setSelectedImage(image.uri);
  }
};
export default ImageSelectorFunc;
