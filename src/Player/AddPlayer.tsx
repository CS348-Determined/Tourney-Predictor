import React, {useEffect, useState} from 'react'
import { json } from 'stream/consumers';
import { isAnyArrayBuffer } from 'util/types';
import { Button, MenuItem, Select, TextField } from '../../node_modules/@mui/material/index';
import { Fetcher } from '../../node_modules/react-router-dom/dist/index';
import { escapeLeadingUnderscores } from '../../node_modules/typescript/lib/typescript';
import TeamDetail from '../Team/TeamDetail';

const MockPlayer: Player = {
    player_id: 0,
    name: "New Name",
    team_id: 0
}

interface PlayerProps {
    playerID: String
}

function PushPlayer(player: Player) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(player)
    };
    fetch("http://localhost:8000/createPlayer", requestOptions)
        .then((res) => res.json())
        .then((json) => { console.log(json)})
}

function GetTeams() {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const teams = useState<Team[] | null>();
    fetch("http://localhost:8000/teams", requestOptions)
        .then((res) => res.json())
        .then((json) => {
            return json
        })
}

const AddPlayer: React.FC<PlayerProps> = props => {
    const [player, setPlayer]  = useState<Player | null>();
    const [teams, setTeams] = useState<Team[] | null>();

    function GetTeams() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }
        fetch("http://localhost:8000/teams", requestOptions)
            .then((res) => res.json())
            .then((json) => {
                setTeams(json)
            })
    }

    useEffect(() => {
        setPlayer(MockPlayer)
        GetTeams()  
    },[]); 

    if (player && teams) {
        return(
            <div>
                <div>
                    <h1 className="text-3xl font-bold"> Create New Player</h1>
                    <TextField
                        variant="outlined"
                        maring="normal"
                        name="Name"
                        label="Name"
                        id="Name"
                        autoFocus
                        onChange={(event: {target: {value: any;}; }) => {
                            setPlayer({ 
                                ...player,
                                name: event.target.value
                            })
                        }}
                    />
                </div>

                <div>
                    <Select 
                        labelId = "Team"
                        id = "Team"
                        onChange = {(event: {target: {value: any;}}) => {
                            console.log(event.target)
                            setPlayer({
                                ...player,
                                team_id: event.target.value.team_id
                            })
                        }}
                        >
                        {teams.map(option => {
                            return (
                                <MenuItem value = {option}>{option.name}</MenuItem>
                            )
                        })

                        }                            
                        </Select>
                </div>

                <div>
                <Button
                    variant="contained"
                    onClick={() => { PushPlayer(player)}}>Create Player</Button>
            </div>
        </div>

            
        )
    } else {
        return (
            <div>
                Loading Player
            </div>
        )
    }
}

export default AddPlayer;