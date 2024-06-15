import IUserRepo from "@/domain/repositories/IUserRepo";

class GetOneUserCase{
    constructor(userRepo){
        if(!(userRepo instanceof IUserRepo))
        throw new Error("userRepo must be instance of IUserRepo");
        this.userRepo = userRepo;
    }

    async run(userId){
        const user = this.userRepo.getOne(userId);
        return user;
    }
}
export default GetOneUserCase;