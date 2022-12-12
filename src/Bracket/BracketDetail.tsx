import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { Button } from '../../node_modules/@mui/material/index';
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
            <div className="flex align-middle">
              <div className="text-2xl font-bold">
                {bracket.bracket_name}
              </div>
              <Link
                to={{
                  pathname: "/bracketEdit",
                  search: `?bracketId=${bracket.bracket_id}`, 
                }}
                className="inline-block font-bold bg-gray-400 rounded-md px-1 align-middle" >
                  Edit Bracket
              </Link>
            </div>
            
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