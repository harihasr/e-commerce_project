export class AddressModel{
    public address_id: number
    public address_line1: string
    public address_line2: string
    public city: string
    public state: string
    public zipcode: string
    public phone: string
    public userId: number

    constructor(address_id: number, address_line1: string, address_line2: string, city: string, state: string, zipcode: string, phone: string){
        this.address_id = address_id;
        this.address_line1 = address_line1;
        this.address_line2 = address_line2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.phone = phone;
        //this.userId = userId;
    }
}