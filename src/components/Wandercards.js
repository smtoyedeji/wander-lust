import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { WanderContext } from "../WanderContext";

function Wandercards() {
  const { data } = useContext(WanderContext);


  
  let cardElements = []

  if (data && data.length) {
    cardElements = data.map((card) => (
      <Card key={card._id} className="w-100 m-2">
        <Card.Img
          src={card.image}
          variant="top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>
            {card.place}: {card.topic}
          </Card.Title>
          <Card.Text>{trimString(card.experience)}</Card.Text>
          <Link to={`/place/${card._id}`}>
            <Button variant="primary">More about {card.place}</Button>
          </Link>
        </Card.Body>
      </Card>
    ))
  }

  // const handleClick = () => {
  //   // setData(_id);
  //   console.log(data)
  // };

  
 


  if (data === null || typeof data === "undefined") {
    // Render a loading state or placeholder content
    return <div>Loading...</div>;
  }

  return <div className="card-container">{cardElements}</div>;
}




const trimString = (str) => {
  if (str.length <= 100) {
    return str;
  } else {
    return str.substring(0, 100) + "...";
  }
};






export default Wandercards;
