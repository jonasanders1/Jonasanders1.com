import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./projectForm.css";
import { uploadProjectImage } from "../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../customButton/CustomButton";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ProjectFormData {
  title: string;
  description: string;
  demoLink: string;
  repoLink: string;
  technologies: string[];
  images?: string[];
}

const ProjectForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    demoLink: "",
    repoLink: "",
    technologies: [],
    images: [],
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!projectId);

  const isEditMode = !!projectId;

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        const projectDoc = await getDoc(doc(db, "projects", projectId));
        if (projectDoc.exists()) {
          const projectData = projectDoc.data() as ProjectFormData;
          setFormData({
            title: projectData.title,
            description: projectData.description,
            demoLink: projectData.demoLink || "",
            repoLink: projectData.repoLink || "",
            technologies: projectData.technologies || [],
            images: projectData.images || [],
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        alert("Failed to fetch project details.");
        navigate("/");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (tag.trim() !== "" && !formData.technologies.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tag],
      }));
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tagToRemove),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveImage = (index: number, isNewImage: boolean) => {
    if (isNewImage) {
      setNewImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setFormData((prev) => ({
        ...prev,
        images: prev.images?.filter((_, i) => i !== index) || [],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload new images
      const uploadedImageUrls = await Promise.all(
        newImages.map((image) => uploadProjectImage(image))
      );

      const projectData = {
        title: formData.title,
        description: formData.description,
        ...(formData.demoLink.trim() && { demoLink: formData.demoLink }),
        ...(formData.repoLink.trim() && { repoLink: formData.repoLink }),
        technologies: formData.technologies,
        images: [...(formData.images || []), ...uploadedImageUrls],
        ...(isEditMode ? {} : { createdAt: new Date() }),
      };

      if (isEditMode && projectId) {
        await updateDoc(doc(db, "projects", projectId), projectData);
      } else {
        await addDoc(collection(db, "projects"), projectData);
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving project:", error);
      alert(
        `Failed to ${isEditMode ? "update" : "save"} project. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <section className="section">
        <SectionTitle title="Loading..." subtitle="Fetching project details" />
      </section>
    );
  }

  return (
    <section className="section">
      <SectionTitle
        title={isEditMode ? "Edit Project" : "Add New Project"}
        subtitle={
          isEditMode
            ? "Update project details"
            : "Add a new project to your portfolio"
        }
        backButton={true}
      />

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

          <div className="add-new-project__form-div">
            <label className="add-new-project__form-tag">Project Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="add-new-project__form-input"
              onChange={handleImageChange}
              placeholder="Choose images..."
            />

            {/* Preview of existing images */}
            {formData.images && formData.images.length > 0 && (
              <div className="add-new-project__image-preview">
                <h4>Existing Images</h4>
                <div className="add-new-project__image-grid">
                  {formData.images.map((imageUrl, index) => (
                    <div
                      key={`existing-${index}`}
                      className="add-new-project__image-item"
                    >
                      <img src={imageUrl} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="add-new-project__image-remove"
                        onClick={() => handleRemoveImage(index, false)}
                        aria-label="Remove image"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview of new images */}
            {newImages.length > 0 && (
              <div className="add-new-project__image-preview">
                <h4>New Images</h4>
                <div className="add-new-project__image-grid">
                  {newImages.map((image, index) => (
                    <div
                      key={`new-${index}`}
                      className="add-new-project__image-item"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`New Preview ${index + 1}`}
                      />
                      <button
                        type="button"
                        className="add-new-project__image-remove"
                        onClick={() => handleRemoveImage(index, true)}
                        aria-label="Remove image"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              <span className="add-new-project__form-tag">
                Demo Link (Optional)
              </span>
              <input
                type="text"
                name="demoLink"
                value={formData.demoLink}
                onChange={handleInputChange}
                className="add-new-project__form-input"
                placeholder="Live demo URL"
              />
            </div>

            <div className="add-new-project__form-div">
              <span className="add-new-project__form-tag">
                Repository Link (Optional)
              </span>
              <input
                type="text"
                name="repoLink"
                value={formData.repoLink}
                onChange={handleInputChange}
                className="add-new-project__form-input"
                placeholder="GitHub repository URL"
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
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
              />
              <div className="project__technologies">
                {formData.technologies.map((tag, index) => (
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
              size="large"
              icon={<FontAwesomeIcon icon={faSave} />}
              disabled={isLoading}
              isLink={false}
            >
              {isLoading ? "Saving..." : "Save Project"}
            </CustomButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProjectForm;
