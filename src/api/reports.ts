import ReportsService from '@services/reports';
import { useQuery } from '@tanstack/react-query';
import { DashBoardSummaryReportHooksReturn } from 'src/types/dashBoardReports';

export function useDashBoardReports(): DashBoardSummaryReportHooksReturn {
  const { data, isLoading, error } = useQuery(['reports'], async () => {
    const res = await ReportsService.list();
    return res?.data;
  });

  return {
    data,
    loading: isLoading,
    error,
  };
}
