class User {
  constructor({
    id = null,
    email,
    password,
    name,
    role = "user",
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  validate() {
    if (!this.email) throw new Error("Email is required");
    if (!this.password) throw new Error("Password is required");
    if (!this.name) throw new Error("Name is required");
  }
}

module.exports = User;
