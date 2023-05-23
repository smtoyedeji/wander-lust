import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'

function Place(props) {
  const { id, onHide, place, topic, experience } = props

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://wanderlust-production.up.railway.app/api/v1/wanderlust/${id}`)
      if (response.status === 200) {
        console.log(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  };
  

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{place}: {topic}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{experience}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary">Edit</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Place;
