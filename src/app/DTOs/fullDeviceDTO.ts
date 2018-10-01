export class FullDeviceDTO{
    constructor(public id: number, public sim: string,public deviceNumPostfix: string, public fiscalNumPostfix: string,public napNumber: string,public napDate: Date){}
}