import { ContentState, convertFromRaw } from 'draft-js';

const convertDescription = (description) => {
  let parsedDescription;

  try {
    parsedDescription = JSON.parse(description);
  } catch (e) {
    parsedDescription = description;
  }

  const contentState =
    typeof parsedDescription === 'object'
      ? convertFromRaw(parsedDescription)
      : ContentState.createFromText(parsedDescription);

  return contentState;
};

export default convertDescription;
