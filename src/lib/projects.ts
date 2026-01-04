import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { db, storage } from "./firebase";
import type { Project } from "./types";

/**
 * Upload an image file to Firebase Storage
 * @param file - The image file to upload
 * @param projectId - Optional project ID for organizing files
 * @returns The download URL of the uploaded image
 */
export async function uploadProjectImage(
  file: File,
  projectId?: string
): Promise<string> {
  const timestamp = Date.now();
  const fileName = `${timestamp}-${file.name}`;
  const path = projectId
    ? `projects/${projectId}/${fileName}`
    : `projects/temp/${fileName}`;
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

/**
 * Upload multiple image files to Firebase Storage
 * @param files - Array of image files to upload
 * @param projectId - Optional project ID for organizing files
 * @returns Array of download URLs
 */
export async function uploadProjectImages(
  files: File[],
  projectId?: string
): Promise<string[]> {
  const uploadPromises = files.map((file) =>
    uploadProjectImage(file, projectId)
  );
  return Promise.all(uploadPromises);
}

/**
 * Save a project to Firestore
 * @param projectData - Project data without id and createdAt
 * @returns The created project document ID
 */
export async function saveProject(
  projectData: Omit<Project, "id" | "createdAt">
): Promise<string> {
  // Filter out undefined values as Firestore doesn't accept them
  const cleanData = Object.fromEntries(
    Object.entries(projectData).filter(([_, value]) => value !== undefined)
  ) as Omit<Project, "id" | "createdAt">;

  const projectRef = await addDoc(collection(db, "projects"), {
    ...cleanData,
    createdAt: Timestamp.now(),
  });
  return projectRef.id;
}

/**
 * Get all projects from Firestore, ordered by creation date (newest first)
 * @returns Array of projects
 */
export async function getProjects(): Promise<Project[]> {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}

/**
 * Get a single project by ID from Firestore
 * @param projectId - The project document ID
 * @returns The project data or null if not found
 */
export async function getProject(projectId: string): Promise<Project | null> {
  const projectRef = doc(db, "projects", projectId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    return null;
  }

  return {
    id: projectSnap.id,
    ...projectSnap.data(),
  } as Project;
}

/**
 * Update a project's image URLs in Firestore
 * @param projectId - The project document ID
 * @param imageUrls - Array of image URLs
 */
export async function updateProjectImages(
  projectId: string,
  imageUrls: string[]
): Promise<void> {
  const projectRef = doc(db, "projects", projectId);
  await updateDoc(projectRef, { imageUrls });
}

/**
 * Update a project in Firestore
 * @param projectId - The project document ID
 * @param projectData - Project data to update
 */
export async function updateProject(
  projectId: string,
  projectData: Partial<Omit<Project, "id" | "createdAt">>
): Promise<void> {
  // Filter out undefined values as Firestore doesn't accept them
  const cleanData = Object.fromEntries(
    Object.entries(projectData).filter(([_, value]) => value !== undefined)
  );

  const projectRef = doc(db, "projects", projectId);
  await updateDoc(projectRef, cleanData);
}

/**
 * Delete a project and its associated images from Firestore and Storage
 * @param projectId - The project document ID
 */
export async function deleteProject(projectId: string): Promise<void> {
  // Delete all images in the project folder from Storage
  try {
    const projectFolderRef = ref(storage, `projects/${projectId}`);
    const listResult = await listAll(projectFolderRef);
    
    // Delete all files in the folder
    const deletePromises = listResult.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deletePromises);
  } catch (error) {
    // If folder doesn't exist or error occurs, continue with Firestore deletion
    console.warn("Error deleting project images from storage:", error);
  }

  // Delete the project document from Firestore
  const projectRef = doc(db, "projects", projectId);
  await deleteDoc(projectRef);
}

