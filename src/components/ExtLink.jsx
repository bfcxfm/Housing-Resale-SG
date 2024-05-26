import {
  PlusSquareIcon,
  AddIcon,
  WarningIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";

function ExtLink({ town, street }) {
  const dictionary = {
    ST: "STREET",
    "ST.": "SAINT",
    DR: "DRIVE",
    RD: "ROAD",
    AVE: "AVENUE",
    NTH: "NORTH",
    STH: "SOUTH",
    CTRL: "CENTRAL",
    CRES: "CRESCENT",
    PL: "PLACE",
    "C'WEALTH": "COMMONWEALTH",
    CL: "CLOSE",
    PK: "PARK",
    JLN: "JALAN",
    BT: "BUKIT",
    KG: "KAMPONG",
    LOR: "LORONG",
    TER: "TERRACE",
    MKT: "MARKET",
    UPP: "UPPER",
    GDNS: "GARDENS",
    HTS: "HEIGHTS",
    TG: "TANJONG",
  };

  const replaceTown = town.toLowerCase().replace(/[\/\s]+/g, "-");

  const address = street.toUpperCase(); // Convert to uppercase for consistent comparison
  let replacedAddress = address;

  // Replace words in the address using the inverted dictionary
  Object.entries(dictionary).forEach(([abbreviation, fullForm]) => {
    // Replace whole words with the dictionary values
    replacedAddress = replacedAddress.replace(
      new RegExp(`\\b${abbreviation}\\b`, "g"),
      fullForm
    );
  });

  const newStreet = replacedAddress.toLowerCase().replace(/\s+/g, "-");

  const linkURL = `https://www.propertyguru.com.sg/singapore-property-listing/hdb/${replaceTown}/${newStreet}`;

  return (
    <Tooltip hasArrow label="open in PropertyGuru" bg="gray.300" color="black">
      <a href={linkURL} target="_blank" rel="noopener noreferrer">
        <ExternalLinkIcon mb="4px" />
      </a>
    </Tooltip>
  );
}

export default ExtLink;
