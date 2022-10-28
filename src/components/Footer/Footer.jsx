import {BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs'
import './Footer.css'

export default function Footer() {
  return (
    <div className="footerContainer pt-5 pb-5">
      <h1 className="footerHeader">
        COVID19<span className="text-primary">INDIA</span>
      </h1>
      <p className="footerText">
        We stand with everyone fighting on the frontline
      </p>
      <div className="d-flex align-items-center text-white justify-content-center">
        <BsGithub className="m-2" style={{fontSize: '25px'}} />
        <BsInstagram className="m-2" style={{fontSize: '25px'}} />
        <BsTwitter className="m-2" style={{fontSize: '25px'}} />
      </div>
    </div>
  )
}
