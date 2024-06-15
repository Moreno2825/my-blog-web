import IOrderRepo from "@/domain/repositories/IOrderRepo";

class DeleteOrderUseCase {
  constructor(orderRepo) {
    if (!(orderRepo instanceof IOrderRepo))
      throw new Error("orderRepo must be instance of IOrderRepo");
    this.orderRepo = orderRepo;
  }

  async run(id){
    try {
        const deleteOrder = this.orderRepo.delete(id);
        return deleteOrder;
    } catch (error) {
        console.log('Error al eliminar la order:', error);
        throw error;
    }
  }
}

export default DeleteOrderUseCase;
