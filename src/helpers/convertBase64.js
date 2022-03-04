const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

export default convertBase64;

const convertBase64ArrayOfImages = (files) => {
  const arrayOfPromises = files.map((file) => convertBase64(file));

  return Promise.all(arrayOfPromises);
};

export { convertBase64ArrayOfImages, convertBase64 };
