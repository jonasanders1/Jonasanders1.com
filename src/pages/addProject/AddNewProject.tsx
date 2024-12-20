import { useState } from "react";
import CustomButton from "../../components/customButton/CustomButton";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./addprojects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const AddNewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tag.trim() !== "" && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <section className="section">
      <SectionTitle
        title="Add New Project"
        subtitle="Create a new project entry"
      />

      <div className="add-new-project__content container">
        <form className="add-new-project__form">
          <div className="add-new-project__form-div">
            <label className="add-new-project__form-tag">Title</label>
            <input
              type="text"
              className="add-new-project__form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title..."
            />
          </div>

          <div className="add-new-project__form-div add-new-project__form-area">
            <label className="add-new-project__form-tag">Description</label>
            <textarea
              className="add-new-project__form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description..."
            />
          </div>

          <div className="add-new-project__form-links">
            <div className="add-new-project__form-div">
              <label className="add-new-project__form-tag">Github Link</label>
              <input
                type="text"
                className="add-new-project__form-input"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                placeholder="Github Link..."
              />
            </div>

            <div className="add-new-project__form-div">
              <label className="add-new-project__form-tag">Github Link</label>
              <input
                type="text"
                className="add-new-project__form-input"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
                placeholder="Github Link..."
              />
            </div>
          </div>

          <div className="add-new-project__form-div">
            <label className="add-new-project__form-tag">Technologies</label>

            <input
              type="text"
              className="add-new-project__form-input"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add technology..."
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            {tags.map((t) => (
              <div
                key={t}
                className="project__technology"
                style={{ cursor: "pointer" }}
                onClick={() => handleRemoveTag(t)}
              >
                {t} ×
              </div>
            ))}
          </div>
          <div className="add-new-project__form-button">
            <CustomButton
              title="Save Project"
              onClick={() => {}}
              isLink={false}
              size="large"
              icon={<FontAwesomeIcon icon={faSave} />} 
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewProject;
