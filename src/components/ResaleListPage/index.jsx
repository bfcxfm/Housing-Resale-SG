import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ResaleData from "../ResaleData";
import { useEffect, useState } from "react";
import OfferData from "../OfferData";
import { Button, Tooltip, useDisclosure } from "@chakra-ui/react";
import AddOfferModal from "../AddOfferModal";
import { PlusSquareIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

function ResaleList() {
  const [resaleList, setResaleList] = useState([]);
  const [offerList, setOfferList] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();

  async function fetchResaleList() {
    const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
    const BASE_URL = "https://api.airtable.com/v0/appufJw7hv6aH44fQ";
    const response = await fetch(`${BASE_URL}/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const jsonData = await response.json();

    const listData = jsonData.records.map((data) => ({
      ...data.fields,
      id: data.id,
    }));

    setResaleList(listData);
  }

  async function fetchOfferList() {
    const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
    const BASE_URL = "https://api.airtable.com/v0/appufJw7hv6aH44fQ";
    const response = await fetch(`${BASE_URL}/offer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const jsonData = await response.json();

    const listData = jsonData.records.map((data) => ({
      ...data.fields,
      id: data.id,
    }));

    setOfferList(listData);
  }

  async function delResale(props) {
    const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
    const BASE_URL = "https://api.airtable.com/v0/appufJw7hv6aH44fQ";
    const RECORDS = props.id;
    const response = await fetch(`${BASE_URL}/list/?records[]=${RECORDS}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const jsonData = await response.json();
    console.log(jsonData);

    fetchResaleList();

    // const listData = jsonData.records.map((data) => ({
    //   ...data.fields,
    //   id: data.fields.id,
    // }));

    // setList(listData);
  }

  async function addOffer(props) {
    const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
    const BASE_URL = "https://api.airtable.com/v0/appufJw7hv6aH44fQ";
    const psf = parseFloat(props.resale) / parseFloat(props.area) / 10.764;
    console.log(psf);

    const response = await fetch(`${BASE_URL}/offer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              street: props.street,
              month: new Date().toISOString().slice(0, 7),
              block: props.block,
              resale: props.resale,
              area: props.area,
              storey: props.storey,
              type: props.type,
              psf: parseInt(psf),
            },
          },
        ],
      }),
    });
    const jsonData = await response.json();
    console.log(jsonData);
    fetchOfferList();

    // const listData = jsonData.records.map((data) => ({
    //   ...data.fields,
    //   id: data.fields.id,
    // }));

    // setList(listData);
  }

  async function editOffer(props) {
    const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
    const BASE_URL = "https://api.airtable.com/v0/appufJw7hv6aH44fQ";
    const RECORDS = props.id;
    const psf = parseFloat(props.resale) / parseFloat(props.area) / 10.764;
    console.log(psf);

    const response = await fetch(`${BASE_URL}/offer/${RECORDS}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          street: props.street,
          month: new Date().toISOString().slice(0, 7),
          block: props.block,
          resale: props.resale,
          area: props.area,
          storey: props.storey,
          type: props.type,
          psf: parseInt(psf),
        },
      }),
    });
    const jsonData = await response.json();
    console.log(jsonData);
    fetchOfferList();

    // const listData = jsonData.records.map((data) => ({
    //   ...data.fields,
    //   id: data.fields.id,
    // }));

    // setList(listData);
  }

  async function delOffer(props) {
    const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
    const BASE_URL = "https://api.airtable.com/v0/appufJw7hv6aH44fQ";
    const RECORDS = props.id;
    const response = await fetch(`${BASE_URL}/offer/?records[]=${RECORDS}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const jsonData = await response.json();
    console.log(jsonData);

    fetchOfferList();

    // const listData = jsonData.records.map((data) => ({
    //   ...data.fields,
    //   id: data.fields.id,
    // }));

    // setList(listData);
  }

  useEffect(() => {
    fetchResaleList();
    fetchOfferList();
  }, []);

  // Return a table with the respective record fields as columns
  return (
    <div className="container">
      <h1>{`My Resale List`}</h1>
      <OfferData
        offerList={offerList}
        addOffer={addOffer}
        editOffer={editOffer}
        delOffer={delOffer}
      />
      <div>
        <Button
          leftIcon={<PlusSquareIcon />}
          colorScheme="teal"
          variant="link"
          mb={"2rem"}
          style={{ cursor: "pointer" }}
          onClick={onOpen}
        >
          <Tooltip
            hasArrow
            label="Add Your Expected Price"
            bg="gray.300"
            color="black"
          >
            ADD HOUSE
          </Tooltip>
        </Button>
        <AddOfferModal isOpen={isOpen} onClose={onClose} addOffer={addOffer} />
      </div>

      <ResaleData resaleList={resaleList} delResale={delResale} />
    </div>
  );
}

export default ResaleList;
