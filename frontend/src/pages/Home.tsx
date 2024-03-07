import useWindowDimensions from "../components/windowDimensions";
import "../App.css";
import { useState, useEffect } from "react";
import {
  addSkill,
  checkAuthStatus,
  deleteSkill,
  getallSkills,
  modifySkill,
} from "../helpers/api-communicator";
import { useAuth } from "../context/AuthContext";

type Skill = {
  name: string;
  level: Number;
  progress: Number;
};

const Home = () => {
  const [AddSkill, setAddSkill] = useState(false);
  const [username, setUsername] = useState("");
  var [data_skills, setData_skills] = useState({});
  const auth = useAuth();
  console.log(auth?.user)

  useEffect(() => {
    if (Object.keys(data_skills).length === 0)
      checkAuthStatus()
        .then((data) => {
          setUsername(data.username);
          getallSkills(data.username)
            .then((data) => {
              for (let i = 0; i < data.skills.length; i++) {
                let skill = data.skills[i];
                data_skills[skill.name] = [
                  Number(skill.level),
                  Number(skill.progress),
                ];
              }
              setData_skills({ ...data_skills });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const handleAddSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Skill_Title = formData.get("skill-title") as string;
    const Skill_Level = Number(formData.get("skill-level") as string);

    if (data_skills[Skill_Title] == undefined) {
      var copy_skills = { ...data_skills };
      copy_skills[Skill_Title] = [Skill_Level, 30];
      setData_skills(copy_skills);
    }
    addSkill(username, Skill_Title, Skill_Level, 50);
    setAddSkill(false);
  };

  return (
    <div style={{ height: "100%" }}>
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
      <div className="Player-Card">
        <div className="Player-Icon">
          <div className="Player-Icon-Letter">T</div>
        </div>
        <div className="Player-Info">
          <div className="Player-Name">{auth?.user?.name}</div>
          <div className="Player-Title">{auth?.user?.position}</div>
          <div className="Player-Level">Level 50</div>
        </div>
        <div>
          {/* <button className="Skill-Add" style={{ height: "100px" }}>
            Save Skills and Skill Levels/Progress
          </button> */}
        </div>
      </div>
      <div className="skill-table">
        {Object.keys(data_skills).map((key, index) => {
          return (
            <div className="skill" key={index}>
              <div className="skill-name">{key}</div>
              <div className="skill-bar">
                <div
                  style={{
                    width: data_skills[key][1].toString() + "%",
                    height: "100%",
                    backgroundColor: "green",
                  }}
                ></div>
              </div>
              <div className="skill-level">{data_skills[key][0]}</div>
              <div
                className="skill-up"
                onClick={() => {
                  modifySkill(
                    username,
                    key,
                    data_skills[key][0] + 1,
                    data_skills[key][1]
                  );
                  var copy_skills = { ...data_skills };
                  copy_skills[key][0] = Number(copy_skills[key][0]) + 1;
                  setData_skills(copy_skills);
                }}
              >
                +
              </div>
              <div
                className="skill-down"
                onClick={() => {
                  modifySkill(
                    username,
                    key,
                    data_skills[key][0] - 1,
                    data_skills[key][1]
                  );
                  var copy_skills = { ...data_skills };
                  copy_skills[key][0] = copy_skills[key][0] - 1;
                  setData_skills(copy_skills);
                }}
              >
                -
              </div>
              <div
                className="skill-delete"
                onClick={() => {
                  var copy_skills = { ...data_skills };
                  delete copy_skills[key];
                  setData_skills(copy_skills);
                  deleteSkill(username, key);
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

export default Home;
