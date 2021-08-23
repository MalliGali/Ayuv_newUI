import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { MessageService } from 'src/app/services/msg.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.sass']
})
export class SingleMessageComponent implements OnInit {
  defaultRowPerPage: any = 10;
  settings = {};
  source: LocalDataSource = new LocalDataSource();
  userRole: any = JSON.parse(localStorage.getItem('user')).authorities[0].authority;
  msgData: any[] = [];
  constructor(
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    // console.log(this.userRole)
      if( this.userRole === 'ROLE_ADMIN') {
        this.getMsgByGp();
      } else if(this.userRole === 'ROLE_SUPER_ADMIN') {
        this.getData();
       }else if(this.userRole === 'HEALTH_CARE_AGENT') {
        this.getMsgByGp();
      } else {
        this.getMsgByGp();
      }
    this.columnData()
  }

  async getData() {
    this.msgData = [];
    return this.messageService.getMsg().subscribe(async (data) => {
      // console.log(data)
      data.map((e: any) => {
        // console.log(e.mtsState)
        if (e.mtsState === true) {
          this.msgData.push(e);
        }
      });
      return this.source.load(data);
    },
      (err) => {
        console.log(err);
      })
  }

  getRowValue(e)  {
    // console.log(e);
    // this.rowValue = e;
  }
  onUserRowSelect(e) {
    // this.dialog(e.data)
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

  public editRecord(e: any) {
    this.router.navigate([`singleMessage/edit/${e.mtsID}`]);
    // console.log(e.id)
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
          delete: true,
          edit: false,
          custom: [
            { name: 'editrecord', title: '<i class="fas fa-edit mr-2"></i>' },
          ],
          position: 'right',
      },
      pager: {
        display: true,
        perPage: this.defaultRowPerPage,
      },
      columns: {
        // SN: {
        //   title: 'SNO',
        //   filter: false,
        //   type: 'number',
        //   editable: false,
        //   valuePrepareFunction: (value, row, cell) => {
        //     // return cell.row.index + 1;
        //     const pager = this.source.getPaging();
        //     const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;
        //     return ret;
        //   },
        // },
        mtsTitle: {
          title: 'Title',
          type: 'text',
          filter: false,
          editable: false,
        },
        mtsMsg: {
          title: 'Message',
          type: 'html',
          filter: false,
          editable: false,
          valuePrepareFunction: (cell, row) => {
            // for (let i = 0; i <= cell.length; i++) {
              // console.log(cell)
              if(cell.length > 20) {
                return `<span class="text-center">${cell.slice(0, 20)}...</span>`;
              } else {
                return `<span class="text-center">${cell}</span>`;
              }
            // }
          },
        },
        mtsCreatedAt: {
          title: 'Created Date',
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
  columnDataSuper() {
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
          delete: true,
          edit: false,
          custom: [
            { name: 'editrecord', title: '<i class="fa fa-pencil mt-1 mr-2"></i>' },
          ],
          position: 'right',
      },
      pager: {
        display: true,
        perPage: this.defaultRowPerPage,
      },
      columns: {
        // SN: {
        //   title: 'S/N',
        //   filter: false,
        //   type: 'number',
        //   editable: false,
        //   valuePrepareFunction: (value, row, cell) => {
        //     // return cell.row.index + 1;
        //     const pager = this.source.getPaging();
        //     const ret = (pager.page - 1) * pager.perPage + cell.row.index + 1;
        //     return ret;
        //   },
        // },
        mtsTitle: {
          title: 'Title'
        },
        mtsMsg: {
          title: 'Message',
          type: 'html',
          filter: true,
          editable: false,
          valuePrepareFunction: (cell, row) => {
            // for (let i = 0; i <= cell.length; i++) {
              // console.log(cell)
              if(cell.length > 20) {
                return `<span class="text-center">${cell.slice(0, 20)}...</span>`;
              } else {
                return `<span class="text-center">${cell}</span>`;
              }
            // }
          },
        },
        mtsCreatedAt: {
          title: 'Created At',
          type: 'html',
          filter: true,
          editable: false,
          valuePrepareFunction: (cell, row) => {
            return `<span class="text-center" >${new Date(cell).toLocaleDateString()}</span>`;
          },
        }
      }
    }
  }

  onDeleteConfirm(e) {
    Swal.fire({
      heightAuto: false,
      title: 'Are you sure?',
      text: 'Are you sure want to delete this Message !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value === true) {
        this.messageService.DeleteMsg(e.data).subscribe(
          (res: any) => {
            Swal.fire({
              heightAuto: false,
              title: 'Deleted!',
              text: 'Single Message Template Deleted Successfully',
              icon: 'success',
            }).then(() => {
              if(this.userRole === 'HEALTH_CARE_AGENT') {
                this.getMsgByGp();
              } else if(this.userRole === 'ROLE_ADMIN') {
                this.getMsgByGp();
              } else {
                this.getData();
              }
              
            })
          },
          (err) => {
            if(err.status === 400) {
              Swal.fire({
                heightAuto: false,
                title: `Error`,
                text: `Created By SuperAdmin!`,
                icon: 'error',
              }).then(() => {
                this.getData();
              })
            } else {
              Swal.fire({
                heightAuto: false,
                title: `Error`,
                text: `Single Message Template Deleted Failed!`,
                icon: 'error',
              }).then(() => {
                this.getData();
              })
            }
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          {
            heightAuto: false,
            title: 'Cancelled',
            text: 'Delete Cancelled !',
            icon: 'error',
          },
        )
      }
    })
  }
  async getMsgByGp() {
    this.msgData = [];
    return await this.messageService.getMsgByGP().subscribe(async (data) => {
      // console.log(data)
      data.map((e: any) => {
        // console.log(e.mtsState)
        if (e.mtsState === true) {
          this.msgData.push(e);
        }
      });
      return this.source.load(data);
    },
      (err) => {
        console.log(err);
      })
  }

}
