import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';
import BracketBubble from './BracketBubble';
import MockBracket from './MockBracket';
import MockBracketEntry from './MockBracketEntry';


function BracketDetail() {
  const [searchParams] = useSearchParams();
  const bracketId = searchParams.get("bracketId");
  const [bracket, setBracket] = useState<Bracket | null>();
  const [bracketEntries, setBracketEntries] = useState<BracketEntry[] | null>();
  useEffect(() => {
    // Load league
    //setBracket(MockBracket)
    //setBracketEntries(entries)
    fetch("http://localhost:8000/bracket/"+bracketId)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json[0]);
                      setBracket(json[0]);
                  })
    
    fetch("http://localhost:8000/getBracketEntries/"+bracketId)
                  .then((res) => res.json())
                  .then((json) => {
                      //console.log(json);
                      setBracketEntries(json);
                  })
                  
  },[]);

  if (!bracketId) {
    return (
        <div>
            Missing BracketId
        </div>
        
    );
  }

  interface roundColProps {
    round: Number
  }
  function RoundColumn({round}: roundColProps) {
    let col: JSX.Element[] = []
    let colEntries = bracketEntries.filter(function(BracketEntry) { return BracketEntry.round == round;})
    colEntries.map((post) => (
        //<BracketBubble bracketEntryId={post.entry_id}/>
        col.push(
            <div className="py-1">
                <BracketBubble entry={post}/>
            </div>
        )
    ))
    return(<div>{col}</div>);
  }

  if (bracket && bracketEntries) {
    let roundCols: any[] = []
    for (let i = 1; i <= bracket.num_rounds; i++) {
        roundCols.push(
            <div className="flex-row px-2">
                <div className="font-bold">
                    Round: {i}
                </div>
                <RoundColumn round={i} />
            </div>
        )
    } 

    return(
        <div>
            <div className="text-2xl font-bold">{bracket.bracket_name}</div>
            <div className="flex">
                {roundCols}
            </div>
        </div>
    );
  } else {
    return (
      <div>
        Loading Bracket {bracketId}
      </div>
    );
  }
};

export default BracketDetail;