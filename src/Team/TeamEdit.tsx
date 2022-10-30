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
  // Send post request
  console.log("Updating Team"+team)
}

const TeamEdit: React.FC<TeamProps> = props => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamId");
  const [team, setTeam] = useState<Team | null>();
  const [conferences, setConferences] = useState<string[] | null>();
  useEffect(() => {
    // Load Team
    console.log("Loading Team")
    setTeam(MockTeam);
    setConferences(['NFL', "NBA", "NCAA Mens Basketball"])
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
          <h1 className="text-3xl font-bold">Editing {team.Name}</h1>
          <TextField
            variant="outlined"
            margin="normal"
            name="Name"
            label="Name"
            id="Name"
            autoFocus
            value={team.Name}
            onChange={(event: { target: { value: any; }; }) => {
              setTeam({
                ...team,
                Name: event.target.value
              })
            }} 
          />
          <h2 className="text-xl">Conference: {team.ConferenceName}</h2>
          <Select labelId="Conference" id="Conference" value={team.ConferenceName}
            onChange={(event: { target: { value: any; }; }) => {
              setTeam({
                ...team,
                ConferenceName: event.target.value
              })
            }} 
            >
            {conferences.map(option => {
              return (
                <MenuItem value={option}>{option}</MenuItem>
              )
            })}
          </Select>
          <h2 className="">Record: {team.Record}</h2>
          <TextField
            variant="outlined"
            margin="normal"
            name="Record"
            label="Record"
            id="Record"
            autoFocus
            value={team.Record}
            onChange={(event: { target: { value: any; }; }) => {
              setTeam({
                ...team,
                Record: event.target.value
              })
            }} 
          />
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