import IUserRepo from "@/domain/repositories/IUserRepo";

class UpdateUserUseCase {
  constructor(userRepo) {
    if (!(userRepo instanceof IUserRepo))
      throw new Error("userRepo must be instance of IUserRepo");
    this.userRepo = userRepo;
  }

  async run(user) {
    try {
      const updatedUser = this.userRepo.update(user);
      return updatedUser;
    } catch (error) {
      console.log("Error al actualizar user:", error);
      throw error;
    }
  }
}

export default UpdateUserUseCase;
