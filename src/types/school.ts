export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface School {
  id: string;
  name: string;
  deadline: string;
  applicationFee: number;
  useScoir: boolean;
  useCommonApp: boolean;
  useApplyTexas: boolean;
  useUniversityPortal: boolean;
  events: Event[];
}
