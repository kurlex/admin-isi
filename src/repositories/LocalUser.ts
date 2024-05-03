import Category from "./Category";
import { GetCategories } from "./UserRepository";

class LocalUser {
  firstName!: string;
  lastName!: string;
  role!: string;
  uid!: string;
  categories: Category[] = [];
  private constructor(obj: any) {
    this.firstName = obj.FirstName ?? "None";
    this.lastName = obj.LastName ?? "None";
    this.role = obj.Role ?? "Student";
    this.uid = obj.uid;
  }
  static async GetUser(obj: any) {
    var user = new LocalUser(obj);
    await user.updateCategories();
    return user;
  }

  updateCategories = async () => {
    this.categories = await GetCategories();
  };

  isAdmin = () => this.role === "Admin";
}

export default LocalUser;
