import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'categoryGeneral',
  templateUrl: './categoryGeneral.html',
  entryComponents: []
})

export class CategoryGeneral implements OnInit {

  @Input("categoryDetailForm")
  public categoryDetailForm: FormGroup;

  ngOnInit(): void {

  }
}
