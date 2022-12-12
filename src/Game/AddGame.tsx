import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField } from '../../node_modules/@mui/material/index';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';
import MockGame from './MockGame';

interface GameProps {
  gameId: String;
}

function PushGame(game: Game) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game)
};
fetch("http://localhost:8000/addGame/", requestOptions)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    })
}

const AddGame: React.FC<GameProps> = props => {
  const [game, setGame] = useState<Game | null>();
  const [leagues, setLeagues] = useState<string[] | null>();
  useEffect(() => {
    // Load Team
    setGame(MockGame);
    setLeagues(['NFL', "NBA", "NCAA Mens Basketball"]) //not going to pretend to understand react, I don't use this but it doesn't work without it
  },[]);

  if (game) {
    return(
       <div>
        <div>
          
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
          <Button variant="contained" onClick={() => { PushGame(game) }}>Submit Edits</Button>
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

export default AddGame;