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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditOfferModal from "./EditOfferModal";
import AddOfferModal from "./AddOfferModal";
import { EditIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

function OfferData({ offerList, delOffer, editOffer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedResale, setSelectedResale] = useState(null);

  const handleOpenModal = (resale) => {
    setSelectedResale(resale);
    onOpen();
  };

  return (
    <TableContainer>
      <Table size="md" variant="striped" colorScheme="blackAlpha">
        <TableCaption></TableCaption>
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
          {offerList.map((resale, index) => (
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
                  leftIcon={<EditIcon />}
                  colorScheme="teal"
                  variant="ghost"
                  size="xs"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpenModal(resale)}
                >
                  UPDATE
                </Button>
                {selectedResale && (
                  <EditOfferModal
                    isOpen={isOpen}
                    onClose={onClose}
                    editOffer={editOffer}
                    delOffer={delOffer}
                    resale={selectedResale}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default OfferData;
