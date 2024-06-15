import IPubRepo from "@/domain/repositories/IPubRepo";

class GetOnePubUseCase {
  constructor(pubRepo) {
    if (!(pubRepo instanceof IPubRepo))
      throw new Error("pubRepo must be instance of IPubRepo");
    this.pubRepo = pubRepo;
  }

  async run(id) {
    const get = this.pubRepo.getUser(id);
    return get;
  }
}

export default GetOnePubUseCase;
