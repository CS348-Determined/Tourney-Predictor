import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField } from '../../node_modules/@mui/material/index';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';
import MockTeam from './MockTeam';

interface TeamProps {
  teamId: String;
}

function PushTeam(team: Team) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team)
  };
  fetch("http://localhost:8000/addTeam/", requestOptions)
      .then((res) => res.json())
      .then((json) => {
          console.log(json);
    })
}

const AddTeam: React.FC<TeamProps> = props => {
  const [team, setTeam] = useState<Team | null>();
  const [leagues, setLeagues] = useState<League[] | null>();
  const [selectedLeague, setSelectedLeague] = useState<League | null>();
  useEffect(() => {
    // Load Team
    setTeam(MockTeam);

    fetch("http://localhost:8000/allLeagues")
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json);
                      setLeagues(json);
                  })

    //setLeagues(['NFL', "NBA", "NCAA Mens Basketball"])
  },[]);

  if (team && leagues) {
    return(
       <div>
        <div>
          <h1 className="text-3xl font-bold">Creating {team.name}</h1>
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

          <Select labelId="League" id="League" value={selectedLeague}
            onChange={(event: { target: { value: any; }; }) => {
              setSelectedLeague(event.target.value)
              setTeam({
                ...team,
                league_id: event.target.value.league_id
              })
            }} 
            >
            {leagues.map(option => {
              return (
                <MenuItem value={option}>{option.name}</MenuItem>
              )
            })}
          </Select>
        </div>
        {/*
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
          */}
          
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
          <Button variant="contained" onClick={() => { PushTeam(team) }}>Submit Edits</Button>
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

export default AddTeam;