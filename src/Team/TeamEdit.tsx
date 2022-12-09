import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField } from '../../node_modules/@mui/material/index';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';
import MockTeam from './MockTeam';

interface TeamProps {
  teamId: String;
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

function UpdateTeam(team: Team) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team)
  };
  fetch("http://localhost:8000/updateTeam/"+team.team_id, requestOptions)
    .then((res) => res.json())
    
    .then((json) => {
        console.log(json);
  })
}

const TeamEdit: React.FC<TeamProps> = props => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamId");
  const [team, setTeam] = useState<Team | null>();
  const [leagues, setLeagues] = useState<string[] | null>();
  useEffect(() => {
    // Load Team
    fetch("http://localhost:8000/team/"+teamId)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json[0]);
                      setTeam(json[0]);
                  })
    setLeagues(['NFL', "NBA", "NCAA Mens Basketball"])
  },[]);

  if (!teamId) {
    return (
      <div>
        Missing teamId
      </div>
    );
  }

  if (team) {
    return(
       <div>
        <div>
          <h1 className="text-3xl font-bold">Editing {team.name}</h1>
          <TextField
            variant="outlined"
            margin="normal"
            name="Name"
            label="Name"
            id="Name"
            autoFocus
            value={team.name}
            onChange={(event: { target: { value: any; }; }) => {
              setTeam({
                ...team,
                name: event.target.value
              })
            }} 
          />
          
         <div>
          <Select labelId="League" id="League" value={team.league_id}
            onChange={(event: { target: { value: any; }; }) => {
              setTeam({
                ...team,
                league_id: event.target.value
              })
            }} 
            >
            {leagues.map(option => {
              return (
                <MenuItem value={option}>{option}</MenuItem>
              )
            })}
          </Select>
        </div>

        <div>
          <TextField
            variant="outlined"
            margin="normal"
            name="League ID"
            label="League ID"
            id="League ID"
            autoFocus
            value={team.league_id}
            onChange={(event: { target: { value: any; }; }) => {
              setTeam({
                ...team,
                league_id: event.target.value
              })
            }} 
          />
        </div>
          
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              name="Record"
              label="Record"
              id="Record"
              autoFocus
              value={team.record}
              onChange={(event: { target: { value: any; }; }) => {
                setTeam({
                  ...team,
                  record: event.target.value
                })
              }} 
            />
          </div>
          
        </div>

        <div>
          <Button variant="contained" onClick={() => { UpdateTeam(team) }}>Submit Edits</Button>
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

export default TeamEdit;