import TemporalUserDao from "./TemporalUserDao";
import bcryp from "bcryptjs";

class TemporalUserService {
  constructor() {
    this.dao = new TemporalUserDao();
  }

  /* async getAllUsers() {
    try {
      const users = await this.dao.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  } */

  async getTemporalUserByEmail(email) {
    try {
      const temporalUser = await this.dao.getTemporalUserByEmail(email);
      return temporalUser;
    } catch (error) {
      throw error;
    }
  }

  async createTemporalUser(temporalUser) {
    try {
      const hashedPassword = await bcryp.hash(temporalUser.password, 12);
      temporalUser.password = hashedPassword;
      const createdTemporalUser = this.dao.createTemporalUser(temporalUser);
      return createdTemporalUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteTemporalUserByEmail(email) {
    try {
      const deletedUser = this.dao.deleteTemporalUserByEmail(email);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}

export default TemporalUserService;