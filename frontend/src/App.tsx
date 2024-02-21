import useWindowDimensions from "./components/windowDimensions";

import "./App.css";

const App = () => {
  const { height, width } = useWindowDimensions();
  var skills = {
    "Meditation Breathing": 2,
    "Meditation Sensing": 3,
    "Meditation Duration": 1,
    Determination: 0,
    Javascript: 1,
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="Prompt">
        <div className="Prompt-Box">
          Hi
        </div>
        <div className="Prompt-Background"/>
      </div>
      {width} by {height} pixels
      <div className="skill-table">
        {Object.keys(skills).map((key: String) => {
          return (
            <div className="skill">
              <div className="skill-name">{key}</div>
              <div className="skill-bar" />
              <div className="skill-level">{skills[key]}</div>
              <div className="skill-up">+</div>
              <div className="skill-down">-</div>
              <div className="skill-delete">x</div>
            </div>
          );
        })}
        <div className="skill">
          <button
            style={{
              backgroundColor:"skyblue",
              color:"white",
              borderRadius: "10px",
              width: "400px",
              fontSize: "24px",
              padding: "10px",
            }}
          >
            Add Skill?
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
