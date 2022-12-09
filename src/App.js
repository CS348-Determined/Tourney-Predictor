import './App.css';
import './input.css';
import LeagueDetail from './League/LeagueDetail';
import BracketDetail from './Bracket/BracketDetail';
import BracketDetailEdit from './Bracket/BracketDetailEdit';
import TeamDetail from './Team/TeamDetail';
import TeamEdit from './Team/TeamEdit';
import AddTeam from './Team/AddTeam';
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
          <Route path={"/addTeam"} element={ <AddTeam /> } />
          <Route path={"/team"} element={ <TeamDetail /> } />
          <Route path={"/bracket"} element={ <BracketDetail /> } />
          <Route path={"/bracketEdit"} element={ <BracketDetailEdit /> } />
          <Route path={"/league"} element={ <LeagueDetail /> } />
          <Route path={"/teamEdit"} element={ <TeamEdit /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
