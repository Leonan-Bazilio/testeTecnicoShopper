export default class CustomErrorDTO extends Error {
  statusCode: number;
  errorCode: string;
  errorDescription: string;

  constructor(statusCode: number, errorCode: string, errorDescription: string) {
    super(errorDescription);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}
