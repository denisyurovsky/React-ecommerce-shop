const validateField = (e, cb) => {
  cb(Boolean(e.target.value));
};

export default validateField;
