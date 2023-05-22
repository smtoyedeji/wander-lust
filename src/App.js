import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Wandercards from './components/Wandercards'
import Write from './components/Write'



function App() {
  
  const [cards, setCards] = useState([])

  useEffect(() => {
    fetchCards()
  }, [])
  
  const fetchCards = async () => {
    try {
      const response = await axios.get('https://wanderlust-production.up.railway.app/api/v1/wanderlust');
      // console.log(response.data.wanderlusts)
      setCards(response.data.wanderlusts);
    } catch (err) {
      console.log(err)
    }
  }

  const cardElements = cards.map(data => {
    return (
      <Wandercards key={data._id} data={data}/>
    )
  })
    
  
  return (
    <div className="App">
      <Navbar />
      <div className="card-container">
        { cardElements }
        {/* <Write /> */}
        
      </div>
    </div>
  );
}

export default App;
