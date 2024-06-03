import Users from "@/models/user/user";

class UserDao {
  async getAllUsers() {
    try {
      const users = await Users.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await Users.findOne({ email }).select("+password");
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user) {
    try {
      user.rol = "user";
      const createdUser = await Users.create(user);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UserDao;
