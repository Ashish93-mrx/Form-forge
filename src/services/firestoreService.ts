import { collection, addDoc, getDoc, getDocs, doc, deleteDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import type { FormField } from "../types";

export interface FormData {
  id: string;
  title: string;
  subtitle: string;
  fields: FormField[];
  settings: { backgroundColor: string };
}

export const createForm = async (
  userId: string,
  fields: any[],
  settings: any,
  meta: { title: string; subtitle: string }
) => {
  const newForm = {
    title: meta.title,
    subtitle: meta.subtitle, //
    fields,
    settings,
    createdBy: userId,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(collection(db, "forms"), newForm);
  return docRef.id;
};

export const getFormById = async (formId: string) => {
  const docRef = doc(db, "forms", formId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  return {
    id: snapshot.id,
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    fields: data.fields ?? [],
    settings: data.settings ?? { backgroundColor: "#ffffff" }
  };
};


export const saveFormResponse = async (formId: string, responseData: any) => {
  const responseRef = doc(collection(db, "forms", formId, "responses"));
  await setDoc(responseRef, {
    ...responseData,
    submittedAt: Timestamp.now()
  });
};

export const getFormResponses = async (formId: string) => {
  const responsesRef = collection(db, "forms", formId, "responses");
  const snapshot = await getDocs(responsesRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Delete form by ID
export async function deleteForm(formId: string) {
  const ref = doc(db, "forms", formId);
  await deleteDoc(ref);
}


export const getFormsByUser = async (userId: string) => {
  const snapshot = await getDocs(collection(db, "forms"));
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter((form: any) => form.createdBy === userId);
};

export const updateForm = async (
  formId: string,
  updates: {
    title?: string;
    subtitle?: string;
    fields?: any[];
    settings?: any;
  }
) => {
  const ref = doc(db, "forms", formId);
  await setDoc(ref, { ...updates }, { merge: true });
};
