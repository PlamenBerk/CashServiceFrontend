export class DeviceModel{
    constructor(public manufacturer: string,public model: string, public certificate: string,public deviceNumPrefix: string,public fiscalNumPrefix: string, public eik: string){}
}