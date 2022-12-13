import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField } from '../../node_modules/@mui/material/index';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';


interface PlayerProps {
    playerID: String
}

interface PlayerUpdate {
    new_name: string
    new_team_id: Number
    player_id: Number
}

function UpdatePlayer(player: PlayerUpdate) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player)
};
fetch("http://localhost:8000/updatePlayer/", requestOptions)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    })
}

const PlayerEdit: React.FC<PlayerProps> = props => {
  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("playerId");
  const [player, setPlayer] = useState<Player | null>();
  const [teams, setTeams] = useState<Team[] | null>();
  const [newPlayer, setNewPlayer] = useState<PlayerUpdate | null>();
    function GetTeams() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }
        fetch("http://localhost:8000/teams", requestOptions)
            .then((res) => res.json())
            .then((json) => {
                setTeams(json)
            })
        }
  useEffect(() => {
    // Load Player
    fetch("http://localhost:8000/getPlayer/"+playerId)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json);
                      setPlayer(json);
                  })
    GetTeams()
    setNewPlayer({
        ...newPlayer,   
        player_id: parseInt(playerId)})

  },[]);

  if (!playerId) {
    return (
      <div>
        Missing playerId
      </div>
    );
  }

  if (player) {
    return(
       <div>
        <div>
          <h1 className="text-3xl font-bold">Editing {player.name}</h1>
          <TextField
            variant="outlined"
            margin="normal"
            name="Name"
            label="Name"
            id="Name"
            autoFocus
            onChange={(event: { target: { value: any; }; }) => {
              setNewPlayer({
                ...newPlayer,
                new_name: event.target.value
              })
            }} 
          />
          
         <div>
          <Select labelId="Team" id="Team"
            onChange={(event: { target: { value: any; }; }) => {
              setNewPlayer({
                ...newPlayer,
                new_team_id: event.target.value.team_id
              })
            }} 
            >
            {teams.map(option => {
              return (
                <MenuItem value={option}>{option.name}</MenuItem>
              )
            })}
          </Select>

        </div>
          <Button variant="contained" onClick={() => { UpdatePlayer(newPlayer) }}>Submit Edits</Button>
        </div>
        
      </div>
      
    );
  } else {
    return (
      <div>
        Loading Team
      </div>
    );
  }
};

export default PlayerEdit;