import IPubRepo from "@/domain/repositories/IPubRepo";

class GetAllPubUseCase {
  constructor(pubRepo) {
    if (!(pubRepo instanceof IPubRepo))
      throw new Error("pubRepo must be instance of IPubRepo");
    this.pubRepo = pubRepo;
  }

  async run() {
    const get = this.pubRepo.getAll();
    return get;
  }
}

export default GetAllPubUseCase;
