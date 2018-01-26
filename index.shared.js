export function fetchEtd() {
  return Promise.resolve().then(() => {
    return fetch('https://api.bart.gov/api/etd.aspx?cmd=etd&orig=DBRK&key=MW9S-E7SL-26DU-VV8V&json=y',
        {
          method: 'GET',
          headers: {
            'Accept': 'text/json',
          }
      });
  }).then((response) => {
    return response.text();
  }).then((jsonText) => {
    json = JSON.parse(jsonText);
    startStation = json.root.station[0];
    startStationName = startStation.name;
    destination = startStation.etd[0].destination;
    estimates = startStation.etd[0].estimate;
    estimate = estimates[0].minutes;
    platform = estimates[0].platform;

    return `Next train from ${startStationName} to ${destination} in ${estimate} minutes, departing from platform ${platform}`;
  });
}