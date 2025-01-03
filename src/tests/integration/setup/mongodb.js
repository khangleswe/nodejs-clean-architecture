const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

const connectDatabase = async () => {
  mongoServer = await MongoMemoryServer.create(); // Tạo server MongoDB in-memory
  const uri = mongoServer.getUri(); // Lấy URI kết nối
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to in-memory MongoDB");
};

const disconnectDatabase = async () => {
  await mongoose.connection.dropDatabase(); // Xóa toàn bộ dữ liệu
  await mongoose.connection.close(); // Đóng kết nối
  await mongoServer.stop(); // Dừng MongoDB in-memory
  console.log("Disconnected from in-memory MongoDB");
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
  clearDatabase,
};
