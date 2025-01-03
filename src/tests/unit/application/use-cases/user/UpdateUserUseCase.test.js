const UpdateUserUseCase = require("../../../../../application/use-cases/user/UpdateUserUseCase");
const MockUserRepository = require("../../../../mocks/repositories/MockUserRepository");
const LoggerService = require("../../../../../infrastructure/logging/WinstonLogger");

describe("UpdateUserUseCase", () => {
  let updateUserUseCase;
  let mockUserRepository;
  let logger;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    logger = new LoggerService();
    updateUserUseCase = new UpdateUserUseCase({
      userRepository: mockUserRepository,
      logger,
    });
  });

  it("should update user successfully", async () => {
    const userId = "user123";
    const existingUser = {
      id: userId,
      name: "Old Name",
      email: "old@example.com",
    };

    mockUserRepository.users = [existingUser];

    const updateData = {
      name: "New Name",
    };

    const updatedUser = await updateUserUseCase.execute(userId, updateData);

    expect(updatedUser.name).toBe(updateData.name);
    expect(updatedUser.email).toBe(existingUser.email);
  });

  it("should throw error for non-existent user", async () => {
    const userId = "nonexistent";
    const updateData = {
      name: "New Name",
    };

    await expect(updateUserUseCase.execute(userId, updateData)).rejects.toThrow(
      "User not found"
    );
  });
});
