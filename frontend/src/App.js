import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:8000');


function App() {

  const [temp, setTemp] = useState(null);
  const [ultrasonic, setUltrasonic] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    // Listen for temperature updates
    socket.on('temp', (data) => {
      setTemp(data);
    });

    // Listen for ultrasonic updates
    socket.on('ultrasonic', (data) => {
      setUltrasonic(data);
    });

    socket.on('humidity', (data) => {
      setHumidity(data);
    });

    return () => {
      socket.off('temp');
      socket.off('ultrasonic');
      socket.off('humidity')
    };
  }, []);


  const sendDirection = (direction) => {
    socket.emit('send-direction', direction);
  };

  const sendArmValue = (value) => {
    socket.emit('send-arm-value', value);
  };
  
  return (
    <div className="Page">
      <div className="intro-container">
        <div className="header">
          <div className="group-name">
            <h1>
              Techno Terrors
            </h1>
          </div>
          <div className="logo-image">
            <img className="logo" src="./technologo.png" alt="Techno Terrors Logo" />            
          </div>
        </div>
      </div>
      <div className="display1">
        <div className = "sensor-data">
          <div className="sensor-item">
            <p>Temperature: {temp}°C</p>
          </div>
          <div className="sensor-item">
            <p>Humidity: {humidity}%</p>
          </div>
        </div>
      </div>

      <div>
        <img src="http://192.168.1.197" width="650px"/>
      </div>

      <div className="button-container">
        <button onClick={() => sendDirection('left')}>Left</button>
        <button onClick={() => sendDirection('forward')}>Forward</button>
        <button onClick={() => sendDirection('backward')}>Backward</button>
        <button onClick={() => sendDirection('right')}>Right</button>
      </div>

      <div className="button-container2">
        <button onClick={() => sendArmValue('grab')}>grab</button>
        <button onClick={() => sendArmValue('release')}>release</button>
      </div>
    </div>

  );
}

export default App;
