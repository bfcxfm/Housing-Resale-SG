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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExtLink from "./ExtLink";

function ResaleTable({ resales, addResale, addList }) {
  const [updatedResales, setUpdatedResales] = useState([]);

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
            size="md"
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
                <Th>Type</Th>
                <Th>Storey</Th>
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
