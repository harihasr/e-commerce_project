export class AddressModel{
    //public addressId: number
    public addressLine1: string
    public addressLine2: string
    public city: string
    public state: string
    public zipcode: string
    public phone: string
    //public userId: number

    constructor(addressLine1: string, addressLine2: string, city: string, state: string, zipcode: string, phone: string){
        //this.addressId = addressId;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.phone = phone;
        //this.userId = userId;
    }
}