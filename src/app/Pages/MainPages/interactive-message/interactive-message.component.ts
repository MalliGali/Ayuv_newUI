import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { InetractiveMessageService } from 'src/app/services/intractiveService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interactive-message',
  templateUrl: './interactive-message.component.html',
  styleUrls: ['./interactive-message.component.sass']
})
export class InteractiveMessageComponent implements OnInit {
  defaultRowPerPage: any = 3;
  settings = {};
  source: LocalDataSource = new LocalDataSource();
  user: any;
  userRole: any;
  interactiveData: any = [];
  constructor(
    private router: Router,
    private messageService: InetractiveMessageService,
  ) { }

  ngOnInit() {
    this.columnData()
    this.getData()
  }

  async getData() {
    return this.messageService.getMsg().subscribe(async data => {
     data.map(e => {
      if(e.mtsIMState === true) {
        this.interactiveData.push(e);
      }
     })
     return await this.source.load(data);
    },
    (err) => {
      console.log(err)
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
    this.router.navigate([`ineractiveMessage/edit/${e.mtsIMId}`]);
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
        deleteButtonContent: '<i class="fa fa-trash" style="color: red"></i>',
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
        mtsIMTitle: {
          title: 'Title',
          filter: false,
          type: 'text',
          editable: false,
        },
        mtsIMMsg: {
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
        mtsIMCreatedAt: {
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
  onDeleteConfirm(e) {
    Swal.fire({
      heightAuto: false,
      title: 'Are you sure?',
      text: 'Are you sure want to delete this Message Template !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
      
    }).then((result) => {
      this.interactiveData = [];
      if (result.value === true) {
        this.messageService.DeleteMsg(e.data).subscribe(
          (res: any) => {
            Swal.fire({
              heightAuto: false,
              title: 'Deleted!',
              text: 'Interactive Message Template Deleted Successfully',
              icon: 'success',
            }).then(() => {
              this.getData();
            })
          }, (err) => {
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
                text: `Interactive Message Template Deleted Failed!`,
                icon: 'error',
              }).then(() => {
                this.getData();
              })
            }
          }
        );
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
}
