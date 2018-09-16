export class SiteDTO{

    private id: number;
    private name: string;
    private address: string;
    private phone: string;

    constructor(id: number,name: string, address: string, phone: string){
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }

}