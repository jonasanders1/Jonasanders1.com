import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import CustomButton from "../../components/customButton/CustomButton";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import "./addprojects.css";

const AddNewProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    demoLink: "",
    repoLink: "",
  });
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (tag.trim() !== "" && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create project document in Firestore
      const projectData = {
        ...formData,
        technologies: tags,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "projects"), projectData);
      
      // Navigate back to projects page on success
      navigate("/");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <SectionTitle title="Add New Project" subtitle="Add a new project to your portfolio" />

      <div className="add-new-project__content container">
        <form className="add-new-project__form" onSubmit={handleSubmit}>
          <div className="add-new-project__form-div">
            <label className="add-new-project__form-tag">Title</label>
            <input
              type="text"
              name="title"
              className="add-new-project__form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Project Title"
              required
            />
          </div>

          <div className="add-new-project__form-div add-new-project__form-area">
            <label className="add-new-project__form-tag">Description</label>
            <textarea
              name="description"
              className="add-new-project__form-input"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Project Description"
              required
            />
          </div>

          <div className="add-new-project__form-links">
            <div className="add-new-project__form-div">
              <label className="add-new-project__form-tag">Demo Link</label>
              <input
                type="url"
                name="demoLink"
                className="add-new-project__form-input"
                value={formData.demoLink}
                onChange={handleInputChange}
                placeholder="Live Demo URL"
              />
            </div>

            <div className="add-new-project__form-div">
              <label className="add-new-project__form-tag">Repository Link</label>
              <input
                type="url"
                name="repoLink"
                className="add-new-project__form-input"
                value={formData.repoLink}
                onChange={handleInputChange}
                placeholder="GitHub Repository URL"
                required
              />
            </div>
          </div>

          <div className="add-new-project__form-div">
            <label className="add-new-project__form-tag">Technologies</label>
            <div className="add-new-project__form-tags">
              <input
                type="text"
                className="add-new-project__form-input"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Add technology (Press Enter)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <div className="project__technologies">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="project__technology"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="add-new-project__form-button">
            <CustomButton
              type="submit"
              title={isLoading ? "Saving..." : "Save Project"}
              icon={<FontAwesomeIcon icon={faSave} />}
              disabled={isLoading}
              isLink={false}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewProject;
