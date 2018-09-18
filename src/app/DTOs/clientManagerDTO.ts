export class ClientManagerDTO{
    constructor(public clientDTO: Client,public  managerDTO: Manager){}
}

export class Client{
    constructor(public address: string,public bulstat: string,public comment: string,public egn: string,public name: string,public tdd: string){}   
}

export class Manager{
    
    constructor(public name: string,public phone: string){}
}