import {Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import StateDetailedView from './Pages/StateDetailedView/StateDetailedView'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:id" component={StateDetailedView} />
    </Switch>
    <Footer />
  </>
)
export default App
