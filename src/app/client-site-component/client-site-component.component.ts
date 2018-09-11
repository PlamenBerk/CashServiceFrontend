import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import { CashRegisterService } from '../providers/cash-register.service';
import { ViewChildren } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { ComponentFactory } from '@angular/core';

@Component({
  selector: 'client-site-component',
  styleUrls: ['client-site-component.component.css'],
  templateUrl: 'client-site-component.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientSiteComponentComponent {
  private selectedTab = 0;
  expandedRow: number;
 clientResults: Array<any>;
  dataSource;
  columnsToDisplay = ['name', 'bulstat', 'egn', 'address', 'tdd', 'comment', 'managerName', 'managerPhone'];
  columnsToDisplay2 = ['name', 'bulstat', 'egn', 'address', 'tdd', 'comment', 'managerName', 'managerPhone','name', 'bulstat', 'egn'];
  columnHeaders = ['Име','Бул','ЕГН','Адрес','ТДД', 'Коментар', 'меринджей', 'телефон'];
  DTOAttributes = ['name', 'bulstat', 'egn', 'address', 'tdd', 'comment', 'managerName', 'managerPhone'];
  constructor(private clientService: CashRegisterService) { 
    
  }

  ngOnInit() {
    this.clientResults = [];
    this.clientService.getAllClients().subscribe(clientResults => {
      this.clientResults = clientResults;
      this.dataSource = new MatTableDataSource(this.clientResults);
      console.table(clientResults);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showSites(row: any){
    console.log(row);
  }

}