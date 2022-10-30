import React, { FC, ReactElement, useEffect, useState } from 'react';
import MockConference from './MockConference';
import { useParams } from "react-router-dom";
import { useSearchParams } from '../../node_modules/react-router-dom/dist/index';

type conferenceProps = {
  conferenceId: string;
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

function ConferenceDetail() {
  const [searchParams] = useSearchParams();
  const conferenceId = searchParams.get("conferenceId");
  const [conference, setConference] = useState<Conference | null>();
  useEffect(() => {
    // Load conference
    console.log("Loading conference" + conferenceId)
    setConference(MockConference);
  },[]);

  if (!conferenceId) {
    return (
      <div>
        Missing conferenceId
      </div>
    );
  }

  if (conference) {
    return(
       <div>
        <div>
          <h1 className="text-3xl font-bold">{conference.Name}</h1>
          <div className="number">Sport: {conference.SportId.toString()}</div>
        </div>
        <TeamsSection />
      </div>
      
    );
  } else {
    return (
      <div>
        Loading conference
      </div>
    );
  }
};

export default ConferenceDetail;