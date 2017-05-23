import {ErrorHandler, Injectable, NgModule} from "@angular/core";
import {ErrorResponse} from "./ErrorResponse";
import {ServerResponseBarService} from "../serverResponseBar/serverResponseBar.service";


@Injectable()
export class HttpErrorHandler /*implements ErrorHandler */ {

  handleError(error): void {
    console.log(error);
    let serverErrors = [];
    let er = error.rejection.json() as ErrorResponse;
    if (er.errorMessage) {
      serverErrors.push(er.errorMessage);
    }
    if (er.validationErrors) {
      for (let det of er.validationErrors) {
        serverErrors.push(det.message);
      }
    }
  }

}

export class HttpErrorModule {
}
