export default (...files) =>
  files
    .filter((file) => !file.previewURL)
    .map((file) => (file.previewURL = URL.createObjectURL(file)));
