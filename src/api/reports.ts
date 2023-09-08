import ReportsService from '@services/reports';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
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

export function useProjectBasedReport(address: string) {
  const { data } = useQuery(['reports'], async () => {
    const res = await ReportsService.reportByAddress(address);
    return res?.data;
  });

  const genderData = useMemo(
    () =>
      data?.genderCounts
        ? Object?.entries(data?.genderCounts).map(([label, value]) => ({
            label,
            value: +value,
          }))
        : [],
    [data?.genderCounts]
  );

  const internetAccessData = useMemo(
    () =>
      data?.internetAccessCounts
        ? Object?.entries(data?.internetAccessCounts).map(([label, value]) => ({
            label,
            value: +value,
          }))
        : [],
    [data?.internetAccessCounts]
  );

  const phoneOwnershipData = useMemo(
    () =>
      data?.phoneOwnershipCounts
        ? Object?.entries(data?.phoneOwnershipCounts).map(([label, value]) => ({
            label,
            value: +value,
          }))
        : [],
    [data?.phoneOwnershipCounts]
  );

  const bankStatusData = useMemo(
    () =>
      data?.bankStatusCounts
        ? Object?.entries(data?.bankStatusCounts).map(([label, value]) => ({
            label,
            value: +value,
          }))
        : [],
    [data?.bankStatusCounts]
  );

  const meta = useMemo(() => data?.meta || {}, [data?.meta]);
  const totalBudget = useMemo(() => data?.budget || {}, [data?.budget]);
  const totalToken = useMemo(() => data?.token || {}, [data?.token]);

  return {
    genderData,
    internetAccessData,
    phoneOwnershipData,
    bankStatusData,
    meta,
    totalBudget,
    totalToken,
  };
}
