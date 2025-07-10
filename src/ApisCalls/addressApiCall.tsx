import { useMemo } from 'react';
import { useGetDistrictsQuery, useGetDivisionsQuery, useGetUnionsQuery, useGetUpazilasQuery } from '../Redux/Apis/addressApis';

export const useAddressApiCall = ({
  division_id,
  district_id,
  upazilla_id,
  unionSearch,
  districtSearch,
  upazillaSearch,
  divisionSearch,
}: {
  division_id?: string,
  district_id?: string,
  upazilla_id?: string,
  unionSearch?: string,
  districtSearch?: string,
  upazillaSearch?: string,
  divisionSearch?: string,
}) => {
  const { data: divisions, isLoading: isLoadingDiv } = useGetDivisionsQuery({ page: 1, search: divisionSearch, });
  const { data: districts, isLoading: districtLoading } = useGetDistrictsQuery({ division_id, search: districtSearch, });
  const { data: upazilas, isLoading: upazillaLoading } = useGetUpazilasQuery({ district_id, search: upazillaSearch, });
  const { data: unions, isLoading: unionLoading } = useGetUnionsQuery({ upazilla_id, search: unionSearch, });

  const mappedDivisions = useMemo(() => (
    divisions?.data?.map((item: any) => ({ label: item?.name, value: item?.id }))
  ), [divisions]);

  const mappedDistricts = useMemo(() => (
    districts?.data?.map((item: any) => ({ label: item?.name, value: item?.id }))
  ), [districts]);

  const mappedUpazilas = useMemo(() => (
    upazilas?.data?.map((item: any) => ({ label: item?.name, value: item?.id }))
  ), [upazilas]);

  const mappedUnions = useMemo(() => (
    unions?.data?.map((item: any) => ({ label: item?.name, value: item?.id }))
  ), [unions]);

  return {
    divisions: mappedDivisions,
    districts: mappedDistricts,
    upazilas: mappedUpazilas,
    unions: mappedUnions,
    isLoading: isLoadingDiv,
    districtLoading,
    upazillaLoading,
    unionLoading,
  };
};
