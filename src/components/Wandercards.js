import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Buffer } from 'buffer';
import Place from './Place';

function Wandercards(props) {
  const { topic, place, experience, image, _id } = props.data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Convert Buffer data to Base64-encoded data URL
  const imageData = `data:image/jpeg;base64,${Buffer.from(image.data).toString('base64')}`;

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageData} />
        <Card.Body>
          <Card.Title>{place}: {topic}</Card.Title>
          <Card.Text>
            {trimString(experience)}
          </Card.Text>
          <Button variant="primary" onClick={toggleModal}>More about {place}</Button>
        </Card.Body>
      </Card>
      {isModalOpen && (
        <Place
          onHide={toggleModal}
          place={place}
          topic={topic}
          experience={experience}
          id={_id}
        />
      )}
    </>
  );
}

const trimString = (str) => {
  if (str.length <= 100) {
    return str;
  } else {
    return str.substring(0, 100) + "...";
  }
};

export default Wandercards;
