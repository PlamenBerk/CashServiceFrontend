export class ClientDTO {
    public id: number;
    public name: string;
    public egn: string;
    public bulstat: string;
    public address: string;
    public tdd: string;
    public comment: string;
    public managerName: string;
    public managerPhone: string;

    constructor(id: number,name: string,bulstat: string,address: string,comment: string,egn: string,tdd: string,managerName: string,managerPhone: string) {
        this.id = id;
        this.name = name;
        this.bulstat = bulstat;
        this.egn = egn;
        this.address = address;
        this.tdd = tdd;
        this.comment = comment;
        this.managerName = managerName;
        this.managerPhone = managerPhone;
     }
}