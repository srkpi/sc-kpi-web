export interface Event {
  id: string;
  name: string;
  type: 'LECTURE' | 'PRACTICE' | 'LAB';
  teacherName: string;
  startDate: Date;
  endDate: Date;
}
