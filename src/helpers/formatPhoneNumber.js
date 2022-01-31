const formatPhoneNumber = (val) => {
  return val?.length > 4 && val?.length <= 11
    ? `+${val[0]} (${val?.slice(1, 4)}) ${val?.slice(4)}`
    : val;
};

export default formatPhoneNumber;
