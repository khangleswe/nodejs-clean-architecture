const Post = require("../../../../domain/entities/Post");

describe("Post Entity", () => {
  it("should create a valid post", () => {
    const postData = {
      title: "Test Post",
      content: "This is a test post content",
      authorId: "user123",
    };

    const post = new Post(postData);

    expect(post.title).toBe(postData.title);
    expect(post.content).toBe(postData.content);
    expect(post.authorId).toBe(postData.authorId);
  });

  it("should validate required fields", () => {
    const post = new Post({});

    expect(() => post.validate()).toThrow("Title is required");
  });

  it("should set createdAt and updatedAt on creation", () => {
    const post = new Post({
      title: "Test Post",
      content: "Content",
      userId: "user123",
    });

    expect(post.createdAt).toBeDefined();
    expect(post.updatedAt).toBeDefined();
  });
});
