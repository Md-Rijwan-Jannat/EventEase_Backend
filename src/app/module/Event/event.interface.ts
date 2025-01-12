export interface TEvent {
  name: string;
  date: Date;
  location: string;
  maxAttendees: number;
  attendees: string[];
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}
