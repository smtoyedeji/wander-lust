import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { WanderContext } from '../WanderContext'

function Place() {

  const { data } = useContext(WanderContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const placeData = data.filter(card => card._id === id )


  // delete functionality
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://wanderlust-production.up.railway.app/api/v1/wanderlust/${id}`)
      if (response.status === 200) {
        console.log(response.data)
        navigate('/')
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="place-container">
      <h1>{placeData[0].place}: {placeData[0].topic}</h1>
      <Image src={placeData[0].image} fluid />
      <p>{placeData[0].experience}</p>
      <Button variant="primary">Edit</Button>
      <Button variant="danger" className="m-2" onClick={handleDelete}>Delete</Button>
    </div>
  );
}

export default Place;
