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
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  SmallCloseIcon,
  AddIcon,
  WarningIcon,
  PlusSquareIcon,
  CopyIcon,
} from "@chakra-ui/icons";

function ResaleData({ resaleList, delResale, cloneResale }) {
  return (
    <Card mt={"3rem"}>
      <CardBody>
        <TableContainer>
          <Table size="md" variant="striped" colorScheme="blackAlpha">
            <TableCaption>Saved Market Transaction List</TableCaption>
            <Thead>
              <Tr>
                <Th>Month</Th>
                <Th>Block</Th>
                <Th>Street</Th>
                <Th>Type</Th>
                <Th>Storey</Th>
                <Th>Area m²</Th>
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
                  <Td>
                    <Button
                      leftIcon={<SmallCloseIcon />}
                      colorScheme="red"
                      variant="ghost"
                      size="s"
                      style={{ cursor: "pointer" }}
                      onClick={() => delResale(resale)}
                    ></Button>
                    <Button
                      leftIcon={<CopyIcon />}
                      colorScheme="teal"
                      variant="ghost"
                      size="xs"
                      style={{ cursor: "pointer" }}
                      onClick={() => cloneResale(resale)}
                    >
                      CLONE
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}

export default ResaleData;
