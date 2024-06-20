import IPubRepo from "@/domain/repositories/IPubRepo";


class DeletePubUseCase {
  constructor(pubRepo) {
    if (!(pubRepo instanceof IPubRepo))
      throw new Error("pubRepo must be instance of IPubRepo");
    this.pubRepo = pubRepo;
  }
  async run(id, userId){
    try {
        const deletePub = this.pubRepo.delete(id, userId);
        return deletePub;
    } catch (error) {
        console.log('Error al eliminar la pub:', error);
        throw error;
    }
  }
}

export default DeletePubUseCase;
