import React, { FC, ReactElement, useEffect, useState } from 'react';
import MockLeague from './MockLeague';
import { useParams } from "react-router-dom";
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';

type leagueProps = {
  leagueId: string;
};

function TeamsSection() {
  return (
    <div className="App">
      <h1 className="text-2xl underline">
        Teams
      </h1>
    </div>
  );
}

function LeagueDetail() {
  const [searchParams] = useSearchParams();
  const leagueId = searchParams.get("leagueId");
  const [league, setLeague] = useState<League | null>();
  useEffect(() => {
    // Load league
    console.log("Loading league" + leagueId)
    fetch("http://localhost:8000/league/"+leagueId)
                  .then((res) => res.json())
                  .then((json) => {
                      console.log(json[0]);
                      setLeague(json[0]);
                  })
  },[]);

  if (!leagueId) {
    return (
      <div>
        Missing leagueId
      </div>
    );
  }

  if (league) {
    return(
       <div>
        <div>
          <h1 className="text-3xl font-bold">{league.name}</h1>
          {/*<div className="number">Sport: {league.SportId.toString()}</div>*/}
        </div>
        <TeamsSection />
      </div>
      
    );
  } else {
    return (
      <div>
        Loading league
      </div>
    );
  }
};

export default LeagueDetail;