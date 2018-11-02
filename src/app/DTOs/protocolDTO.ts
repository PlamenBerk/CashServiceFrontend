export class ProtocolDTO{
    constructor(public deviceId: string, public reason: string, public price: string, public aprice: string,
    public bprice: string, public vprice: string, public gprice: string){}
}