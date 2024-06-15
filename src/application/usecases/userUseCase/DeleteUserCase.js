import IUserRepo from "@/domain/repositories/IUserRepo";

class DeleteUserUseCase {
  constructor(userRepo) {
    if (!(userRepo instanceof IUserRepo))
      throw new Error("userRepo must be instance of IUserRepo");
    this.userRepo = userRepo;
  }

  async run(userId) {
    try {
      const deletedUser = await this.userRepo.delete(userId);
      return deletedUser;
    } catch (error) {
      console.log("Error deleting user:", error);
      throw error;
    }
  }
}

export default DeleteUserUseCase;
