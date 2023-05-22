import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Wandercards(props) {
  const { topic, place, experience } = props.data
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{place}: {topic}</Card.Title>
        <Card.Text>
          {trimString(experience)}
        </Card.Text>
        <Button variant="primary">More about {place}</Button>
      </Card.Body>
    </Card>
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