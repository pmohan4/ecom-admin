import {isNumber, toInteger, padNumber} from "@ng-bootstrap/ng-bootstrap/util/util";
import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";


export class NgbDateISOParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {

    if (value) {
      const dateParts = value.trim().split('-');
      return {day:toInteger(dateParts[0]) , month: toInteger(dateParts[1]), year: toInteger(dateParts[2]) };
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ?
      `${isNumber(date.day) ? padNumber(date.day) : ''}-${isNumber(date.month) ? padNumber(date.month) : ''}-${date.year}` : '';
  }
}
