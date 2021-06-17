import React from "react";
import "./Home.css";
import Profile from "./Profile";

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>Stonks</h1>
        <p className="text-muted">Make fun of your friends over at r/WSB</p>
      </div>
      <Profile />
    </div>
  );
}