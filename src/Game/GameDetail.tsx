import React, { useEffect, useState } from 'react';
import MockGame from './MockGame';
import { Button } from '../../node_modules/@mui/material/index';
import { Link } from 'react-router-dom';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';

type GameProps = {
  gameId: string;
};

function GameDetail() {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");
  const [game, setGame] = useState<Game | null>();
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    // Load Game
    console.log("Loading Game" + gameId)
    fetch("http://localhost:8000/game/"+gameId)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json[0]);
                      setGame(json[0]);
                  })
    //setGame(MockGame);

  },[]);

  if (!gameId) {
    return (
      <div>
        Missing gameId
      </div>
    );
  }

  if (game) {
    return(
       <div>
        <div>
          <h1 className="text-3xl font-bold">Team: {game.home_team_id.toString()} vs Team: {game.away_team_id.toString()}</h1>
          <div>
            <Link
              to={{
                pathname: "/team",
                search: `?teamId=${game.home_team_id}`, 
              }}
            >
              Go to Home Team: {game.home_team_id.toString()}
            </Link>
          </div>

          <div>
            <Link
              to={{
                pathname: "/team",
                search: `?teamId=${game.away_team_id}`, 
              }}
            >
              Go to Away Team: {game.away_team_id.toString()}
            </Link>
          </div>
          
          <h2 className="">Winner: Team {game.winner.toString()}</h2>
        </div>
      </div>
      
    );
  } else {
    return (
      <div>
        Loading Game
      </div>
    );
  }
};

export default GameDetail;