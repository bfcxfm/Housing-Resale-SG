import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function SearchBar({ search, onSearchSubmit }) {
  const [inputValue, setInputValue] = useState(search);

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearchSubmit(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Find by Street</FormLabel>
        <Input type="text" value={inputValue} onChange={handleChange} />
        <Button mt={4} colorScheme="teal" type="submit">
          Search
        </Button>
      </FormControl>
    </form>
  );
}

export default SearchBar;
