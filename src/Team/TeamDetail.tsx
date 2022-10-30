import React, { FC, ReactElement, useEffect, useState } from 'react';
import MockTeam from './MockTeam';
import { useParams } from "react-router-dom";
import { Button } from '../../node_modules/@mui/material/index';
import { Link } from 'react-router-dom';
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';

type TeamProps = {
  teamId: string;
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

function TeamDetail() {
  //const { teamId } = useParams<TeamProps>();
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamId");
  const [team, setTeam] = useState<Team | null>();
  useEffect(() => {
    // Load Team
    console.log("Loading Team" + teamId)
    setTeam(MockTeam);
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
          <h1 className="text-3xl font-bold">{team.Name}</h1>
          <div>
            <h2 className="text-xl">Conference: {team.ConferenceName}</h2>
            <Link
              to={{
                pathname: "/conference",
                search: `?conferenceId=${team.ConferenceId}`, 
              }}
            >
              Go to Conference
            </Link>
          </div>
          
          <h2 className="">Record: {team.Record}</h2>
        </div>
        <PlayersSection />
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

export default TeamDetail;