import {useState} from 'react'
import {Card, Image} from 'react-bootstrap'

export default function Cards() {
  const [tabItem, setTabItem] = useState('confirmed')
  const [color, setColor] = useState('#9A0E31')
  const CardsData = () => (
    <>
      <Card
        className=" cardedC p-2 m-1 text-danger text-center"
        onClick={() => {
          setTabItem('confirmed')
          setColor('#9A0E31')
        }}
      >
        <h6>Confirmed</h6>
        <Image
          src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/Group_1_mj2csf.png"
          alt="confirmed"
          className="cardLogo m-1 mb-3"
        />
        {/* <h6>{confirmed || '0'}</h6> */}
      </Card>
      <Card
        className=" text-primary text-center cardedA p-2 m-1"
        onClick={() => {
          setTabItem('active')
          setColor('#0A4FA0')
        }}
      >
        <h6>Active</h6>
        <Image
          src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/protection_1_fpiq7a.png"
          alt="confirmed"
          className="cardLogo m-1 mb-3"
        />
        {/* <h6>{active || 0}</h6> */}
      </Card>{' '}
      <Card
        className=" text-success text-center cardedR p-2 m-1"
        onClick={() => {
          setTabItem('recovered')
          setColor('#216837')
        }}
      >
        <h6>Recovered</h6>
        <Image
          src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/recovered_1_ncpaeu.png"
          alt="confirmed"
          className="cardLogo m-1 mb-3"
        />
        {/* <h6>{recovered || 0}</h6> */}
      </Card>{' '}
      <Card
        className=" text-secondary text-center cardedD p-2 m-1"
        onClick={() => {
          setTabItem('deceased')
          setColor('#474C57')
        }}
      >
        <h6>Deceased</h6>
        <Image
          src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/Corona_Virus_Symptoms_Shortness_of_breath_c0kgnn.png"
          alt="confirmed"
          className="cardLogo m-1 mb-3"
        />
        {/* <h6>{deceased || 0}</h6> */}
      </Card>
    </>
  )
  return <>{CardsData()}</>
}
