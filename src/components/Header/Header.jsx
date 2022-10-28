import {Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {TiThMenuOutline} from 'react-icons/ti'
import './Header.css'

export default function Header() {
  return (
    <>
      <Nav
        className="d-flex justify-content-between align-items-center navBar"
        style={{
          backgroundColor: '#1E1E30',
          fontFamily: 'Roboto',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <Nav.Item className="navHeader text-white p-1">
          <Link to="/" className="Link text-white">
            COVID19<span className="text-primary">INDIA</span>
          </Link>
        </Nav.Item>
        <div className="d-none d-md-flex align-items-center">
          <Link to="/" className="Link">
            <Nav.Item className="text-white p-1">Home</Nav.Item>
          </Link>
          <Link to="/about" className="Link">
            <Nav.Item className="text-white p-2">About</Nav.Item>
          </Link>
        </div>
        <Nav.Item className="text-white d-md-none d-flex m-3 p-1 navMenu">
          <TiThMenuOutline />
        </Nav.Item>
      </Nav>
    </>
  )
}
