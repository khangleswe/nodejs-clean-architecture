class PostRepository {
  create(postData) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  findById(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  findByAuthor(authorId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  update(id, data) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  delete(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  list(filters) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = PostRepository;
