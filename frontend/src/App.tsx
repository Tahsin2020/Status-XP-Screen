import useWindowDimensions from "./components/windowDimensions";
import "./App.css";

const App = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div style={{ height: "100%" }}>
      {width} by {height} pixels
      <div className="skill-table">
        <div className="skill">
          <div className="skill-name">HTMLadasdsadasasdasdasdasdsa</div>
          <div className="skill-bar"></div>
        </div>
        <div className="skill">
          <div className="skill-name">CSS</div>
          <div className="skill-bar"></div>
        </div>
        <div className="skill">
          <div className="skill-name">JS</div>
          <div className="skill-bar"></div>
        </div>
        <div className="skill">
          <div className="skill-name">JS</div>
          <div className="skill-bar"></div>
        </div>
        <div className="skill">
          <div className="skill-name">JS</div>
          <div className="skill-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
