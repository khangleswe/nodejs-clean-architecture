class UserRepository {
  create(userData) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  findById(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  findByEmail(email) {
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

module.exports = UserRepository;
