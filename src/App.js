import './App.css';
import './input.css';
import LeagueDetail from './League/LeagueDetail';
import AddBracket from './Bracket/AddBracket';
import BracketDetail from './Bracket/BracketDetail';
import BracketDetailEdit from './Bracket/BracketDetailEdit';
import TeamDetail from './Team/TeamDetail';
import TeamEdit from './Team/TeamEdit';
import AddTeam from './Team/AddTeam';
import AddGame from './Game/AddGame';
import EditGame from './Game/EditGame';
import GameDetail from './Game/GameDetail';
import Home from './Home'
import AddPosition from './Position/AddPosition'
import PositionEdit from './Position/PositionEdit'
import PositionDetail from './Position/PositionDetail'


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
          <Route path={"/addBracket"} element={ <AddBracket /> } />
          <Route path={"/bracket"} element={ <BracketDetail /> } />
          <Route path={"/bracketEdit"} element={ <BracketDetailEdit /> } />
          <Route path={"/league"} element={ <LeagueDetail /> } />
          <Route path={"/teamEdit"} element={ <TeamEdit /> } />
          <Route path={"/addGame"} element={ <AddGame /> } />
          <Route path={"/editGame"} element={ <EditGame /> } />
          <Route path={"/game"} element={ <GameDetail /> } />
          <Route path={"/addPosition"} element={ <AddPosition/> } />
          <Route path={"/positionEdit"} element={ <PositionEdit/> } />
          <Route path={"/positionDetail"} element={ <PositionDetail/> } />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
