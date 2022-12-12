import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField } from '../../node_modules/@mui/material/index';
import MockPosition from './MockPosition';

interface PositionProps {
  positionId: String;
}

function PushPosition(position: Position) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(position)
};
fetch("http://localhost:8000/addPosition/", requestOptions)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    })
}

const AddPosition: React.FC<PositionProps> = props => {
  const [position, setPosition] = useState<Position | null>();
  useEffect(() => {
    // Load Position
    setPosition(MockPosition)
  },[]);


  if (position) {
    return(
       <div>
        <div>
          <h1 className="text-3xl font-bold">Creating position</h1>
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
          <Button variant="contained" onClick={() => { PushPosition(position) }}>Submit Edits</Button>
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

export default AddPosition;