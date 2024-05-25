import { createContext, useState, useEffect } from "react";

export const SharedDataContext = createContext();

export const SharedDataProvider = ({ children }) => {
  const [resaleList, setResaleList] = useState([]);
  const [addList, setAddList] = useState([]);
  const [offerList, setOfferList] = useState([]);

  useEffect(() => {
    fetchResaleList();
    fetchOfferList();
  }, []);

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
    const addListId = jsonData.records.map((data) => data.fields._id);
    // console.log(addListId);

    setResaleList(listData);
    setAddList(addListId);
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
    // console.log(listData);

    setOfferList(listData);
  }

  return (
    <SharedDataContext.Provider
      value={{
        resaleList,
        offerList,
        addList,
        fetchResaleList,
        fetchOfferList,
      }}
    >
      {children}
    </SharedDataContext.Provider>
  );
};
