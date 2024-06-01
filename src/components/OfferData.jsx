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
  Card,
  CardBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import EditOfferModal from "./EditOfferModal";
import AddOfferModal from "./AddOfferModal";
import { EditIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

function OfferData({ offerList, delOffer, editOffer, addOffer }) {
  const {
    isOpen: isEditOfferModalOpen,
    onOpen: onEditOfferModalOpen,
    onClose: onEditOfferModalClose,
  } = useDisclosure();
  const {
    isOpen: isAddOfferModalOpen,
    onOpen: onAddOfferModalOpen,
    onClose: onAddOfferModalClose,
  } = useDisclosure();

  const [selectedResale, setSelectedResale] = useState(null);

  const handleOpenEditModal = (resale) => {
    setSelectedResale(resale);
    onEditOfferModalOpen();
  };

  const handleOpenAddModal = () => {
    onAddOfferModalOpen();
  };

  return (
    <Card mt={"3rem"}>
      <CardBody>
        <TableContainer>
          <Table
            size={{ base: "sm", md: "md" }}
            variant="striped"
            colorScheme="gray"
          >
            <TableCaption placement="top" textAlign="left">
              Personal Transaction List
            </TableCaption>
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
                      onClick={() => handleOpenEditModal(resale)}
                    >
                      UPDATE
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Tooltip
          hasArrow
          label="or Clone from Below Saved Transaction List"
          bg="gray.300"
          color="black"
        >
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            variant="link"
            size="xs"
            style={{ cursor: "pointer" }}
            onClick={handleOpenAddModal}
          >
            ADD HOUSE
          </Button>
        </Tooltip>

        {isEditOfferModalOpen && (
          <EditOfferModal
            isOpen={isEditOfferModalOpen}
            onClose={onEditOfferModalClose}
            editOffer={editOffer}
            delOffer={delOffer}
            resale={selectedResale}
          />
        )}

        {isAddOfferModalOpen && (
          <AddOfferModal
            isOpen={isAddOfferModalOpen}
            onClose={onAddOfferModalClose}
            addOffer={addOffer}
          />
        )}
      </CardBody>
    </Card>
  );
}

export default OfferData;
