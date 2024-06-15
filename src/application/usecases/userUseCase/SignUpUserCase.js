import IUserRepo from "@/domain/repositories/IUserRepo";

class SignUpUserUseCase {
    constructor(userRepo) {
        if (!(userRepo instanceof IUserRepo))
            throw new Error("userRepo must be instance of IUserRepo");
        this.userRepo = userRepo;
    }

    async run(user) {
        try {
            const signedUp = await this.userRepo.signUp(user);
            return signedUp;
        } catch (error) {
            console.log("Error signing in user:", error.message);
            throw error;
        }
    }
}

export default SignUpUserUseCase;