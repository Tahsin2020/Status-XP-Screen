import React from "react";

const Prompt = () => {
  const [AddSkill, setAddSkill] = useState(false);
  const handleAddSkill = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const Skill_Title = formData.get("skill-title") as string;
    const Skill_Level = Number(formData.get("skill-level") as string);

    if (skills[Skill_Title] == undefined) {
      var copy_skills = { ...skills };
      copy_skills[Skill_Title] = [Skill_Level, 30];
      setSkills(copy_skills);
    }
    setAddSkill(false);
  };
  return (
    <div>
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
    </div>
  );
};

export default Prompt;
