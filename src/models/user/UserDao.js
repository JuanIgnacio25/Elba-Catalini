import Users from "@/models/user/user";

class UserDao {
  constructor() {
    this.collection = Users;
  }

  async getAllUsers() {
    try {
      const users = await this.collection.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.collection.findOne({ email }).select("+password");
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.collection.findOne({ userId:id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user) {
    try {
      user.rol = "user";
      const createdUser = await this.collection.create(user);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async createRecoveryToken(email, token) {
    try {
      const recoveryTokenExpires = new Date(Date.now() + 3600 * 1000);

      await this.collection.findOneAndUpdate(
        { email },
        {
          recoveryToken: token,
          recoveryTokenExpires,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async changeUserPassword (userId,newPassword){
    try {
      const result = await this.collection.updateOne(
        {userId},
        {
          password:newPassword
        }
      )
      if(result.modifiedCount < 1) throw new Error("Hubo un error al cambiar de contraseña");
    } catch (error) {
      throw error;
    }
  }

  async cleanRecoveryToken(userId){
    try {
      const result = await this.collection.updateOne(
        {userId},
        {
          recoveryToken: "",
          recoveryTokenExpires: null
        }
      )
      if(result.modifiedCount < 1) throw new Error("Hubo un error al cambiar de contraseña");
    } catch (error) {
      throw error;
    }
  }
}

export default UserDao;
