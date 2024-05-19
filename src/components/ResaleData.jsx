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
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function ResaleData({ resaleList, delResale }) {
  return (
    <TableContainer>
      <Table size="md" variant="striped" colorScheme="blackAlpha">
        <TableCaption>Results filtered by List</TableCaption>
        <Thead>
          <Tr>
            <Th>Month</Th>
            <Th>Block</Th>
            <Th>Street</Th>
            <Th>Type</Th>
            <Th>Storey</Th>
            <Th>Area</Th>
            <Th>Resale S$</Th>
            <Th>psf S$</Th>
          </Tr>
        </Thead>
        <Tbody>
          {resaleList.map((resale, index) => (
            <Tr key={index}>
              <Td>{resale.month}</Td>
              <Td>{resale.block}</Td>
              <Td>{resale.street}</Td>
              <Td>{resale.type}</Td>
              <Td>{resale.storey}</Td>
              <Td>{resale.area}</Td>
              <Td>{resale.resale}</Td>
              <Td>{parseInt(`${resale.psf}`)}</Td>
              <Tooltip hasArrow label="Remove" bg="gray.300" color="black">
                <Td style={{ cursor: "pointer" }}>
                  <Button
                    colorScheme="teal"
                    variant="ghost"
                    size="xs"
                    onClick={() => delResale(resale)}
                  >
                    REMOVE
                  </Button>
                </Td>
              </Tooltip>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ResaleData;
