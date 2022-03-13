const convertImageUrlToObject = async (imageUrl) => {
  const response = await fetch(imageUrl);

  if (response.status === 404) {
    throw new Error("Can't fount image");
  }

  const blob = await response.blob();
  const fileName = imageUrl.split('/').pop();
  const file = new File([blob], fileName, { type: blob.type });

  return file;
};
const convertImageUrlsToObjects = async (imageUrls) => {
  const arrayOfPromises = imageUrls.map(convertImageUrlToObject);

  return Promise.all(arrayOfPromises);
};

export { convertImageUrlsToObjects };
