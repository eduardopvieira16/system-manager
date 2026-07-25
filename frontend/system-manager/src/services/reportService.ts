import { ReportSummary } from "../types";
import api from "./api";

export class ReportService {
  static async getSummary(): Promise<ReportSummary> {
    const response = await api.get<ReportSummary>("/reports/v1/summary");
    return response.data;
  }
}
