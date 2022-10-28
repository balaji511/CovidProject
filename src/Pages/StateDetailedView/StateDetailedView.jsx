import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {useEffect, useState} from 'react'
import {BsGraphUp, BsGraphDown} from 'react-icons/bs'
import './StateDetailedView.css'
import {Card, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getStateData} from '../../Store/StateSlice'
import {getCovidData, covidActions} from '../../Store/covidSlice'
import '../Home/Home.css'
import Chart from '../../components/Charts/Chart'

export default function StateDetailedView(props) {
  const [tabItem, setTabItem] = useState('confirmed')
  const [color, setColor] = useState('#9A0E31')
  const {match} = props
  const {params} = match
  const {id} = params
  const dispatch = useDispatch()
  const covidDataInfo = useSelector(state => state.covidDataInfo)
  const stateInfo = useSelector(state => state.stateInfo)

  useEffect(() => {
    dispatch(getCovidData())
    dispatch(getStateData(id))
    dispatch(covidActions.getStateObj(id))
  }, [dispatch, id])

  const {stateObject} = covidDataInfo
  const {isLoading, apiRejected} = stateInfo
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
        <h6 className="d-flex align-items-center justify-content-center">
          <BsGraphDown className="m-1" /> Today
        </h6>
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
        <h6 className="d-flex align-items-center justify-content-center">
          <BsGraphUp className="m-1" /> Today
        </h6>
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
        <h6 className="d-flex align-items-center justify-content-center">
          <BsGraphUp className="m-1" /> Today
        </h6>
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
        <h6 className="d-flex align-items-center justify-content-center">
          <BsGraphDown className="m-1" /> Today
        </h6>
        {/* <h6>{deceased || 0}</h6> */}
      </Card>
    </>
  )
  const sortArray = () => {
    dispatch(covidActions.sortArray())
  }
  //
  const LoadingView = () => (
    <Loader
      className="align-self-center loader"
      type="TailSpin"
      color="#00BFFF"
      height={50}
      width={50}
    />
  )
  const rejectedPage = () => <h1>hi</h1>
  const renderStatePage = () => (
    <>
      {apiRejected ? (
        rejectedPage()
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center text-white p-2 p-md-4 pt-3">
            <div className="d-flex flex-column text-white align-items-center">
              <h4 className="headName p-1">
                {stateObject?.stateName || `state name-${id}`}
              </h4>
              <p style={{fontSize: '15px'}}>
                Last updated on -{' '}
                {stateObject?.lastUpdated.slice(0, 10) || 'Today'}
              </p>
            </div>
            <div className="d-flex flex-column">
              <h6>Tested</h6>
              <p>{stateObject?.tested || '258464'}</p>
            </div>
          </div>
          <div className="d-flex cardsContainerState">{CardsData()}</div>{' '}
          <Chart tabItem={tabItem} color={color} />
        </>
      )}{' '}
    </>
  )

  return (
    <div className="stateContainer d-flex p-4">
      {isLoading ? LoadingView() : renderStatePage()}
    </div>
  )
}
