import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ResaleData from "../ResaleData";
import { useEffect, useState } from "react";

function ResaleList() {
  const [resaleList, setList] = useState([]);

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

    setList(listData);
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

  useEffect(() => {
    fetchResaleList();
  }, []);

  // Return a table with the respective record fields as columns
  return (
    <div className="container">
      <h1>{`My Resale List`}</h1>
      <ResaleData resaleList={resaleList} delResale={delResale} />
    </div>
  );
}

export default ResaleList;
