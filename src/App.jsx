import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?";

  const [cityName, setCityName] = useState("");
  const [latitudeData, setLatitudeData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const getLatitude = async () => {
    const response = await axios
      .get(`${url}q=${cityName}&appid=${apiKey}`)
      .then((response) => {
        setLatitudeData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // console.log("Geçersiz giriş: " + error);
        setLatitudeData("");
        setCityName("");
        setAlertMessage("Please write correct city name");
      });
  };

  // const getWeater = async () => {
  //   const response = await axios.get(
  //     `${url}lat=${latitudeData.coord.lat}&lon=${latitudeData.coord.lon}&appid=${apiKey}`
  //   );
  // };

  useEffect(() => {}, []);

  return (
    <>
      <div className="container">
        <div className="search-city">
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getLatitude()}
          />
          <button onClick={() => getLatitude()}>Search</button>
          <div style={{ textAlign: "start" }}>
            <p>
              STATUS:{" "}
              {latitudeData ? (
                latitudeData.cod
              ) : (
                <span style={{ color: "red" }}>{alertMessage}</span>
              )}
            </p>
            {latitudeData && (
              <>
                <p>Country: {latitudeData.sys.country}</p>
                <p>City: {latitudeData.name}</p>
                <p>Lon: {latitudeData.coord.lon}</p>
                <p>Lat: {latitudeData.coord.lat}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
