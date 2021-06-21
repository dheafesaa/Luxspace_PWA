import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import Hero from "./component/Hero";
import Browse from "./component/Browse";
import Arrived from "./component/Arrived";
import Clients from "./component/Clients";
import ASideMenu from "./component/ASideMenu";
import Footer from "./component/Footer";

function App() {
  const [items, setItems] = useState([]);

  useEffect(function () {
    (async function () {
      const response = await fetch(
        'https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc',
        {
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
            "x-api-key": process.env.REACT_APP_APIKEY,
          },
        }
      );
      const { nodes } = await response.json();
      setItems(nodes);
    })();
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <Browse />
      <Arrived items={items} />
      <Clients />
      <ASideMenu />
      <Footer />
    </>
  );
}

export default App;
