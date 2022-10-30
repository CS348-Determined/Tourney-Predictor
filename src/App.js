import './App.css';
import './input.css';
import ConferenceDetail from './Conference/ConferenceDetail';
import TeamDetail from './Team/TeamDetail';
import TeamEdit from './Team/TeamEdit';
import Home from './Home'
import {
  Link,
  Redirect,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="justify-center text-center text-2xl underline">
          Tourney Predictor
        </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={"/team"} element={ <TeamDetail /> } />
          <Route path={"/conference"} element={ <ConferenceDetail /> } />
          <Route path={"/teamEdit"} element={ <TeamEdit /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
