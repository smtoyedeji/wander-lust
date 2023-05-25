import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Wandercards from "./components/Wandercards";
import Write from "./components/Write";
import Place from "./components/Place";
import Edit from "./components/Edit";
import { WanderContext } from "./WanderContext";
import { Buffer } from "buffer";

function App() {
  const { data, setData } = useContext(WanderContext);
  console.log(data);

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        "https://wanderlust-production.up.railway.app/api/v1/wanderlust"
      );
      const convertedData = response.data.wanderlusts.map((card) => {
        return {
          ...card,
          image: convertImageData(card.image.data.data),
        };
      });

      setData(convertedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // update the useContext data
  useEffect(() => {
    setData(data);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Wandercards />} />
            <Route path="/write" element={<Write />} />
            <Route path="/place/:id" element={<Place />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// convert image buffer data to base64
const convertImageData = (imageData) => {
  return `data:image/jpeg;base64,${Buffer.from(imageData).toString("base64")}`;
};

export default App;
