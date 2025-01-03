const UserRepository = require("../../..//domain/repositories/UserRepository");
const User = require("../../../domain/entities/User");

class MockUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
  }

  async create(userData) {
    const user = new User({ ...userData, id: String(this.users.length + 1) });
    this.users.push(user);
    return user;
  }

  async findById(id) {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async update(id, data) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = new User({ ...this.users[index], ...data });
      return this.users[index];
    }
    return null;
  }

  async delete(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

module.exports = MockUserRepository;
