import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Wandercards from './components/Wandercards';
import Write from './components/Write';

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('https://wanderlust-production.up.railway.app/api/v1/wanderlust');
      setCards(response.data.wanderlusts);
    } catch (err) {
      console.log(err);
    }
  };

  const cardElements = cards.map((data) => (
    <Wandercards key={data._id} data={data} />
  ));

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={cardElements} />
            <Route path="/write" element={<Write />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
