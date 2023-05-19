import Nav from 'react-bootstrap/Nav';
import { BsPencilSquare, BsTwitter, BsInstagram } from 'react-icons/bs'

function Navbar() {
  return (
    <div className="navbar">
        <h2><a href="/">Wanderlust</a></h2>        
        <Nav
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            className="justify-content-end"
        >
            <Nav.Item>
              <Nav.Link href="/home">
                <BsPencilSquare /> Write
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">
                <BsTwitter />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2">
              <BsInstagram />
              </Nav.Link>
            </Nav.Item>
        </Nav>
    </div>
    
  );
}

export default Navbar;