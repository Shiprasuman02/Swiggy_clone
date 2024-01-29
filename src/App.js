import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import Header from "./components/Header";
import Body from "./components/Body";


//not using keys (not acceptable) <<<<< index as key <<<<<<<<<<<< unique id



const AppLayout = () => {
  console.log(<Body />);
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);

export default App;
























