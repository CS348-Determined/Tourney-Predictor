import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MockTeam from "../Team/MockTeam";
import MockBracketEntry from "./MockBracketEntry";

interface NameProps {
    team: Team;
}
function WinnerName({team}: NameProps) {
    return (
        <div className="">
            <Link
              to={{
                pathname: "/team",
                search: `?teamId=${team.team_id}`, 
              }}
            className="inline-block font-bold p-1" >
              { team.name } {team.record}
            </Link>
            <div className="inline-block p-1 bg-yellow-300 rounded-md">
                Winner
            </div>
        </div>
    ); 
}
function LoserName({team}: NameProps) {
    return (
        <div className="">
            <Link
              to={{
                pathname: "/team",
                search: `?teamId=${team.team_id}`, 
              }}
            className="inline-block p-1" >
              { team.name } {team.record}
            </Link>
        </div>
    );
}

interface BubbleProps {
    entry: BracketEntry;
}

function BracketBubble({entry}: BubbleProps) {
    let bracket = entry;
    const [team1, setTeam1] = useState<Team | null>();
    const [team2, setTeam2] = useState<Team | null>();
    useEffect(() => {
        // Load Teams
        fetch("http://localhost:8000/team/"+bracket.team1_id.toString())
            .then((res) => res.json())
            .then((json) => {
                //console.log(json[0]);
                setTeam1(json[0]);
            })
        fetch("http://localhost:8000/team/"+bracket.team2_id.toString())
            .then((res) => res.json())
            .then((json) => {
                //console.log(json[0]);
                setTeam2(json[0]);
            })
    },[]);

    
    let gameText = "Game " +  bracket.entry_id.toString();

    if (team1 != null && team2 != null) {
        if (bracket.team1_victor) {
            return (
                <div className="BracketBubble">
                    <div className="inline-block p-1 rounded-md border-2 border-black">
                        <div className="underline">{gameText}</div>
                        <WinnerName team={team1} />
                        <LoserName team={team2}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="BracketBubble">
                    <div className="inline-block p-1 rounded-md border-2 border-black">
                        <div className="underline">{gameText}</div>
                        <LoserName team={team1}/>
                        <WinnerName team={team2} />
                    </div>
                </div>
            );
        }
    } else {
        return (
            <div>Loading Teams</div>
        )
    }
    
}

export default BracketBubble;
