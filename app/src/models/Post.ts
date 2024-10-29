interface Post {
  _id: string;
  ownerId: string;
  caption: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Post;
