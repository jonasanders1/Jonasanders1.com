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
import { db } from "./firebase";
import type { Qualification } from "./types";

/**
 * Save a qualification to Firestore
 * @param qualificationData - Qualification data without id and createdAt
 * @returns The created qualification document ID
 */
export async function saveQualification(
  qualificationData: Omit<Qualification, "id" | "createdAt">
): Promise<string> {
  // Filter out undefined values as Firestore doesn't accept them
  const cleanData = Object.fromEntries(
    Object.entries(qualificationData).filter(([_, value]) => value !== undefined)
  ) as Omit<Qualification, "id" | "createdAt">;

  const qualificationRef = await addDoc(collection(db, "qualifications"), {
    ...cleanData,
    createdAt: Timestamp.now(),
  });
  return qualificationRef.id;
}

/**
 * Get all qualifications from Firestore, ordered by creation date (newest first)
 * @returns Array of qualifications
 */
export async function getQualifications(): Promise<Qualification[]> {
  const qualificationsRef = collection(db, "qualifications");
  const q = query(qualificationsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Qualification[];
}

/**
 * Get a single qualification by ID from Firestore
 * @param qualificationId - The qualification document ID
 * @returns The qualification data or null if not found
 */
export async function getQualification(
  qualificationId: string
): Promise<Qualification | null> {
  const qualificationRef = doc(db, "qualifications", qualificationId);
  const qualificationSnap = await getDoc(qualificationRef);

  if (!qualificationSnap.exists()) {
    return null;
  }

  return {
    id: qualificationSnap.id,
    ...qualificationSnap.data(),
  } as Qualification;
}

/**
 * Update a qualification in Firestore
 * @param qualificationId - The qualification document ID
 * @param qualificationData - Qualification data to update
 */
export async function updateQualification(
  qualificationId: string,
  qualificationData: Partial<Omit<Qualification, "id" | "createdAt">>
): Promise<void> {
  // Filter out undefined values as Firestore doesn't accept them
  const cleanData = Object.fromEntries(
    Object.entries(qualificationData).filter(([_, value]) => value !== undefined)
  );

  const qualificationRef = doc(db, "qualifications", qualificationId);
  await updateDoc(qualificationRef, cleanData);
}

/**
 * Delete a qualification from Firestore
 * @param qualificationId - The qualification document ID
 */
export async function deleteQualification(
  qualificationId: string
): Promise<void> {
  const qualificationRef = doc(db, "qualifications", qualificationId);
  await deleteDoc(qualificationRef);
}

