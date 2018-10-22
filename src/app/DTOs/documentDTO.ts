export class DocumentDTO{
    constructor(public deviceId: string,public docType: string, public selectedValueValidy: number, public contractNumber: number, public fromDate: string, public toDate: string, public price: string){}
}