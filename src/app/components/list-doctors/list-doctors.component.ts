import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Doctor} from "src/app/models/doctor.model";
import {PaginationInstance} from "ngx-pagination";

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.scss']
})
export class ListDoctorsComponent {
  public columns: { key: string, header: string }[] = [{
    key: 'name',
    header: 'Name'
  },
    {
      key: 'username',
      header: 'Username'
    },
    {
      key: 'email',
      header: 'Email'
    },
    {
      key: 'phone',
      header: 'Phone'
    }, {
      key: 'city',
      header: 'City'
    }, {
      key: 'website',
      header: 'Website'
    },
  ];
  @Output() doctorSearch = new EventEmitter<string>();
  @Input() doctors: Doctor[] = [];
  @Input() paginateInfo!: PaginationInstance;
  public displayedColumns = this.columns.map(x => x.key);

  public searchDoctor(event: Event): void {
    this.doctorSearch.emit((event.target as HTMLInputElement).value);
  }

  public changePage(evt: number) {
    console.log(evt);
  }

  public getInfo(): string {
    const totalLength = this.doctors?.length;
    const expectedLastIndex = this.paginateInfo.itemsPerPage * this.paginateInfo.currentPage;
    const lastIndex = expectedLastIndex > totalLength ? totalLength : expectedLastIndex;
    return `Showing ${expectedLastIndex - this.paginateInfo.itemsPerPage + 1} to ${lastIndex} of ${totalLength} doctor${totalLength > 1 ? 's' : ''}`;
  }
}
