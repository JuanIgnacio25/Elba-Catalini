import temporalUsers from "@/models/temporalUser/temporalUser";

class TemporalUserDao {
  constructor(){
    this.collection = temporalUsers;
  }

  /* async getAllUsers() {
    try {
      const users = await this.collection.find();
      return users;
    } catch (error) {
      throw error;
    }
  } */

  async getTemporalUserByEmail(email) {
    try {
      const temporalUser = await this.collection.findOne({ email }).select("+password");
      return temporalUser;
    } catch (error) {
      throw error;
    }
  }

  async createTemporalUser(temporalUser) {
    try {
      const createdTemporalUser = await this.collection.create(temporalUser);
      return createdTemporalUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteTemporalUserByEmail(email){
    try {
      const deletedUser = await this.collection.findOneAndDelete({email:email});
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}

export default TemporalUserDao;