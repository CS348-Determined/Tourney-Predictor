import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, MenuItem, Select, TextField } from "../../node_modules/@mui/material/index";
import MockBracket from "./MockBracket";

function AddBracket() {
    const [bracket, setBracket] = useState<Bracket>(MockBracket);
    const [bracketId, setBracketId] = useState(null);
    const [defaultTeam, setDefaultTeam] = useState<Team | null>();
    const [allTeams, setAllTeams] = useState<Team[] | null>();

    useEffect(() => {
        // Load Teams
        fetch("http://localhost:8000/allTeams")
            .then((res) => res.json())
            .then((json) => {
                //console.log(json);
                setAllTeams(json);
            })
    },[]);

    const roundOptions = []
    for(let i = 0; i < 8; i++) {
        roundOptions[i] = i+1
    }

    function submitNewBracket() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bracket)
        };
        fetch("http://localhost:8000/addBracket/"+defaultTeam.team_id, requestOptions)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setBracketId(json)
        })
    }

    function BracketLink() {
        if (bracketId) {
            return (
                <div>
                    <Link
                        to={{
                            pathname: "/bracketEdit",
                            search: `?bracketId=${bracketId}`, 
                        }}
                        className="inline-block font-bold p-1 underline" >Click me to make changes to your new bracket </Link>
                </div>
            )
        }
    }
    
    if (allTeams != null) {
        return (
            <div className="">
                <div className="flex justify-center text-2xl font-bold underline">Add a New Bracket</div>
                <div className="flex justify-center">
                    <div className="my-auto px-2">Select number of rounds for the bracket:</div>
                    <Select labelId="Rounds" id="Rounds" value={bracket.num_rounds}
                    onChange={(event: { target: { value: any; }; }) => {
                        setBracket({
                            ...bracket,
                            num_rounds: event.target.value
                        })
                    }} 
                    >
                        {roundOptions.map(option => {
                        return (
                            <MenuItem value={option}>{option}</MenuItem>
                        )
                        })}
                    </Select>
                </div>
                <div className="flex justify-center">
                    <div className="my-auto px-2">Set Bracket Name:</div>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="Name"
                        label="Bracket Name"
                        id="Name"
                        autoFocus
                        value={bracket.bracket_name}
                        onChange={(event: { target: { value: any; }; }) => {
                            setBracket({
                                ...bracket,
                                bracket_name: event.target.value
                            })
                        }} 
                    />
                </div>
                <div>
                    <div className="flex justify-center">
                        <div className="my-auto px-2">Select default team:</div>
                        <Select labelId="Teams" id="Teams" value={defaultTeam}
                        onChange={(event: { target: { value: any; }; }) => {
                            setDefaultTeam(event.target.value)
                        }} 
                        >
                            {allTeams.map(option => {
                            return (
                                <MenuItem value={option}>{option.name} {option.record}</MenuItem>
                            )
                            })}
                        </Select>
                    </div>
                    <div className="flex justify-center">Note: this is the team that will be initially filled in for all the team selections but you will get option to change them later</div>
                </div>
                <div className="flex justify-center">
                    <Button variant="contained" onClick={() => { submitNewBracket() }}>Submit Bracket</Button>
                </div>
                <div className="flex justify-center">
                    <BracketLink />
                </div>
            </div>
        );
    } else {
        return (
            <div>Loading Add Bracket Screen</div>
        );
    }
    
    
}

export default AddBracket;
