import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import Hero from "./component/Hero";
import Browse from "./component/Browse";
import Arrived from "./component/Arrived";
import Clients from "./component/Clients";
import ASideMenu from "./component/ASideMenu";
import Footer from "./component/Footer";
import Offline from "./component/Offline";
import Splash from "./pages/Splash";

function App() {
  const [items, setItems] = useState([]);
  const [offLineStatus, setOffLineStatus] = useState(!navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);

  function handleOffLineStatus() {
    setOffLineStatus(!navigator.onLine);
  }

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

      const script = document.createElement("script");
      script.src = "/carousel.js";
      script.async = false;
      document.body.appendChild(script);
    })();

    handleOffLineStatus();
    window.addEventListener('online', handleOffLineStatus);
    window.addEventListener('offline', handleOffLineStatus);

    setTimeout (function() {
      setIsLoading(false);
    }, 1500);

    return function () {
      window.removeEventListener('online', handleOffLineStatus);
      window.removeEventListener('offline', handleOffLineStatus);
    }
  }, [offLineStatus]);
  return (
    <>
    {isLoading === true ? <Splash /> :
    (
      <>
      { offLineStatus && <Offline /> }
      <Header />
      <Hero />
      <Browse />
      <Arrived items={items} />
      <Clients />
      <ASideMenu />
      <Footer />
      </>
    ) 
    }
    
    </>
  );
}

export default App;
