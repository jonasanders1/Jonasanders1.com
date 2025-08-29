import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import SectionTitle from "../SectionTitle/SectionTitle";
import "./projectForm.css";
import { uploadProjectImage } from "../../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../customButton/CustomButton";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import FormField from "./FormField";
import ImagePreview from "./ImagePreview";
import TechnologyInput from "./TechnologyInput";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

interface ProjectFormData {
  title: string;
  description: string;
  demoLink: string;
  repoLink: string;
  technologies: string[];
  images?: string[];
  createdAt?: Date;
  isHighlighted?: boolean;
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
    createdAt: new Date(),
    isHighlighted: false,
  });
  const [newImages, setNewImages] = useState<File[]>([]);
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

          // Handle date conversion safely
          let createdAt: Date;
          if (projectData.createdAt) {
            try {
              // Handle Firestore Timestamp or Date object
              const dateValue = projectData.createdAt;
              if (
                dateValue &&
                typeof dateValue === "object" &&
                "toDate" in dateValue
              ) {
                // Firestore Timestamp
                createdAt = (dateValue as any).toDate();
              } else if (dateValue instanceof Date) {
                // Already a Date object
                createdAt = dateValue;
              } else {
                // Try to create from string or timestamp
                createdAt = new Date(dateValue);
              }

              // Validate the date
              if (isNaN(createdAt.getTime())) {
                createdAt = new Date();
              }
            } catch (error) {
              console.warn("Invalid date, using current date:", error);
              createdAt = new Date();
            }
          } else {
            createdAt = new Date();
          }

          setFormData({
            title: projectData.title,
            description: projectData.description,
            demoLink: projectData.demoLink || "",
            repoLink: projectData.repoLink || "",
            technologies: projectData.technologies || [],
            images: projectData.images || [],
            createdAt: createdAt,
            isHighlighted: projectData.isHighlighted || false,
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      const newDate = new Date(value);
      if (!isNaN(newDate.getTime())) {
        setFormData((prev) => ({
          ...prev,
          createdAt: newDate,
        }));
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, tech],
    }));
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
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
        createdAt: formData.createdAt || new Date(),
        isHighlighted: formData.isHighlighted || false,
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
        <div className="container">
          <LoadingSpinner />
        </div>
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

      <div className="container">
        <form className="project-form" onSubmit={handleSubmit}>
          {/* Project Title */}
          <FormField
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Project Title"
            required
          />

          {/* Project Date */}
          <FormField
            label="Project Date"
            name="createdAt"
            type="date"
            value={
              formData.createdAt && !isNaN(formData.createdAt.getTime())
                ? formData.createdAt.toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            onDateChange={handleDateChange}
            required
          />

          {/* Featured Project Toggle */}
          <div className="form-field">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isHighlighted"
                checked={formData.isHighlighted || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isHighlighted: e.target.checked,
                  }))
                }
                className="checkbox-input"
              />
              <span className="checkbox-text">Mark as Featured Project</span>
              <small className="checkbox-help">
                Featured projects will be highlighted in the portfolio
              </small>
            </label>
          </div>

          {/* Project Images */}
          <FormField
            label="Project Images"
            name="images"
            type="file"
            onFileChange={handleImageChange}
            accept="image/*"
            multiple
          >
            <ImagePreview
              title="Existing Images"
              images={formData.images || []}
              onRemove={handleRemoveExistingImage}
            />
            <ImagePreview
              title="New Images"
              images={newImages}
              onRemove={handleRemoveNewImage}
            />
          </FormField>

          {/* Project Description */}
          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Project Description"
            required
          />

          {/* Project Links */}
          <div className="form-row">
            <FormField
              label="Demo Link (Optional)"
              name="demoLink"
              type="text"
              value={formData.demoLink}
              onChange={handleInputChange}
              placeholder="Live demo URL"
            />
            <FormField
              label="Repository Link (Optional)"
              name="repoLink"
              type="text"
              value={formData.repoLink}
              onChange={handleInputChange}
              placeholder="GitHub repository URL"
            />
          </div>

          {/* Technologies */}
          <TechnologyInput
            technologies={formData.technologies}
            onAddTechnology={handleAddTechnology}
            onRemoveTechnology={handleRemoveTechnology}
          />

          {/* Form Actions */}
          <div className="form-actions">
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
