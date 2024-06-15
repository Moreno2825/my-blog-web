import IUserRepo from "@/domain/repositories/IUserRepo";

class GetAllUserUseCase{
    constructor(userRepo){
        if(!(userRepo instanceof IUserRepo))
        throw new Error("userRepo must be instance of IUserRepo");
        this.userRepo = userRepo;
    }

    async run(){
        const getAllUser = await this.userRepo.getAll();
        return getAllUser;
    }
}
 
export default GetAllUserUseCase;