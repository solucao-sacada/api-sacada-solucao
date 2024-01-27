export interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUTC(data: Date): string;
  dateNow(): Date;
  compareInDays(startDate: Date, endDate: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
}

