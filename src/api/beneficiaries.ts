import BeneficiaryService from '@services/beneficiaries';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import datas from '../_mock/map/lanlon.json';

import {
  BeneficiariesListHookReturn,
  BeneficiaryStatsData,
  IBeneficiariesGeoLocHooksReturn,
  IBeneficiaryApiFilters,
  IBeneficiaryDetails,
} from 'src/types/beneficiaries';

export function useBeneficiaries(params?: IBeneficiaryApiFilters): BeneficiariesListHookReturn {
  const { data, isLoading, error } = useQuery(['beneficiaries', params], async () => {
    const res = await BeneficiaryService.list(params);
    return res;
  });

  const beneficiaries = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    // TEMP for stage
    // beneficiaries: beneficiaryList,
    beneficiaries,
    loading: isLoading,
    error,
    meta,
  };
}

export function useBeneficiary(uuid: string) {
  const { data, isLoading, error } = useQuery(['beneficiaries', uuid], async () => {
    const res = await BeneficiaryService.details(uuid);
    return res;
  });

  const beneficiary = useMemo(() => data?.data || {}, [data?.data]) as IBeneficiaryDetails;

  return {
    beneficiary,
    isLoading,
    error,
  };
}

export function useBeneficiaryStats() {
  const { data, isLoading, error } = useQuery(['beneficiaries'], async () => {
    const res = await BeneficiaryService.getStats();
    return res?.data;
  });

  const genderData = useMemo(
    () =>
      data?.gender
        ? Object?.entries(data?.gender).map(([label, value]) => ({
            label,
            value: +value,
          }))
        : [],
    [data?.gender]
  );

  const internetAccessData = useMemo(
    () =>
      data?.internetAccess
        ? Object?.entries(data?.internetAccess).map(([label, value]) => ({
            label,
            value: +value,
          }))
        : [],
    [data?.internetAccess]
  );

  const phoneOwnershipData = useMemo(
    () =>
      data?.phoneOwnership
        ? Object?.entries(data?.phoneOwnership).map(([label, value]) => ({
            label,
            value: +value,
          }))
        : [],
    [data?.phoneOwnership]
  );

  const bankStatusData: BeneficiaryStatsData[] = useMemo(
    () =>
      data?.bankStatus
        ? Object?.entries(data?.bankStatus).map(([label, value]) => ({
            label,
            value: +value,
          }))
        : [],
    [data?.bankStatus]
  );

  return {
    // fsd: data,
    bankStatusData,
    genderData,
    phoneOwnershipData,
    internetAccessData,
    isLoading,
    error,
  };
}

export function useGeoLocation(): IBeneficiariesGeoLocHooksReturn {
  const { data } = useQuery(['beneficiaries'], async () => {
    const res = await BeneficiaryService.geoLoc();
    return res?.data;
  });

  const geoData = useMemo(
    () =>
      datas?.rows
        ? datas?.rows?.map((item) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [+item?.longitude, +item?.latitude],
            },
          }))
        : [],
    []
  );

  return {
    geoData,
  };
}
