import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableCaption,
  FormControl,
  FormLabel,
  Switch,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Box,
  Button,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExtLink from "./ExtLink";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

function ResaleTable({ resales, addResale, addList, search, onFilterSubmit }) {
  const [updatedResales, setUpdatedResales] = useState([]);
  // const [selectedOption, setSelectedOption] = useState("");
  // const [typeOptions, setTypeOptions] = useState([]);

  useEffect(() => {
    // Update updatedResales whenever resales or addList changes
    setUpdatedResales(
      resales.map((resale) => ({
        ...resale,
        isAdded: addList.includes(resale._id),
      }))
    );
  }, [resales, addList]);

  const handleAddToList = (resaleId) => {
    const updatedResalesCopy = updatedResales.map((resale) =>
      resale._id === resaleId ? { ...resale, isAdded: true } : resale
    );
    setUpdatedResales(updatedResalesCopy);
    addResale(updatedResalesCopy.find((resale) => resale._id === resaleId));
  };

  // useEffect to calculate and set typeOptions on component mount
  // useEffect(() => {
  //   const initialTypeOptions = Object.keys(
  //     updatedResales.reduce((acc, item) => {
  //       const { flat_type } = item;
  //       acc[flat_type] = true;
  //       return acc;
  //     }, {})
  //   );
  //   setTypeOptions(initialTypeOptions);
  // }, []);

  // useEffect to update typeOptions when search changes
  // useEffect(() => {
  //   const newTypeOptions = Object.keys(
  //     updatedResales.reduce((acc, item) => {
  //       const { flat_type } = item;
  //       acc[flat_type] = true;
  //       return acc;
  //     }, {})
  //   );
  //   setTypeOptions(newTypeOptions);
  // }, [search.ADDRESS]);

  const typeOptions = Object.keys(
    updatedResales.reduce((acc, item) => {
      const { flat_type } = item;
      acc[flat_type] = true;
      return acc;
    }, {})
  );

  // console.log(typeOptions);

  const onOptionChange = (option) => {
    const selectedOption = option.target.value;
    // console.log(selectedOption);
    // setSelectedOption(selectedOption);
    onFilterSubmit({
      ...search, // spread the current state
      TYPE: selectedOption, // update the TYPE property to the new value
    });
  };

  const handleSort = () => {
    onFilterSubmit({
      ...search, // spread the current state
      STOREY: search.STOREY === true ? false : true, // toggle the value of STOREY
    });
  };

  // const updatedResales = resales.map((resale) => ({
  //   ...resale,
  //   isAdded: addList.includes(resale._id),
  // }));

  return (
    <Card borderRadius="lg" boxShadow="lg">
      {/* <CardHeader>
        <Heading size="md">Transaction List</Heading>
      </CardHeader> */}
      <CardBody>
        <TableContainer>
          <Table
            size={{ base: "sm", md: "md" }}
            variant="striped"
            colorScheme="blackAlpha"
            overflowX="auto"
          >
            <TableCaption>Results filtered by Search</TableCaption>
            <Thead>
              <Tr>
                <Th>Month</Th>
                <Th>Block</Th>
                <Th>Street</Th>
                <Th>Town</Th>
                <Th>
                  <Select
                    placeholder="TYPE"
                    size="xs"
                    onChange={(option) => onOptionChange(option)}
                  >
                    {typeOptions
                      .sort((a, b) => a.localeCompare(b))
                      .map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    <option value="">ALL</option> {/* Empty option */}
                  </Select>
                </Th>
                <Th onClick={() => handleSort()} style={{ cursor: "pointer" }}>
                  Storey <ArrowUpDownIcon mb="3px" />
                </Th>
                <Th>Area m²</Th>
                <Th>Resale S$</Th>
                <Th>Add to List</Th>
              </Tr>
            </Thead>
            <Tbody>
              {updatedResales.length > 0 ? (
                updatedResales.map((resale, index) => (
                  <Tr key={`${index}-${resale.isAdded}`}>
                    <Td>{resale.month}</Td>
                    <Td>{resale.block}</Td>
                    <Td>{resale.street_name}</Td>
                    <Td>{resale.town}</Td>
                    <Td>{resale.flat_type}</Td>
                    <Td>{resale.storey_range}</Td>
                    <Td>{resale.floor_area_sqm}</Td>
                    <Td>{resale.resale_price}</Td>
                    <Td>
                      <Box display="flex" alignItems="center">
                        <FormControl display="flex" alignItems="center">
                          <FormLabel htmlFor="resale" mb="0"></FormLabel>
                          {resale.isAdded ? (
                            <Switch
                              id={`${index}`}
                              isChecked={resale.isAdded}
                            />
                          ) : (
                            <Switch
                              id={`${index}`}
                              onChange={() => handleAddToList(resale._id)}
                            />
                          )}
                        </FormControl>
                        <ExtLink
                          town={resale.town}
                          street={resale.street_name}
                        />
                      </Box>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="9" textAlign="center" color="gray">
                    <Button
                      isLoading
                      loadingText="No available Data"
                      colorScheme="blue"
                      variant="ghost"
                    ></Button>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}

export default ResaleTable;
