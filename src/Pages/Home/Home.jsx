import {useState, useEffect} from 'react'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {FaSortAmountDownAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {BsFillArrowRightSquareFill} from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import {Table, Card, Image} from 'react-bootstrap'
import './Home.css'
import {getCovidData, covidActions} from '../../Store/covidSlice'

export default function Home(props) {
  const {history} = props
  const [stateName, setStateName] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCovidData())
  }, [stateName, dispatch])
  //
  //
  const covidDataInfo = useSelector(state => state.covidDataInfo)
  const {covidData, nationalCases, isLoading, includingList} = covidDataInfo
  const {confirmed, deceased, active, recovered} = nationalCases
  //

  //
  const directToState = code => {
    history.push(`/state/${code}`)
  }

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
  //
  const CardsData = () => (
    <>
      <div className="cardsContainer m-1">
        <Card className="bg-transparent text-danger text-center">
          <h6>Confirmed</h6>
          <Image
            src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/Group_1_mj2csf.png"
            alt="confirmed"
            className="cardLogo m-1 mb-3"
          />
          <h6>{confirmed || '0'}</h6>
        </Card>
        <Card className="bg-transparent text-primary text-center">
          <h6>Active</h6>
          <Image
            src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/protection_1_fpiq7a.png"
            alt="confirmed"
            className="cardLogo m-1 mb-3"
          />
          <h6>{active || 0}</h6>
        </Card>{' '}
        <Card className="bg-transparent text-success text-center">
          <h6>Recovered</h6>
          <Image
            src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/recovered_1_ncpaeu.png"
            alt="confirmed"
            className="cardLogo m-1 mb-3"
          />
          <h6>{recovered || 0}</h6>
        </Card>{' '}
        <Card className="bg-transparent text-secondary text-center">
          <h6>Deceased</h6>
          <Image
            src="https://res.cloudinary.com/dllshtsed/image/upload/v1659143025/Corona_Virus_Symptoms_Shortness_of_breath_c0kgnn.png"
            alt="confirmed"
            className="cardLogo m-1 mb-3"
          />
          <h6>{deceased || 0}</h6>
        </Card>{' '}
      </div>
    </>
  )
  //
  const covidDataStatus = () => (
    <>
      <Table className=" algin-self-center text-white p-5" hover borderless>
        <thead className="heading">
          <tr>
            <th className="text-white">
              States{' '}
              <FaSortAmountDownAlt onClick={sortArray} className="text-white" />
            </th>
            <th>Confirmed</th>
            <th>Active</th>
            <th className="d-none d-md-flex">Deceased</th>
            <th>Recovered</th>
            <th className="d-md-block d-none">Population</th>
          </tr>
        </thead>
        <tbody>
          {covidData.map(each => (
            <tr
              key={each.stateCode}
              onClick={() => directToState(each.stateCode)}
            >
              <td
                style={{
                  fontSize: each.stateName.length > 14 && '12px',
                }}
              >
                {each.stateName}
              </td>
              <td className="text-danger">{each.confirmed}</td>
              <td className="text-primary">{each.active}</td>
              <td className="d-none d-md-flex text-secondary">
                {each.deceased}
              </td>
              <td className="text-success">{each.recovered}</td>
              <td className="d-none d-md-block text-secondary">
                {each.population}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
  //
  const searchChanged = e => {
    setStateName(e.target.value)
    dispatch(covidActions.searchEvent(e.target.value))
  }

  const renderHomePage = () => (
    <>
      {CardsData()}
      <div
        className="align-self-center mt-4 tableData"
        style={{
          fontFamily: 'Roboto',
          border: '2px solid white',
          borderRadius: '5px',
        }}
      >
        {covidDataStatus()}
      </div>
    </>
  )

  return (
    <>
      <div className="homeContainer">
        <div className="inputContainer mt-md-5 mt-4 d-flex  align-items-center">
          <BiSearch
            style={{color: 'white', margin: '10px', fontSize: '23px'}}
          />
          <input
            type="search"
            value={stateName}
            onChange={searchChanged}
            placeholder="Enter the State"
            className="inputType text-white"
          />
        </div>
        <ul
          className="includingList mt-1 p-1"
          style={{borderRadius: '0px', fontFamily: 'Roboto'}}
        >
          {stateName !== '' &&
            includingList.map(each => (
              <Link
                to={`state/${each.stateCode}`}
                key={each.stateCode}
                className="Link "
              >
                <li
                  style={{border: '1px solid white', borderRadius: '5px'}}
                  className="text-white p-1 m-1  d-flex  justify-content-between align-items-center"
                >
                  <p className="pt-2 ">{each.stateName}</p>
                  <p
                    style={{
                      background: 'rgba(28, 212, 212, 0.16)',
                      borderRadius: '4px',
                      fontSize: '12px',
                      padding: '2px',
                      marginTop: '10px',
                    }}
                  >
                    {each.stateCode}
                    <BsFillArrowRightSquareFill className="text-warning m-1 " />
                  </p>
                </li>
              </Link>
            ))}
        </ul>

        {isLoading ? LoadingView() : renderHomePage()}
      </div>
    </>
  )
}
