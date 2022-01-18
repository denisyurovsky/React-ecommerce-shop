const formatRussianZip = (zip) => {
  return zip.replace(/[^0-9]/g, '').slice(0, 6);
};

export default formatRussianZip;
