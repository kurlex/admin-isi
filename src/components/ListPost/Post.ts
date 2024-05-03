class Post {
  uid!: string;
  Author!: string;
  Title!: string;
  Description!: string;
  ImageUrl!: string;
  constructor(uid: string, obj: any) {
    this.uid = uid;
    this.Author = obj.Author;
    this.Description = obj.Description;
    this.Title = obj.Title;
    this.ImageUrl = obj.UrlToImage;
  }
}

export default Post;
