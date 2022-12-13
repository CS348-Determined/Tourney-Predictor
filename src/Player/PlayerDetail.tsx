import React, { useEffect, useState } from 'react';
import { Button } from '../../node_modules/@mui/material/index';
import { Link } from 'react-router-dom';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';

function PlayersSection() {
  return (
    <div className="App">
      <h1 className="text-2xl underline">
        Players
      </h1>
    </div>
  );
}

interface PlayerDetail {
    name: string
    team: string
    team_id: number
    league: string
    league_id: number
}

function PlayerDetail() {
  const [searchParams] = useSearchParams();
  const playerID = searchParams.get("playerId");
  const [player, setPlayer] = useState<PlayerDetail | null>();
  useEffect(() => {
    fetch("http://localhost:8000/getPlayer/"+playerID)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json);
                      setPlayer(json);
                  })
  },[]);

  if (!playerID) {
    return (
      <div>
        Missing teamId
      </div>
    );
  }

  if (player) {
    return(
       <div>
        <div>
          <h1 className="text-3xl font-bold">Name: {player.name}</h1>
          
          <h2 className="">Team: {player.team}</h2>
          <div>
            <Link
              to={{
                pathname: "/team",
                search: `?teamId=${player.team_id}`, 
              }}
            >
              Go to Team
            </Link>
          </div>

          <h3 className="">League: {player.league}</h3>
          <div>
            <Link
              to={{
                pathname: "/league",
                search: `?leagueId=${player.league_id}`, 
              }}
            >
              Go to League
            </Link>
          </div>
        </div>
      </div>
      
    );
  } else {
    return (
      <div>
        Loading Player
      </div>
    );
  }
};

export default PlayerDetail;