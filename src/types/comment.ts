import { UserData } from './user-data';

export type Comment = {
  id: number;
  user: UserData;
  rating: number;
  comment: string;
  date: string;
};

export type Comments = Comment[];
