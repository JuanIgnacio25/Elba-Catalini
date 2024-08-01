import UserDao from "./UserDao";
import bcryp from "bcryptjs";
import sendRecoveryTokenMail from "@/utils/mail/sendRecoveryTokenMail";
import generateRecoveryToken from "@/utils/token/generateRecoveryToken";

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

  async getUserById(id) {
    try {
      const user = await this.dao.getUserById(id);
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

  async createRecoveryTokenAndSendEmail(email, userId) {
    try {
      const recoveryToken = generateRecoveryToken(userId);
      await this.dao.createRecoveryToken(email, recoveryToken);
      await sendRecoveryTokenMail(email, recoveryToken);
    } catch (error) {
      throw error;
    }
  }

  /*hashea la contraseña , llama al dao para actualizarla en la base de datos
   y llama al dao para setear a "" y null recoveryToken y recoveryTokenExpires*/
  async changeUserPassword(userId, password) {
    try {
      const hashedPassword = await bcryp.hash(password, 12);
      await this.dao.changeUserPassword(userId, hashedPassword);
      await this.dao.cleanRecoveryToken(userId);
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
