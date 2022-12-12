import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField } from '../../node_modules/@mui/material/index';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';
import MockPosition from './MockPosition';

interface PositionProps {
  positionId: String;
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

function UpdatePosition(position: Position) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(position)
};
fetch("http://localhost:8000/updatePosition/"+position.position_id, requestOptions)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    })
}

const PositionEdit: React.FC<PositionProps> = props => {
  const [searchParams] = useSearchParams();
  const positionId = searchParams.get("positionId");
  const [position, setPosition] = useState<Position | null>();
  const [leagues, setLeagues] = useState<string[] | null>();
  useEffect(() => {
    // Load Position
    fetch("http://localhost:8000/position/"+positionId)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json[0]);
                      setPosition(json[0]);
                  })
  },[]);

  if (!positionId) {
    return (
      <div>
        Missing positionId
      </div>
    );
  }

  if (position) {
    return(
<div>
        <div>
          <h1 className="text-3xl font-bold">Editing position</h1>
          <TextField
            variant="outlined"
            margin="normal"
            name="Name"
            label="Name"
            id="Name"
            autoFocus
            value={position.name}
            onChange={(event: { target: { value: any; }; }) => {
              setPosition({
                ...position,
                name: event.target.value
              })
            }} 
          />         
        </div>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            name="Name"
            label="Sport ID"
            id="SportID"
            autoFocus
            value={position.sport_id}
            onChange={(event: { target: { value: any; }; }) => {
              setPosition({
                ...position,
                sport_id: event.target.value
              })
            }} 
          />         
        </div>

        <div>
          <Button variant="contained" onClick={() => { UpdatePosition(position) }}>Submit Edits</Button>
        </div>
        
        
      </div>
    );
  } else {
    return (
      <div>
        Loading Position
      </div>
    );
  }
};

export default PositionEdit;