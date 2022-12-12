import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';

type PositionProps = {
  positionId: string;
};

function PlayersSection() {
  return (
    <div className="App">
      <h1 className="text-2xl underline">
        Players
      </h1>
    </div>
  );
}

function PositionDetail() {
  const [searchParams] = useSearchParams();
  const positionId = searchParams.get("positionId");
  const [players, setPlayers] = useState<PlayerEntry[]| null>();
  useEffect(() => {
    // Load Position
    console.log("Loading Position" + positionId)
    fetch("http://localhost:8000/position/"+positionId)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json);
                      setPlayers(json);
                  })
    //setPosition(MockPosition);

  },[]);
function PositionPlayersSection() {
    let col: JSX.Element[] = []
    players.map((post) => (
        //<BracketBubble bracketEntryId={post.entry_id}/>
      
        col.push(
            <div className="py-1">
                {post.name}
            </div>
        )
    ))
    console.log(col)
    return(<div>{col}</div>);
}
  if (!positionId || players == null) {
    return (
      <div>
        Missing positionId
      </div>
    );
  }
  else {
      return (
          <div>
               <div className="py-1">
        Players in position {positionId}:
    </div>
        <div className="py-1">
        <PositionPlayersSection/>
    </div>
          </div>
       
      );
  }

 
};

export default PositionDetail;