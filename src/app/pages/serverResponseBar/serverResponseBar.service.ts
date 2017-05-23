import {Injectable} from "@angular/core";

@Injectable()
export class ServerResponseBarService {

  serverErrors: string[] = [];
  serverMessage: String;

  constructor(){}

  public resetServerMessage():void{
    this.serverErrors = [];
    this.serverMessage = null;
  }
}
