import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, MenuItem, Select } from "../../node_modules/@mui/material/index";
import MockTeam from "../Team/MockTeam";
import MockBracketEntry from "./MockBracketEntry";



interface BubbleProps {
    entry: BracketEntry;
    otherEntries: BracketEntry[];
    totalRounds: number;
}

function EditBracketBubble({entry, otherEntries, totalRounds}: BubbleProps) {
    const entryIndex = otherEntries.findIndex(e => e.entry_id === entry.entry_id);
    const [bracket, setBracket] = useState<BracketEntry | null>(entry);
    const [team1, setTeam1] = useState<Team | null>();
    const [team2, setTeam2] = useState<Team | null>();
    const [teamChoices, setTeamChoices] = useState<Team[] | null>();

    function getValidTeams(allTeams: Team[]) { // Looks at previous winners and output options based on winners
        let out = allTeams.filter(function(Team) { return Team !== team1 && Team !== team2;})
        if (bracket.round > 1 && entryIndex !== undefined) {
            const optionIndex = entryIndex - (2 ^ (totalRounds - bracket.round))
            const team1Id = otherEntries[optionIndex].team1_victor ? otherEntries[optionIndex].team1_id: otherEntries[optionIndex].team2_id
            const team2Id = otherEntries[optionIndex+1].team1_victor ? otherEntries[optionIndex+1].team1_id: otherEntries[optionIndex+1].team2_id
            const firstOpt = allTeams.find(e => e.team_id === team1Id);
            const secOpt = allTeams.find(e => e.team_id === team2Id);
            out = [firstOpt, secOpt]
        }
        //console.log(out)
        return out
    }

    function updateEntry(entry: BracketEntry) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
          };
          fetch("http://localhost:8000/updateBracketEntry/"+entry.entry_id, requestOptions)
            .then((res) => res.json())
            .then((json) => {
                //console.log(json);
          })
    }

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
        fetch("http://localhost:8000/allTeams")
            .then((res) => res.json())
            .then((json) => {
                //console.log(json);
                setTeamChoices(getValidTeams(json));
            })
    },[]);

    function toggleWinner() {
        setBracket({
            ...bracket,
            team1_victor: !bracket.team1_victor
        })
    }

    interface NameProps {
        team: Team;
    }
    function WinnerName({team}: NameProps) {
        return (
            <div className="">
                <Select labelId="WinningTeam" id="WinningTeam" value={bracket.team1_victor ? team1 : team2}
                    onChange={(event: { target: { value: any; }; }) => {
                        if (bracket.team1_victor) {
                            setTeam1(event.target.value)
                            setBracket({
                                ...bracket,
                                team1_id: event.target.value.team_id
                            })
                        } else {
                            console.log("Test")
                            setTeam2(event.target.value)
                            setBracket({
                                ...bracket,
                                team2_id: event.target.value.team_id
                            })
                        }
                    }} 
                    >
                    {teamChoices.map(option => {
                        return (
                            <MenuItem value={option}>{option.name} {option.record}</MenuItem>
                        )
                    })}
                </Select>
                <Link
                  to={{
                    pathname: "/team",
                    search: `?teamId=${team.team_id}`, 
                  }}
                className="inline-block font-bold p-1" >
                  { team.name } {team.record}
                </Link>
                <div className="inline-block p-1 bg-yellow-300 rounded-md">
                    Selected Winner
                </div>
            </div>
        ); 
    }
    function LoserName({team}: NameProps) {
        return (
            <div className="">
                <Select labelId="LosingTeam" id="LosingTeam" value={bracket.team1_victor ? team2 : team1}
                    onChange={(event: { target: { value: any; }; }) => {
                        if (bracket.team1_victor) {
                            setTeam2(event.target.value)
                            setBracket({
                                ...bracket,
                                team2_id: event.target.value.team_id
                            })
                        } else {
                            console.log("Test")
                            setTeam1(event.target.value)
                            setBracket({
                                ...bracket,
                                team1_id: event.target.value.team_id
                            })
                        }
                    }} 
                    >
                    {teamChoices.map(option => {
                        return (
                            <MenuItem value={option}>{option.name} {option.record}</MenuItem>
                        )
                    })}
                </Select>
                <Link
                  to={{
                    pathname: "/team",
                    search: `?teamId=${team.team_id}`, 
                  }}
                className="inline-block p-1" >
                  { team.name } {team.record}
                </Link>
                <Button variant="contained" onClick={() => { toggleWinner() }}>Switch Winner</Button>
            </div>
        );
    }

    function EditedIndicator() { // Dont think this works
        console.log("Entry: "+ JSON.stringify(entry))
        console.log("Bracket: "+ JSON.stringify(bracket))
        if (JSON.stringify(entry) === JSON.stringify(bracket)) {}
        else {
            return(
                <div>
                    This Entry Has Been Edited
                </div>
            )
        }
    }

    if (bracket != null && teamChoices != null && team1 != null && team2 != null) {
        if (bracket.team1_victor) {
            return (
                <div className="BracketBubble">
                    <div className="inline-block p-1 rounded-md border-2 border-black">
                        {/*<EditedIndicator />*/}
                        <WinnerName team={team1} />
                        <LoserName team={team2}/>
                        <div>
                            <Button variant="contained" onClick={() => { updateEntry(bracket) }}>Submit Edits</Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="BracketBubble">
                    <div className="inline-block p-1 rounded-md border-2 border-black">
                        <LoserName team={team1}/>
                        <WinnerName team={team2} />
                        <div>
                            <Button variant="contained" onClick={() => { updateEntry(bracket) }}>Submit Edits</Button>
                        </div>
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

export default EditBracketBubble;
