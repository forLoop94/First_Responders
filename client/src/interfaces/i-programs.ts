export interface IProgramsData {
  id: string;
  name: string;
  type: string;
  description: string;
  durationMinutes?: number;
  unitCost: number;
  createdAt: Date;
}
