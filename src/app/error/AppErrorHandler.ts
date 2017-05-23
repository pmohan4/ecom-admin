import {ErrorHandler, Injectable, NgModule} from "@angular/core";


@Injectable()
export class AppErrorHandler extends ErrorHandler {

  constructor() {
    super(true);
  }

  handleError(error): void {

    let serverErrors = ["problem, can you please retry!"];
    console.log("gobal error");
    console.log(error);
  }

}

@NgModule({
  providers: [{provide: ErrorHandler, useClass: AppErrorHandler}],

})

export class AppErrorModule {
}
