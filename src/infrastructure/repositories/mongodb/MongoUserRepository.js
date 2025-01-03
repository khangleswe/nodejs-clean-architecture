const UserModel = require("./models/UserModel");
const User = require("../../../domain/entities/User");
const UserRepository = require("../../../domain/repositories/UserRepository");

class MongoUserRepository extends UserRepository {
  constructor(logger) {
    super();
    this.logger = logger;
  }

  async create(userData) {
    try {
      const user = new UserModel(userData);
      const savedUser = await user.save();
      return new User(savedUser.toObject());
    } catch (error) {
      this.logger.error("MongoDB Create User Error:", error);
      throw error;
    }
  }

  async findById(id) {
    try {
      const user = await UserModel.findById(id);
      return user ? new User(user.toObject()) : null;
    } catch (error) {
      this.logger.error("MongoDB Find User By ID Error:", error);
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user ? new User(user.toObject()) : null;
    } catch (error) {
      this.logger.error("MongoDB Find User By Email Error:", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true }
      );
      return user ? new User(user.toObject()) : null;
    } catch (error) {
      this.logger.error("MongoDB Update User Error:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await UserModel.findByIdAndDelete(id);
    } catch (error) {
      this.logger.error("MongoDB Delete User Error:", error);
      throw error;
    }
  }

  async list(filters = {}) {
    try {
      const users = await UserModel.find(filters);
      return users.map((user) => new User(user.toObject()));
    } catch (error) {
      this.logger.error("MongoDB List Users Error:", error);
      throw error;
    }
  }
}

module.exports = MongoUserRepository;
