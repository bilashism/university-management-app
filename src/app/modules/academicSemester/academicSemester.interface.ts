import { Model } from 'mongoose';

type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemester = {
  title: 'Autumn' | 'Summer' | 'Fall';
  code: '01' | '02' | '03';
  year: number;
  startMonth: Month;
  endMonth: Month;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
