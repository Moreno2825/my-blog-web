import IPubRepo from "@/domain/repositories/IPubRepo";

class GetOneUserUseCase {
  constructor(pubRepo) {
    if (!(pubRepo instanceof IPubRepo))
      throw new Error("pubRepo must be instance of IPubRepo");
    this.pubRepo = pubRepo;
  }

  async run(id) {
    const get = this.pubRepo.getOne(id);
    return get;
  }
}

export default GetOneUserUseCase;
