import { ChartData } from '../../features/reports/components/ReportChart';

export interface ReportSection {
  title: string;
  content: string;
  charts?: {
    type: 'line' | 'bar' | 'pie';
    data: ChartData[];
    options?: {
      title?: string;
      xAxisLabel?: string;
      yAxisLabel?: string;
      colors?: string[];
    };
  }[];
}

export interface ReportGenerationRequest {
  type: 'sales' | 'customer' | 'performance' | 'custom';
  startDate: Date;
  endDate: Date;
  customOptions?: {
    metrics?: string[];
    filters?: {
      field: string;
      value: any;
    }[];
  };
}

export interface ReportGenerationResult {
  title: string;
  summary: string;
  sections: ReportSection[];
  recommendations: string[];
  generatedDate: Date;
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