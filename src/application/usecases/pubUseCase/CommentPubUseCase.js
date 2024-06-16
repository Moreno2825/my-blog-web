import IPubRepo from "@/domain/repositories/IPubRepo";

class CommentPubUseCase {
  constructor(pubRepo) {
    if (!(pubRepo instanceof IPubRepo))
      throw new Error("pubRepo must be instance of IPubRepo");
    this.pubRepo = pubRepo;
  }

  async run(pub) {
    try {
      const created = this.pubRepo.createComment(pub);
      return created;
    } catch (error) {
      console.log("Error al crear la pub:", error);
      throw error;
    }
  }
}

export default CommentPubUseCase;
