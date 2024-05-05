import Post from "../components/ListPost/Post";
import Category from "./Category";
import { GetCategories, GetPosts } from "./UserRepository";

class LocalUser {
  firstName!: string;
  lastName!: string;
  role!: string;
  uid!: string;
  categories: Category[] = [];
  posts: Post[] = [];
  private constructor(obj: any) {
    this.firstName = obj.FirstName ?? "None";
    this.lastName = obj.LastName ?? "None";
    this.role = obj.Role ?? "Student";
    this.uid = obj.uid;
  }
  static async GetUser(obj: any) {
    var user = new LocalUser(obj);
    await user.updateCategories();
    await user.updatePosts();
    return user;
  }
  updatePosts = async () => {
    this.posts = await GetPosts();
    return this;
  };
  updateCategories = async () => {
    this.categories = await GetCategories();
    return this;
  };

  isAdmin = () => this.role === "Admin";
}

export default LocalUser;
