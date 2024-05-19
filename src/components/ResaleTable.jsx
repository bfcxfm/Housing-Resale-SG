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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ListCheck from "./ListCheck";

function ResaleTable({ resales, addResale }) {
  return (
    <TableContainer>
      <Table size="md" variant="striped" colorScheme="blackAlpha">
        <TableCaption>Results filtered by Street</TableCaption>
        <Thead>
          <Tr>
            <Th>Month</Th>
            <Th>Block</Th>
            <Th>Street</Th>
            <Th>Town</Th>
            <Th>Type</Th>
            <Th>Storey</Th>
            <Th>Area</Th>
            <Th>Resale S$</Th>
            <Th>Add to List</Th>
          </Tr>
        </Thead>
        <Tbody>
          {resales.map((resale, index) => (
            <Tr key={index}>
              <Td>{resale.month}</Td>
              <Td>{resale.block}</Td>
              <Td>{resale.street_name}</Td>
              <Td>{resale.town}</Td>
              <Td>{resale.flat_type}</Td>
              <Td>{resale.storey_range}</Td>
              <Td>{resale.floor_area_sqm}</Td>
              <Td>{resale.resale_price}</Td>
              <Td>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="fav" mb="0"></FormLabel>
                  <Switch id="fav" onChange={() => addResale(resale)} />
                </FormControl>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ResaleTable;
