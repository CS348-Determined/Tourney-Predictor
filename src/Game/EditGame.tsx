import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField } from '../../node_modules/@mui/material/index';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';
import MockGame from './MockGame';

interface GameProps {
  gameId: String;
}

function PlayersSection() {
  return (
    <div className="App">
      <h1 className="text-2xl underline">
        Players
      </h1>
    </div>
  );
}

function UpdateGame(game: Game) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game)
};
fetch("http://localhost:8000/updateGame/"+game.game_id, requestOptions)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    })
}

const GameEdit: React.FC<GameProps> = props => {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");
  const [game, setGame] = useState<Game | null>();
  const [leagues, setLeagues] = useState<string[] | null>();
  useEffect(() => {
    // Load Game
    fetch("http://localhost:8000/game/"+gameId)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json[0]);
                      setGame(json[0]);
                  })
    setLeagues(['NFL', "NBA", "NCAA Mens Basketball"])
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
          <h1 className="text-3xl font-bold">Editing Game {game.game_id.toString()}</h1>

          <div>
          <TextField
            variant="outlined"
            margin="normal"
            name="Home Team"
            label="Home Team"
            id="Home Team"
            autoFocus
            value={game.home_team_id}
            onChange={(event: { target: { value: any; }; }) => {
              setGame({
                ...game,
                home_team_id: event.target.value
              })
            }} 
          />
        </div>

        <div>
          <TextField
            variant="outlined"
            margin="normal"
            name="Away Team"
            label="Away Team"
            id="Away Team"
            autoFocus
            value={game.away_team_id}
            onChange={(event: { target: { value: any; }; }) => {
              setGame({
                ...game,
                away_team_id: event.target.value
              })
            }} 
          />
        </div>
          
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              name="Winner"
              label="Winner"
              id="Winner"
              autoFocus
              value={game.winner}
              onChange={(event: { target: { value: any; }; }) => {
                setGame({
                  ...game,
                  winner: event.target.value
                })
              }} 
            />
          </div>
          
        </div>

        <div>
          <Button variant="contained" onClick={() => { UpdateGame(game) }}>Submit Edits</Button>
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

export default GameEdit;