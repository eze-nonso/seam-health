// @ts-nocheck
import {JsonProperty} from "json-object-mapper";

export class Doctor {
  @JsonProperty()
  public id: number;
  @JsonProperty()
  public name: string;
  @JsonProperty()
  public username: string;
  @JsonProperty()
  public email: string;
  @JsonProperty()
  public phone: string;
  @JsonProperty()
  public city: string;
  @JsonProperty()
  public website: string;

  constructor() {
    this.id = undefined;
    this.name = undefined;
    this.username = undefined;
    this.email = undefined;
    this.phone = undefined;
    this.city = undefined;
    this.website = undefined;
  }
}
