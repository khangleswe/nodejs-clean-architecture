class Post {
  constructor({
    id = null,
    title,
    content,
    authorId,
    status = "draft",
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      authorId: this.authorId,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  validate() {
    if (!this.title) throw new Error("Title is required");
    if (!this.content) throw new Error("Content is required");
    if (!this.authorId) throw new Error("Author ID is required");
  }
}

module.exports = Post;
