import {useSelector} from 'react-redux'
import './Chart.css'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'

export default function Chart(props) {
  const {tabItem, color} = props
  const stateInfo = useSelector(state => state.stateInfo)
  const {stateData} = stateInfo
  const barData = stateData.slice(0, 10)
  return (
    <>
      {/* <div className="Chart m-1 mt-4 align-self-center ">
        <ResponsiveContainer height={250} width="95%">
          <BarChart data={barData}>
            <XAxis dataKey="Dated" />
            <Bar
              dataKey={`${tabItem || 0}`}
              type="monotone"
              fill={`${color}`}
              label={{position: 'top', color: 'white'}}
              activeDot={{r: 8}}
            />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
      <div
        style={{backgroundColor: '#331427'}}
        className="Chart m-1 mt-4 align-self-center"
      >
        <ResponsiveContainer height={270} width="95%">
          <LineChart data={stateData}>
            <XAxis dataKey="Dated" />
            <YAxis />
            <Line
              dataKey="confirmed"
              type="monotone"
              className="text-white"
              fill="#ff073a"
              activeDot={{r: 8}}
            />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{backgroundColor: '#132240'}}
        className="Chart m-1 mt-4  align-self-center"
      >
        <ResponsiveContainer height={270} width="95%">
          <LineChart data={stateData}>
            <XAxis dataKey="Dated" />
            <YAxis />
            <Line
              dataKey="active"
              type="monotone"
              stoke="#884d"
              fill="blue"
              activeDot={{r: 8}}
            />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{backgroundColor: '#182829'}}
        className="Chart m-1 mt-4 align-self-center"
      >
        <ResponsiveContainer height={270} width="95%">
          <LineChart data={stateData}>
            <XAxis dataKey="Dated" />
            <YAxis />
            <Line
              dataKey="recovered"
              type="monotone"
              fill="green"
              activeDot={{r: 8}}
            />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{backgroundColor: '#1c1c2b'}}
        className="Chart m-1 mt-4 align-self-center"
      >
        <ResponsiveContainer height={270} width="95%">
          <LineChart data={stateData}>
            <XAxis dataKey="Dated" />
            <YAxis />
            <Line
              dataKey="deceased"
              type="monotone"
              stoke="#884d"
              fill="gray"
              activeDot={{r: 8}}
            />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{backgroundColor: '#230f41'}}
        className="Chart m-1 mt-4 align-self-center"
      >
        <ResponsiveContainer height={270} width="95%">
          <LineChart data={stateData}>
            <XAxis dataKey="Dated" />
            <YAxis />
            <Line
              dataKey="tested"
              type="monotone"
              stoke="#884d"
              fill="#6c757d"
              activeDot={{r: 8}}
            />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
