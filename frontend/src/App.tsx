import useWindowDimensions from "./components/windowDimensions";

import "./App.css";
import { useState } from "react";

const App = () => {
  const [AddSkill, setAddSkill] = useState(false);
  const [skills, setSkills] = useState({
    "Meditation Breathing": [2, 30],
    "Meditation Sensing": [3, 60],
    "Meditation Duration": [1, 30],
    Determination: [0, 30],
    Javascript: [1, 30],
  });
  const { height, width } = useWindowDimensions();

  const handleAddSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Skill_Title = formData.get("skill-title") as string;
    const Skill_Level = Number(formData.get("skill-level") as string);

    if (skills[Skill_Title] == undefined) {
      var copy_skills = { ...skills };
      copy_skills[Skill_Title][0] = Skill_Level;
      setSkills(copy_skills);
    }
    setAddSkill(false);
  };

  return (
    <div style={{ height: "100%" }}>
      {width} by {height} pixels
      <div className="Player-Card">
        <div className="Player-Icon">
          <div className="Player-Icon-Letter">T</div>
        </div>
        <div className="Player-Info">
          <div className="Player-Name">Tahsin Hasan</div>
          <div className="Player-Title">Full Stack Software Engineer</div>
          <div className="Player-Level">Level 50</div>
        </div>
      </div>
      {AddSkill ? (
        <div className="Prompt">
          <div className="Prompt-Box">
            <form action="#" onSubmit={handleAddSkill} className="form">
              <div>
                <input
                  name="skill-title"
                  type="text"
                  placeholder="Skill Title"
                  className="form-input"
                  id="skill-title"
                  required
                />
                <input
                  name="skill-level"
                  type="number"
                  placeholder="Skill Level"
                  className="form-input"
                  id="skill-level"
                  required
                />
              </div>
              <div>
                <button
                  style={{
                    marginTop: "5%",
                    backgroundColor: "skyblue",
                    color: "white",
                    borderRadius: "10px",
                    width: "85%",
                    fontSize: "24px",
                    padding: "1%",
                  }}
                  type="submit"
                >
                  Add Skill?
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="skill-table">
        {Object.keys(skills).map((key: String) => {
          return (
            <div className="skill">
              <div className="skill-name">{key}</div>
              <div className="skill-bar">
                <div
                  style={{
                    width: skills[key][1].toString() + "%",
                    height: "100%",
                    backgroundColor: "green",
                  }}
                ></div>
              </div>
              <div className="skill-level">{skills[key][0]}</div>
              <div
                className="skill-up"
                onClick={() => {
                  var copy_skills = { ...skills };
                  copy_skills[key][0] = copy_skills[key] + 1;
                  setSkills(copy_skills);
                }}
              >
                +
              </div>
              <div
                className="skill-down"
                onClick={() => {
                  var copy_skills = { ...skills };
                  copy_skills[key][0] = copy_skills[key] - 1;
                  setSkills(copy_skills);
                }}
              >
                -
              </div>
              <div
                className="skill-delete"
                onClick={() => {
                  var copy_skills = { ...skills };
                  delete copy_skills[key];
                  setSkills(copy_skills);
                }}
              >
                x
              </div>
            </div>
          );
        })}
        <div className="skill">
          <button className="Skill-Add" onClick={() => setAddSkill(true)}>
            Add Skill?
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
