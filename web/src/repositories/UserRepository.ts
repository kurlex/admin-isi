import { db, storage } from "../config/Firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore"; // Import necessary functions
import LocalUser from "./LocalUser";
import Category from "./Category";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import IAddPost from "../components/addPost/IAddPost";
import IAddCategory from "../components/addCategory/IAddCategory";
import Post from "../components/ListPost/Post";

export const GetUser = async (uid: string) => {
  try {
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists()
      ? await LocalUser.GetUser({ ...docSnap.data(), uid })
      : null;
  } catch {
    return null;
  }
};

export const GetCategories = async (): Promise<Category[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "Categories"));
    let result: Category[] = [];
    querySnapshot.forEach((doc) =>
      result.push(new Category(doc.id, doc.data()))
    );
    return result;
  } catch {
    return [];
  }
};

export const GetPosts = async (): Promise<Post[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "Articles"));
    let result: Post[] = [];
    querySnapshot.forEach((doc) => result.push(new Post(doc.id, doc.data())));
    return result;
  } catch {
    return [];
  }
};

const UploadImage = async (file: File) => {
  const storageRef = ref(storage, "posts" + file.name);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export const UploadPost = async (
  user: LocalUser | null,
  post: IAddPost
): Promise<boolean> => {
  try {
    const articlesRef = collection(db, "Articles");

    if (!user) return false;
    const categories = user.categories.filter(
      (category) => category.name === post.Category
    );
    if (categories.length !== 1) return false;
    const categoryUid = categories[0].uid;
    const publishedAt = new Date().toISOString();
    let UrlToImage = await UploadImage(post.Image);
    if (!UrlToImage) return false;
    await setDoc(doc(articlesRef), {
      Author: user.firstName + " " + user.lastName,
      Category: categoryUid,
      Description: post.Description,
      Title: post.Title,
      UrlToImage,
      publishedAt,
    });
    return true;
  } catch {
    return false;
  }
};

export const UploadCategory = async (
  user: LocalUser | null,
  categoryToAdd: IAddCategory
): Promise<boolean> => {
  try {
    const articlesRef = collection(db, "Categories");
    if (
      !user ||
      user.categories.some((category) => category.name === categoryToAdd.Name)
    )
      return false;

    let UrlToImage = await UploadImage(categoryToAdd.Image);
    if (!UrlToImage) return false;
    await setDoc(doc(articlesRef), {
      name: categoryToAdd.Name,
      image: UrlToImage,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const RemoveDocument = async (collectionName: string, documentId: string) => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    await deleteDoc(documentRef);
    return true;
  } catch (error) {
    console.error("Error removing document:", error);
    return false;
  }
};

export const DeleteCategory = async (
  user: LocalUser | null,
  categoryToRemove: string
) => {
  if (!user) return false;
  const categories = user.categories.filter(
    (category) => category.name === categoryToRemove
  );
  if (categories.length === 0) return false;
  const categoryUid = categories[0].uid;
  return await RemoveDocument("Categories", categoryUid);
};

export const RemovePost = (postId: string) =>
  RemoveDocument("Articles", postId);
