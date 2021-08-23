import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { InetractiveMessageService } from 'src/app/services/intractiveService';
import { ScheduleMessageService } from 'src/app/services/schduleMessage.service';

@Component({
  selector: 'app-schedule-message',
  templateUrl: './schedule-message.component.html',
  styleUrls: ['./schedule-message.component.sass']
})
export class ScheduleMessageComponent implements OnInit {

  defaultRowPerPage: any = 10;
  settings = {};
  source: LocalDataSource = new LocalDataSource();
  scheduledData: any = [];
  
  constructor(
    private router: Router,
    private messageService: ScheduleMessageService,
  ) { }

  ngOnInit() {
    this.columnData()
    this.getData()
  }

  async getData() {
    this.scheduledData = [];
    return this.messageService.getMsg().subscribe((res: any) => {
      res.map(data => {
        if(data.active === true) {
          this.scheduledData.push(data);
          // console.log(data);
        }
      })
      return this.source.load(this.scheduledData);
    })
  }

  getRowValue(e)  {
    // console.log(e);
    // this.rowValue = e;
  }
  onUserRowSelect(e) {
    // this.dialog(e.data)
  }

  public editRecord(e: any) {
    // this.router.navigate([`client/editClient/${e.id}`]);
    // console.log(e.id)
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'viewrecord':
        // this.viewRecord(event.data);
        break;
      case 'editrecord':
        this.editRecord(event.data);
    }
  }

  columnData() {
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="fa fa-pencil"></i>',
        saveButtonContent: '<i class="fa fa-check"></i>',
        cancelButtonContent: '<i class="fa fa-times"></i>',
      },
      delete: {
        deleteButtonContent: '<i class="fa fa-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        add: false,
          sort: true,
          delete: false,
          edit: false,
          // custom: [
          //   { name: 'editrecord', title: '<i class="fa fa-pencil mt-1 mr-2"></i>' },
          // ],
          // position: 'right',
      },
      pager: {
        display: true,
        perPage: this.defaultRowPerPage,
      },
      columns: {
        SN: {
          title: 'S/N',
          filter: false,
          type: 'number',
          editable: false,
          valuePrepareFunction: (value, row, cell) => {
            // return cell.row.index + 1;
            const pager = this.source.getPaging();
            const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;
            return ret;
          },
        },
        mtshTitle: {
          title: 'Title',
          filter: false,
        },
        mtshMsg: {
          title: 'Message',
          type: 'html',
          filter: false,
          editable: false,
          valuePrepareFunction: (cell, row) => {
            for (let i = 0; i <= cell.length; i++) {
              if(cell[i].mstshMsg.length > 20) {
                return `<span class="text-center">${cell[i].mstshMsg.slice(0, 20)}...</span>`;
              } else {
                return `<span class="text-center">${cell[i].mstshMsg}</span>`;
              }
            }
          },
        },
        mtshCreatedAt: {
          title: 'Created At',
          type: 'html',
          filter: false,
          editable: false,
          valuePrepareFunction: (cell, row) => {
            return `<span class="text-center" >${new Date(cell).toLocaleDateString()}</span>`;
          },
        }
      }
    }
  }

  onDeleteConfirm(e) {
    // return this.clientService.getAll().subscribe(
    //   (res: any) => {
    //     res.map(d => {
    //       // console.log(e.data.id);
    //       if(d.id === e.data.id) {
    //         // console.log(d);
    //         this.clientService.delete(e.data.id).subscribe(
    //           (r) => {
    //             // console.log(r)
    //             this.getAll();
    //           },
    //           (er) => {
    //             console.log(er)
    //           }
    //         )
    //       }
    //     })
    //   }
    // )
  }

}
