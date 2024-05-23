import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  FormErrorMessage,
  TableCaption,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import ResaleTable from "../ResaleTable";
import ResaleList from "../ResaleListPage";
import OfferData from "../OfferData";
import Select from "react-select";
import { useDebounce } from "@uidotdev/usehooks";
import { useSharedStore } from "../SharedStore";
import OpenMap from "../OpenMap";

const ResalePage = () => {
  const [resales, setResale] = useState([]);
  const [search, setSearch] = useState({
    SEARCHVAL: "THE PINNACLE@DUXTON",
    BLK_NO: "1C",
    ROAD_NAME: "CANTONMENT RD",
    BUILDING: "THE PINNACLE@DUXTON",
    ADDRESS: "1C CANTONMENT ROAD THE PINNACLE@DUXTON SINGAPORE 085301",
    POSTAL: "085301",
    X: "28929.0768545093",
    Y: "28879.3522476424",
    LATITUDE: "1.27744909387079",
    LONGITUDE: "103.841666679651",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setResaleMounted } = useSharedStore();

  const handleSubmit = (Search) => {
    // console.log(Search);
    setSearch(Search);
  };

  async function fetchResales() {
    const BASE_URL =
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&limit=20";

    try {
      const response = await fetch(
        `${BASE_URL}&q={"block":"${search.BLK_NO}","street_name":"${search.ROAD_NAME}"}&sort=_id desc`,
        {
          method: "GET",
          headers: {},
        }
      );
      const jsonData = await response.json();
      // console.log(jsonData.result.total);

      if (jsonData.result.total !== 0) {
        const resaleData = jsonData.result.records.map((data) => ({
          ...data,
          id: data._id,
        }));
        setResale(resaleData);
      } else {
        const response = await fetch(
          `${BASE_URL}&q={"street_name":"${search.ROAD_NAME}"}&sort=_id desc`,
          {
            method: "GET",
            headers: {},
          }
        );
        const jsonData = await response.json();
        const resaleData = jsonData.result.records.map((data) => ({
          ...data,
          id: data._id,
        }));
        setResale(resaleData);
      }
    } catch (error) {
      // Handle any errors that occur during fetch
      console.error("Error fetching resale data:", error);
    }

    // console.log(resales);
  }

  useEffect(() => {
    fetchResales();
  }, [search]);

  async function addResale(props) {
    const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
    const BASE_URL = "https://api.airtable.com/v0/appufJw7hv6aH44fQ";
    console.log(typeof props.id);
    const psf =
      parseFloat(props.resale_price) /
      parseFloat(props.floor_area_sqm) /
      10.764;
    console.log(psf);

    const response = await fetch(`${BASE_URL}/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              street: props.street_name,
              month: props.month,
              block: props.block,
              resale: props.resale_price,
              id: props.id,
              area: props.floor_area_sqm,
              storey: props.storey_range,
              type: props.flat_type,
              psf: parseInt(psf),
            },
          },
        ],
      }),
    });
    const jsonData = await response.json();
    console.log(jsonData);

    // const listData = jsonData.records.map((data) => ({
    //   ...data.fields,
    //   id: data.fields.id,
    // }));

    // setList(listData);
  }

  // Return a table with the respective record fields as columns
  return (
    <div className="container">
      <h1 className="text-4xl font-bold">{`HDB Resale Transaction`}</h1>
      <h2>{`${search.ADDRESS}`}</h2>
      <SearchBar search={search} onSearchSubmit={handleSubmit} />
      <OpenMap search={search} />
      <Button margin={3} onClick={onOpen}>
        My list
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="outside"
        size="full"
        isCentered
      >
        <ModalOverlay />
        <ModalContent h="auto" maxH="80vh" w="auto">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <ResaleList />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ResaleTable resales={resales} addResale={addResale} />
    </div>
  );
};

export default ResalePage;
