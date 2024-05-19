import { useEffect, useState } from "react";

function ListCheck({ listId }) {
  const [resaleId, setList] = useState([]);

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
      ...data.fields.id,
    }));

    setList(listData);
    console.log(data);
  }

  useEffect(() => {
    fetchResaleList();
  }, []);

  if (resaleId.includes(listId)) {
    return <Switch id="fav" />;
  } else {
    return null;
  }
}

export default ListCheck;
