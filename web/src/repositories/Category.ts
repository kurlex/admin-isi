import ISearchItem from "../components/form/ISearchItem";

class Category implements ISearchItem {
  uid!: string;
  name!: string;
  imageUrl!: string;
  constructor(uid: string, obj: any) {
    this.uid = uid;
    this.imageUrl = obj.image;
    this.name = obj.name;
  }
}

export default Category;
