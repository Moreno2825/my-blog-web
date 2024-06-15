import IPubRepo from "@/domain/repositories/IPubRepo";

class UpdatePubUseCase {
  constructor(pubRepo) {
    if (!(pubRepo instanceof IPubRepo))
      throw new Error("pubRepo must be instance of IPubRepo");
    this.pubRepo = pubRepo;
  }

  async run(id, pub) {
    try {
      const created = this.pubRepo.update(id, pub);
      return created;
    } catch (error) {
      console.log("Error al crear la pub:", error);
      throw error;
    }
  }
}

export default UpdatePubUseCase;
