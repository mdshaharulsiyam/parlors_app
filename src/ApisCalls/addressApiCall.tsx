import { useGetDistrictsQuery, useGetDivisionsQuery, useGetUnionsQuery, useGetUpazilasQuery } from '../Redux/Apis/addressApis'

export const useAddressApiCall = ({ division_id, district_id, upazilla_id }: { division_id?: string, district_id?: string, upazilla_id?: string }) => {
  const { data: divisions } = useGetDivisionsQuery({ page: 1 })
  const { data: districts } = useGetDistrictsQuery({ division_id })
  const { data: upazilas } = useGetUpazilasQuery({ district_id })
  const { data: unions } = useGetUnionsQuery({ upazilla_id })
  return {
    divisions: divisions?.data?.map((item: any) => ({ label: item?.name, value: item?.id })),
    districts: districts?.data?.map((item: any) => ({ label: item?.name, value: item?.id })),
    upazilas: upazilas?.data?.map((item: any) => ({ label: item?.name, value: item?.id })),
    unions: unions?.data?.map((item: any) => ({ label: item?.name, value: item?.id })),
  }
}
