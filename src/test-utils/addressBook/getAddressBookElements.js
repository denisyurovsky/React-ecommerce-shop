const getAddressBookElements = (screen) => {
  const titleSelect = screen.getByLabelText(/title/i);
  const nameInput = screen.getByLabelText('Name');
  const surnameInput = screen.getByLabelText('Surname');
  const phoneInput = screen.getByLabelText('Phone');
  const autocompleteCountry = screen.getByTestId('autocomplete-country');
  const countryInput = autocompleteCountry.querySelector('input');
  const autocompleteCity = screen.getByTestId('autocomplete-city');
  const cityInput = autocompleteCity.querySelector('input');
  const streetInput = screen.getByLabelText('Street');
  const buildingInput = screen.getByLabelText('Building');
  const flatInput = screen.getByLabelText('Flat');
  const zipInput = screen.getByLabelText('Zip');

  return {
    titleSelect,
    nameInput,
    surnameInput,
    phoneInput,
    autocompleteCountry,
    countryInput,
    autocompleteCity,
    cityInput,
    streetInput,
    buildingInput,
    flatInput,
    zipInput,
  };
};

export default getAddressBookElements;
