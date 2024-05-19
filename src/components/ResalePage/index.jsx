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
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  TableCaption,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import ResaleTable from "../ResaleTable";

const ResalePage = () => {
  const [resales, setResale] = useState([]);
  const [search, setSearch] = useState("Cantonment Rd");

  const handleSubmit = (Search) => {
    // console.log(Search);
    setSearch(Search);
  };

  async function fetchResales() {
    const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
    const BASE_URL =
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&limit=20";
    const response = await fetch(
      `${BASE_URL}&q={"street_name":"${search}"}&sort=_id desc`,
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
      parseFloat(props.resale_price) / parseFloat(props.floor_area_sqm);
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
      <h1>{`HDB Resale Transaction`}</h1>
      <h2>{`${search}`}</h2>
      <SearchBar search={search} onSearchSubmit={handleSubmit} />
      <ResaleTable resales={resales} addResale={addResale} />
    </div>
  );
};

export default ResalePage;
