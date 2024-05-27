import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useDebounce } from "@uidotdev/usehooks";
import ReplaceWords from "./ReplaceWords";

function SearchBar({ search, onSearchSubmit }) {
  const [inputValue, setInputValue] = useState(search.ADDRESS);
  const [addresses, setAddress] = useState([]);
  const [autocompleteClicked, setAutocompleteClicked] = useState(false);

  // const [street, setStreet] = useState("");
  // const [block, setBlock] = useState("");
  // const [Lat, setLat] = useState("");
  // const [Lon, setLon] = useState("");
  // const [post, setPost] = useState("");

  const onSelect = (selectedAddress) => {
    const replacedAddress = ReplaceWords(selectedAddress);
    // console.log(replacedAddress);
    onSearchSubmit(replacedAddress);
    setAutocompleteClicked(true);
  };

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
    setAutocompleteClicked(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearchSubmit(inputValue);
  };

  const debouncedSearchTerm = useDebounce(inputValue, 300);

  async function fetchAddress() {
    const BASE_URL = "https://www.onemap.gov.sg/api/common/elastic/search?";
    const response = await fetch(
      `${BASE_URL}searchVal=${inputValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
      {
        method: "GET",
        headers: {},
      }
    );
    const jsonData = await response.json();
    const AddressData = jsonData.results.map((data) => ({
      ...data,
      value: data.ADDRESS,
      label: data.ADDRESS,
    }));

    // const AddressData = jsonData.results.map((data) => data.ADDRESS);
    // console.log(AddressData);
    setAddress(AddressData);
  }

  useEffect(() => {
    fetchAddress();
  }, [debouncedSearchTerm]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex
          display="flex"
          flexDirection="column"
          // minWidth="max-content"
          alignItems="center"
          gap="2"
        >
          <FormControl>
            <FormLabel>Find Resale by Street / Postal Code</FormLabel>
            {/* <Input type="text" value={inputValue} onChange={handleChange} /> */}
            <AutoComplete openOnFocus emptyState={false}>
              <AutoCompleteInput variant="filled" onChange={handleChange} />
              <AutoCompleteList>
                {addresses.map((address, idx) => (
                  <AutoCompleteItem
                    key={idx}
                    value={address.ADDRESS}
                    textTransform="capitalize"
                    onClick={() => onSelect(address)}
                  >
                    {address.ADDRESS}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </AutoComplete>
            <FormHelperText>Choose from Suggestions</FormHelperText>
          </FormControl>
          {/* <Box
            as="button"
            p={2}
            color="white"
            fontWeight="bold"
            borderRadius="md"
            bgGradient="linear(to-r, teal.500, green.500)"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
            }}
          > */}
          {!autocompleteClicked && (
            <Button mt={2} colorScheme="teal" variant="outline" type="submit">
              Search
            </Button>
          )}
          {/* </Box> */}
        </Flex>
      </form>
    </>
  );
}

export default SearchBar;
