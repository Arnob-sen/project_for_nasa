import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const App = () => {
  const [data, setData] = useState(null);
  const { speak } = useSpeechSynthesis();
  const [stations, setStations] = useState([
    {name:'USA'},
    {name:'Canada'},
    {name:'India'},
    {name:'Bangladesh'}
  ]);
  const [current, setCurrent] = useState(null);
  const handleStationSelect = (selectedStation) => {
    setCurrent(selectedStation);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(`http://api.weatherapi.com/v1/history.json?key=11dc12e69176434e917184442230310&q=${position.coords.latitude},${position.coords.longitude}&dt=2023-08-01&hour=0`)
          .then(response => response.json())
          .then(data => setData({city:data.location.name,coun:data.location.country}))
          .catch(error => console.error(error));
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSpeak = () => {
    if (data) {
      speak({ text: `Attension please! ${data.city} city is now facing dangerous wildfire. People of ${data.coun} both near and far from ${data.city} stay at safe places` });
    }
  };

  return (
    <div style={{ width: '300px', height: '200px', borderRadius: '20px', border: '1px solid black', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    {/* //   <div style={{ width: '80%', height: '60%', backgroundColor: '#ccc', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //     {data ? <p>Attension please! {data.city} city is now facing dangerous wildfire. People of {data.coun} both near and far from {data.city} stay at safe places</p> : 'Loading...'}
    //   </div> */}
      <div className="nav">
        <div className="nav-item"></div>
        <div className="nav-item">Stream</div>
        <div className="nav-item"></div>
      </div>
      <ul className="station-list">
        {stations.map((station, key) => (
            <Station
            key={key}
            station={station}
            current={current}
            onStationSelect={handleStationSelect}
            />
        ))}
      </ul>
      <div className="station-info">
        <div className="header">{current ? 'CURRENTLY PLAYING' : ''}</div>
        <div className="header-name">{current ? current.name : ''}</div>
        <button style={{ marginTop: '20px', borderRadius: '50%', width: '50px', height: '50px' }} onClick={handleSpeak}>Speak</button>
      </div>
      {/* <input type='text' onChange={(e)=>{setText(e.target.value)}}/> */}
          {/* {setText("ok")} */}
      {/* <button onClick={()=>handleClick() } >Speak</button> */}
    </div>
  );
};
function Station(props) {
    const { station, onStationSelect, current } = props;
   
    return (
      <div className="station" onClick={() => onStationSelect(station)}>
        {station === current ? <StationDetails /> : ''}
        <span className="station-name">{station.name}</span>
        <span className="station-number">{station.number}</span>
      </div>
    );
  }
   
  function StationDetails(props) {
    return (
      <div className="station-details">
        <div className="station-details-item"></div>
        <div className="station-details-item"></div>
        <div className="station-details-item"></div>
      </div>
    );}
export default App;