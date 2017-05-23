export class ErrorResponse {

  errorCode: String;
  errorMessage:String;
  devErrorMessage:String;
  validationErrors:Array<ValidationError>;
}

export class ValidationError {
  field:String;
  message:String;
}
