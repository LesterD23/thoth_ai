import React from 'react';
import ReactDOM from 'react-dom/client';
import App2 from './chatgpt.jsx';

function App() {
  const button1Event = () => {
    console.log("Chat with Ai clicked");
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App2 />
      </React.StrictMode>,
    );
  };

  const button2Event = () => {
    console.log("Synchronize with Google clicked");
  };

  const button3Event = () => {
    console.log("Settings clicked");

    const settingMenu = () => {
      return (
        <div style={{position: "relative", height: "500px", weight: "200px", width: "300px"}}>
          <h1>Settings</h1>
          <p>Settings page</p>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <settingMenu />
      </React.StrictMode>,
    );
  };

  return (
    <div>
      <button id="btn01" onClick={button1Event}>Chat with Ai</button>
      <button id="btn02" onClick={button2Event}>Synchronize with Google</button>
      <button id="btn03" onClick={button3Event}>Settings</button>
    </div>
  );
}

export default App;