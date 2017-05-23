import {Component, OnDestroy, OnInit} from "@angular/core";

import {ServerResponseBarService} from "./serverResponseBar.service";

@Component({
  selector: 'server-response-bar',
  templateUrl: './serverResponseBar.html',
})
export class ServerResponseBar implements OnInit, OnDestroy {

  constructor(private service: ServerResponseBarService) {
  }

  ngOnInit(): void {
    this.service.serverErrors = [];
    this.service.serverMessage = null;
  }

  ngOnDestroy(): void {
    this.service.serverErrors = [];
    this.service.serverMessage = null;
  }
}
