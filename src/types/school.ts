export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface Recommender {
  id: string;
  name: string;
  status: "not-started" | "in-progress" | "completed";
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
  applicationStatus: "not-started" | "in-progress" | "submitted";
  recommenders: Recommender[];
  events: Event[];
}
