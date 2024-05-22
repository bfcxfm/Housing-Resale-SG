import {
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

function SearchBar({ search, onSearchSubmit }) {
  const [inputValue, setInputValue] = useState(search);
  const [addresses, setAddress] = useState([]);
  const [street, setStreet] = useState("");
  const [block, setBlock] = useState("");
  const [Lat, setLat] = useState("");
  const [Lon, setLon] = useState("");
  const [post, setPost] = useState("");

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearchSubmit(inputValue);
  };

  const debouncedSearchTerm = useDebounce(inputValue, 300);

  async function fetchAddress() {
    const BASE_URL = "https:/www.onemap.gov.sg/api/common/elastic/search?";
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
    console.log(AddressData);
    setAddress(AddressData);
  }

  useEffect(() => {
    fetchAddress();
  }, [debouncedSearchTerm]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <FormControl>
            <FormLabel>Find by Street</FormLabel>
            {/* <Input type="text" value={inputValue} onChange={handleChange} /> */}
            <AutoComplete openOnFocus>
              <AutoCompleteInput variant="filled" onChange={handleChange} />
              <AutoCompleteList>
                {addresses.map((address, idx) => (
                  <AutoCompleteItem
                    key={idx}
                    value={address.ADDRESS}
                    textTransform="capitalize"
                  >
                    {address.ADDRESS}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </AutoComplete>
            <FormHelperText>Search by Street / Postal Code</FormHelperText>
          </FormControl>
          <Button mt={2} colorScheme="teal" type="submit">
            Search
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default SearchBar;
