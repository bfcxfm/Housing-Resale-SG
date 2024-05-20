import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";

const AddOfferModal = ({ isOpen, onClose, addOffer }) => {
  const [offerForm, setOfferForm] = useState({
    street: "",
    block: "",
    resale: "",
    area: "",
    storey: "",
    type: "",
  });

  const handleChange = (event) => {
    setOfferForm((curr) => ({
      ...curr,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddOffer = (data) => {
    addOffer(data);
    onClose(); // close the modal after submitting the offer
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Expected Price</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <FormControl isRequired isInvalid={offerForm.block === ""}>
            <FormLabel>Block Number</FormLabel>
            <Input
              name="block"
              placeholder="Enter block number"
              value={offerForm.block}
              onChange={handleChange}
            />
            <FormErrorMessage>Block Number is required.</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={offerForm.street === ""}>
            <FormLabel>Street</FormLabel>
            <Input
              name="street"
              placeholder="Enter street name"
              value={offerForm.street}
              onChange={handleChange}
            />
            <FormErrorMessage>Street is required.</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={offerForm.type === ""}>
            <FormLabel>Type</FormLabel>
            <Select
              name="type"
              placeholder="Select type"
              value={offerForm.type}
              onChange={handleChange}
            >
              <option value="2 ROOM">{"2 ROOM"}</option>
              <option value="3 ROOM">{"3 ROOM"}</option>
              <option value="4 ROOM">{"4 ROOM"}</option>
              <option value="5 ROOM">{"5 ROOM"}</option>
            </Select>
            <FormErrorMessage>Type is required.</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={offerForm.storey === ""}>
            <FormLabel>Storey Number</FormLabel>
            <NumberInput value={offerForm.storey}>
              <NumberInputField name="storey" onChange={handleChange} />
            </NumberInput>
            <FormErrorMessage>Storey Number is required.</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={offerForm.area === ""}>
            <FormLabel>Area m²</FormLabel>
            <NumberInput value={offerForm.area}>
              <NumberInputField name="area" onChange={handleChange} />
            </NumberInput>
            <FormErrorMessage>Area is required.</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={offerForm.resale === ""}>
            <FormLabel>Resale S$</FormLabel>
            <NumberInput value={offerForm.resale}>
              <NumberInputField name="resale" onChange={handleChange} />
            </NumberInput>
            <FormErrorMessage>Resale Price is required.</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => handleAddOffer(offerForm)}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddOfferModal;
