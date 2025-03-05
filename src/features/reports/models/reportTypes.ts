import { ChartData } from '../components/ReportChart';

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  description: string;
  createdAt: string;
  status: ReportStatus;
  data?: ReportData;
}

export type ReportType = 'sales' | 'customer' | 'performance' | 'custom';

export type ReportStatus = 'ready' | 'generating' | 'failed';

export interface ReportData {
  summary: string;
  sections: ReportSection[];
  metrics: ReportMetrics;
  recommendations: string[];
  generatedDate: Date;
}

export interface ReportSection {
  title: string;
  content: string;
  charts?: ChartData[];
}

export interface ReportMetrics {
  sales?: SalesMetrics;
  customer?: CustomerMetrics;
  performance?: PerformanceMetrics;
}

export interface SalesMetrics {
  totalRevenue: number;
  salesCount: number;
  averageOrderValue: number;
  topProducts: {
    name: string;
    revenue: number;
    quantity: number;
  }[];
  salesTrend: {
    date: string;
    revenue: number;
    orders: number;
  }[];
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  activeCustomers: number;
  customerSegments: {
    segment: string;
    count: number;
    value: number;
  }[];
  customerRetention: {
    period: string;
    rate: number;
  }[];
}

export interface PerformanceMetrics {
  salesTarget: number;
  actualSales: number;
  achievementRate: number;
  teamPerformance: {
    member: string;
    sales: number;
    target: number;
    conversion: number;
  }[];
  kpis: {
    metric: string;
    value: number;
    target: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}