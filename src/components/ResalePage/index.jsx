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
  Box,
  Card,
  CardBody,
  Flex,
  Text,
} from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import ResaleTable from "../ResaleTable";
import ResaleList from "../ResaleListPage";
import OfferData from "../OfferData";
import { useDebounce } from "@uidotdev/usehooks";
import OpenMap from "../OpenMap";
import { SharedDataContext } from "../SharedData";
import ResaleChart from "../ResaleChart";
import { HamburgerIcon } from "@chakra-ui/icons";

const ResalePage = () => {
  const { addList } = useContext(SharedDataContext);
  const [resales, setResale] = useState([]);
  const [search, setSearch] = useState({
    SEARCHVAL: "THE PINNACLE@DUXTON",
    BLK_NO: "1C",
    ROAD_NAME: "CANTONMENT RD",
    BUILDING: "THE PINNACLE@DUXTON",
    ADDRESS: "1C CANTONMENT ROAD THE PINNACLE@DUXTON SINGAPORE 085301",
    POSTAL: "085301",
    TYPE: "",
    X: "28929.0768545093",
    Y: "28879.3522476424",
    LATITUDE: "1.27744909387079",
    LONGITUDE: "103.841666679651",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (Search) => {
    // console.log(Search);
    setSearch(Search);
  };

  // async function fetchResales() {
  //   const BASE_URL =
  //     "https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&limit=120";

  //   try {
  //     // const response = await fetch(
  //     //   `${BASE_URL}&q={"block":"${search.BLK_NO}","street_name":"${search.ROAD_NAME}","flat_type":"${search.TYPE}"}&sort=_id desc`,
  //     //   {
  //     //     method: "GET",
  //     //     headers: {},
  //     //   }
  //     // );

  //     let url;
  //     const baseQuery = {
  //       block: search.BLK_NO,
  //       street_name: search.ROAD_NAME,
  //     };

  //     if (search.TYPE) {
  //       baseQuery.flat_type = search.TYPE;
  //     }

  //     const queryStr = encodeURIComponent(JSON.stringify(baseQuery));

  //     if (search.hasOwnProperty("STOREY")) {
  //       if (search.STOREY === true) {
  //         url = `${BASE_URL}&q=${queryStr}&sort=storey_range desc,_id desc`;
  //       } else {
  //         url = `${BASE_URL}&q=${queryStr}&sort=storey_range asc,_id desc`;
  //       }
  //     } else {
  //       // Handle the case when search.STOREY does not exist
  //       url = `${BASE_URL}&q=${queryStr}&sort=_id desc`;
  //     }

  //     console.log(url);

  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {},
  //     });
  //     const jsonData = await response.json();
  //     // console.log(jsonData.result.total);

  //     if (jsonData.result.total !== 0) {
  //       const resaleData = jsonData.result.records.map((data) => ({
  //         ...data,
  //         id: data._id,
  //       }));
  //       setResale(resaleData);
  //     } else {
  //       if (search.hasOwnProperty("STOREY")) {
  //         if (search.STOREY === true) {
  //           const fallbackUrl = `${BASE_URL}&q={"street_name":"${search.ROAD_NAME}"}&sort=storey_range desc, _id desc`;
  //           const fallbackResponse = await fetch(fallbackUrl, {
  //             method: "GET",
  //             headers: {},
  //           });
  //           const fallbackJsonData = await fallbackResponse.json();
  //           const resaleData = fallbackJsonData.result.records.map((data) => ({
  //             ...data,
  //             id: data._id,
  //           }));
  //           setResale(resaleData);
  //         } else if (search.STOREY === false) {
  //           const fallbackUrl = `${BASE_URL}&q={"street_name":"${search.ROAD_NAME}"}&sort=storey_range asc, _id desc`;
  //           const fallbackResponse = await fetch(fallbackUrl, {
  //             method: "GET",
  //             headers: {},
  //           });
  //           const fallbackJsonData = await fallbackResponse.json();
  //           const resaleData = fallbackJsonData.result.records.map((data) => ({
  //             ...data,
  //             id: data._id,
  //           }));
  //           setResale(resaleData);
  //         } else {
  //           const response = await fetch(
  //             `${BASE_URL}&q={"street_name":"${search.ROAD_NAME}"}&sort=_id desc`,
  //             {
  //               method: "GET",
  //               headers: {},
  //             }
  //           );
  //           const jsonData = await response.json();
  //           const resaleData = jsonData.result.records.map((data) => ({
  //             ...data,
  //             id: data._id,
  //           }));
  //           setResale(resaleData); // Set empty array if no results found and STOREY is not specified
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during fetch
  //     console.error("Error fetching resale data:", error);
  //   }

  //   // console.log(resales);
  // }

  async function fetchResales() {
    const BASE_URL =
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&limit=120";

    try {
      let url;
      let query = {
        street_name: search.ROAD_NAME,
      };

      if (search.BLK_NO) {
        query.block = search.BLK_NO;
      }
      if (search.TYPE) {
        query.flat_type = search.TYPE;
      }

      const queryStr = encodeURIComponent(JSON.stringify(query));
      // console.log(queryStr);

      if (search.hasOwnProperty("STOREY")) {
        if (search.STOREY === true) {
          url = `${BASE_URL}&q=${queryStr}&sort=storey_range desc,_id desc`;
        } else {
          url = `${BASE_URL}&q=${queryStr}&sort=storey_range asc,_id desc`;
        }
      } else {
        // Handle the case when search.STOREY does not exist
        url = `${BASE_URL}&q=${queryStr}&sort=_id desc`;
      }

      // console.log(url);

      const response = await fetch(url, {
        method: "GET",
        headers: {},
      });
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
    // console.log(typeof props.id);
    const psf =
      parseFloat(props.resale_price) /
      parseFloat(props.floor_area_sqm) /
      10.764;
    // console.log(psf);

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
              _id: props.id,
              area: props.floor_area_sqm,
              storey: props.storey_range,
              type: props.flat_type,
              psf: parseInt(psf),
            },
          },
        ],
      }),
    });
    // const jsonData = await response.json();
    // console.log(jsonData);

    // const listData = jsonData.records.map((data) => ({
    //   ...data.fields,
    //   id: data.fields.id,
    // }));

    // setList(listData);
  }

  // Return a table with the respective record fields as columns
  return (
    <div>
      <Box width="100%">
        <Card borderRadius="lg" boxShadow="lg">
          <CardBody>
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="5xl"
              fontWeight="extrabold"
            >
              Discover Housing Resale Price Insight
            </Text>
            {/* <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="xl"
              fontWeight="regular"
            >
              type to discover
            </Text> */}
            {/* <h1 className="text-4xl font-bold">{`HDB Resale Transaction`}</h1> */}
            {/* <h2>{`${search.ADDRESS}`}</h2> */}
            <SearchBar search={search} onSearchSubmit={handleSubmit} />
          </CardBody>
        </Card>
        {resales && resales.length > 0 && <OpenMap search={search} />}
      </Box>
      {/* <Card width="75%">
        <CardBody>
          <Box
            as="iframe"
            width="100%"
            height="500"
            src="https://beta.data.gov.sg/collections/152/datasets/d_14f63e595975691e7c24a27ae4c07c79/chart/87"
          ></Box>
        </CardBody>
      </Card> */}
      {resales && resales.length > 0 && (
        // <Box>
        //   <Card borderRadius="lg" boxShadow="lg">
        //     <CardBody>
        <ResaleChart resales={resales} />
        //     </CardBody>
        //   </Card>
        // </Box>
      )}
      {/* <Box>
        <Text
          bgGradient="linear(to-r, cyan.400, purple.400)"
          bgClip="text"
          fontSize="3xl"
          fontWeight="bold"
          style={{ cursor: "pointer" }}
          onClick={onOpen}
        >
          <HamburgerIcon boxSize={6} mr={2} />
          Click Here for my Saved List
        </Text>
      </Box> */}

      <Box
        as="button"
        p={4}
        bgClip="text"
        fontWeight="bold"
        fontSize="3xl"
        borderRadius="md"
        onClick={onOpen}
        bgGradient="linear(to-r, cyan.400, purple.400)"
        _hover={{
          bgGradient: "linear(to-r, red.500, yellow.500)",
        }}
      >
        <Text>CLICK ME</Text>
        <Text fontSize="xs">FOR SAVED LIST</Text>
      </Box>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="outside"
        // size="full"
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          h="auto"
          // maxH="80vh"
          // w="auto"
          maxW={{ base: "90%", md: "90%", lg: "90%" }}
          borderRadius="lg"
          boxShadow="lg"
          p={4}
        >
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
      <ResaleTable
        resales={resales}
        addResale={addResale}
        addList={addList}
        search={search}
        onFilterSubmit={handleSubmit}
      />
    </div>
  );
};

export default ResalePage;
