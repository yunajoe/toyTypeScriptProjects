import { useEffect, useState } from "react";
import "./App.css";
import { Item } from "./type";
import { myFavoriteFootballTeam } from "./utils/data";
import { filterData } from "./utils/func";

function App() {
  const [data, setData] = useState<Item[]>([]);

  const dataObj = Object.freeze(myFavoriteFootballTeam);
  const {
    team,
    sport,
    year,
    players,
    headCoach: { coachName },
  } = dataObj;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let keyword = e.target.value;
    const result = filterData(keyword, players);
    setData(result);
  };

  useEffect(() => {
    setData(players);
  }, []);

  return (
    <>
      <h1>Team stats</h1>
      <div className="menus">
        <span className="menu">Team: {team}</span>

        <span>Sports: {sport}</span>

        <span>Year {year}</span>

        <span>Header coach: {coachName}</span>
      </div>
      <div>
        <select onChange={handleChange}>
          <option value="all">All Players</option>
          <option value="nicknames">NickNames</option>
          <option value="forward">Position Forward</option>
          <option value="midfielder">Position MidFielder</option>
          <option value="defender">Position Defender</option>
          <option value="goalkeeper">Position GoalKeeper</option>
        </select>
      </div>
      <div className="cards">
        {data.map((item, index) => {
          const { isCaptain, name, nickname, number, position } = item;
          return (
            <div key={index} className="card">
              <h2>{name}</h2>
              <p>position: {position}</p>
              <p>number: {number}</p>
              <p>nickname: {nickname}</p>
            </div>
          );
        })}
      </div>

      <footer>&copy; freecodecamp</footer>
    </>
  );
}

export default App;
