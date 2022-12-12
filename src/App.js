import './App.css';
import './input.css';
import LeagueDetail from './League/LeagueDetail';
import TeamDetail from './Team/TeamDetail';
import TeamEdit from './Team/TeamEdit';
import AddTeam from './Team/AddTeam';
import AddGame from './Game/AddGame';
import EditGame from './Game/EditGame';
import GameDetail from './Game/GameDetail';
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
          <Route path={"/league"} element={ <LeagueDetail /> } />
          <Route path={"/teamEdit"} element={ <TeamEdit /> } />
          <Route path={"/addGame"} element={ <AddGame /> } />
          <Route path={"/editGame"} element={ <EditGame /> } />
          <Route path={"/game"} element={ <GameDetail /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
