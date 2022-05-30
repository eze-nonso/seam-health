import {Injectable} from '@angular/core';
import {AppService} from "src/app/services/app.service";
import {BehaviorSubject, debounceTime, delay, distinctUntilChanged, finalize} from "rxjs";
import {Doctor} from "src/app/models/doctor.model";

@Injectable({
  providedIn: 'root'
})
export class AppState {
  private readonly _doctorDetails = {
    // @ts-ignore
    data: new BehaviorSubject<Doctor[]>(null),
    error: new BehaviorSubject<boolean>(false),
    isLoading: new BehaviorSubject<boolean>(false)
  }
  public doctorDetails$ = {
    data: this._doctorDetails.data.asObservable(),
    error: this._doctorDetails.error.asObservable(),
    isLoading: this._doctorDetails.isLoading.asObservable()
  }
  private readonly _searchTerm = new BehaviorSubject<string>('');
  // @ts-ignore
  private _doctorCache = new BehaviorSubject<Doctor[]>(null);

  constructor(private _service: AppService) {
    this._searchTerm.pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(text => this._doctorDetails.data.next(this.applyFilter(text, this._doctorCache.value)));
  }

  public applyFilter(term: string, doctors: Doctor[]): Doctor[] {
    return doctors?.filter(doctor => `${doctor.username}${doctor.name}`.toLowerCase().includes(term.toLowerCase()));
  }

  public searchDoctor(term: string): void {
    this._searchTerm.next(term)
  }

  public addDoctor(doctor: Doctor): void {
    this._doctorCache.value.unshift(doctor);
    this._searchTerm.next(this._searchTerm.value);
  }

  public fetchDoctors(): void {
    this._doctorDetails.isLoading.next(true);
    this._doctorDetails.error.next(false);
    this._service.getDoctors()
      .pipe(delay(5000), finalize(() => this._doctorDetails.isLoading.next(false)))
      .subscribe({
        error: () => this._doctorDetails.error.next(true), next: (doctors) => {
          this._doctorDetails.data.next(doctors);
          this._doctorCache.next(doctors);
        }
      });
  }
}
