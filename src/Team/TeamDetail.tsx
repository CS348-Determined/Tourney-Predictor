import React, { useEffect, useState } from 'react';
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
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamId");
  const [team, setTeam] = useState<Team | null>();
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    // Load Team
    console.log("Loading Team" + teamId)
    fetch("http://localhost:8000/team/"+teamId)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json[0]);
                      setTeam(json[0]);
                  })
    //setTeam(MockTeam);

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
          <h1 className="text-3xl font-bold">{team.name}</h1>
          <div>
            <Link
              to={{
                pathname: "/league",
                search: `?leagueId=${team.league_id}`, 
              }}
            >
              Go to League
            </Link>
          </div>
          
          <h2 className="">Record: {team.record}</h2>
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