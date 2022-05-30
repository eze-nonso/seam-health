import {Component} from '@angular/core';
import {AppState} from "src/app/states/app.state";
import {PaginationInstance} from "ngx-pagination";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'seam-health';
  public paginateInfo: PaginationInstance = {itemsPerPage: 5, currentPage: 1};

  constructor(public appState: AppState, private _bp: BreakpointObserver, private _snackbar: MatSnackBar) {
    this.appState.fetchDoctors();
    this._bp.observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(value => this.paginateInfo.itemsPerPage = value.matches ? 5 : 10);
  }

  public notifyAdd(): void {
    this._snackbar.open('New Doctor added!', 'Close', {
      duration: 3000
    });
  }
}
