function ReplaceWords(selectedAddress) {
  const dictionary = {
    STREET: "ST",
    SAINT: "ST.",
    DRIVE: "DR",
    ROAD: "RD",
    AVENUE: "AVE",
    NORTH: "NTH",
    SOUTH: "STH",
    CENTRAL: "CTRL",
    CRESCENT: "CRES",
    PLACE: "PL",
    COMMONWEALTH: "C'WEALTH",
    CLOSE: "CL",
    PARK: "PK",
    JALAN: "JLN",
    BUKIT: "BT",
    KAMPONG: "KG",
    LORONG: "LOR",
    TERRACE: "TER",
    MARKET: "MKT",
    UPPER: "UPP",
    GARDENS: "GDNS",
    HEIGHTS: "HTS",
    TANJONG: "TG",
  };

  const address = selectedAddress.ROAD_NAME.toUpperCase(); // Convert to uppercase for consistent comparison
  let replacedAddress = address;

  // Replace words in the address using the dictionary
  Object.entries(dictionary).forEach(([word, replacement]) => {
    // Replace whole words with the dictionary values
    replacedAddress = replacedAddress.replace(
      new RegExp(`\\b${word}\\b`, "g"),
      replacement
    );
  });

  return { ...selectedAddress, ROAD_NAME: replacedAddress };
}

export default ReplaceWords;
