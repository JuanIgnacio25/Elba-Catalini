import UserDao from "./UserDao";
import bcryp from "bcryptjs";

class UserService {
  constructor() {
    this.dao = new UserDao();
  }

  async getAllUsers() {
    try {
      const users = await this.dao.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.dao.getUserByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user) {
    try {
      const hashedPassword = await bcryp.hash(user.password, 12);
      user.password = hashedPassword;
      const createdUser = this.dao.createUser(user);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;