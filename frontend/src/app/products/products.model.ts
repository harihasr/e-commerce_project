export class ProductsModel{
    public product_id: number;
    public product_name: string;
    public quantity: number;
    public cost: number;

    constructor(product_id: number, product_name: string, quantity: number, cost: number){
        this.product_id = product_id;
        this.product_name = product_name;
        this.quantity = quantity;
        this.cost = cost;
    }
}