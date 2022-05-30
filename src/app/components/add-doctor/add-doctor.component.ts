import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, NgForm, Validators} from "@angular/forms";
import {Doctor} from "src/app/models/doctor.model";
import {ObjectMapper} from "json-object-mapper";

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {

  @Output() newDoctor = new EventEmitter<Doctor>();
  @ViewChild('docForm') public docFormTpl!: NgForm;
  private _phonePattern = '[0-9]{11}';
  private _urlPattern = 'https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,}';
  public formData = [{
    controlName: 'name', inputType: 'text'
  }, {
    controlName: 'username', inputType: 'text'
  }, {
    controlName: 'email', inputType: 'email'
  }, {
    controlName: 'phone', inputType: 'tel', pattern: this._phonePattern
  }, {
    controlName: 'city', inputType: 'text'
  }, {
    controlName: 'website', inputType: 'url', pattern: this._urlPattern
  }];
  public doctorForm = this._fb.group({
    name: [null, Validators.required],
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.minLength(11), Validators.pattern(this._phonePattern), Validators.maxLength(11)]],
    city: [null, Validators.required],
    website: [null, [Validators.required, Validators.pattern(this._urlPattern)]]
  });

  constructor(private _fb: FormBuilder) {
  }

  public uploadNewDoctor(): void {
    this.newDoctor.next(ObjectMapper.deserialize(Doctor, {
      name: this.doctorForm.get('name')?.value,
      username: this.doctorForm.get('username')?.value,
      email: this.doctorForm.get('email')?.value,
      city: this.doctorForm.get('city')?.value,
      phone: this.doctorForm.get('phone')?.value,
      website: this.doctorForm.get('website')?.value
    }));
    this.docFormTpl.resetForm();
  }

  public getControl(key: string): FormControl | null {
    return this.doctorForm.get(key) as FormControl;
  }

  public getErrorMessage(key: string): string {
    if (this.doctorForm.get(key.toLowerCase())?.errors?.['required']) {
      return `${key} is required`;
    }

    if (this.doctorForm.get(key.toLowerCase())?.errors?.['email']) {
      return `${key} must be an email address`;
    }

    if (this.doctorForm.get(key.toLowerCase())?.errors?.['maxlength'] || this.doctorForm.get(key.toLowerCase())?.errors?.['minlength']) {
      return `${key} must be 11 digits`;
    }

    if (this.doctorForm.get(key.toLowerCase())?.errors?.['pattern']) {
      return key.toLowerCase() === 'phone' ? `${key} must be a phone number` : `${key} must be a url`;
    }

    return '';
  }

}
