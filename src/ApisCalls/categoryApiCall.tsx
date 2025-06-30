import { useMemo } from 'react';
import { useGetCategoriesQuery } from '../Redux/Apis/categoryApis';

const useCategoriesApiCall = (categorySearch?: string) => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery({ limit: 10, search: categorySearch, });

  const mappedCategories = useMemo(() => (
    categories?.data?.map((item: any) => ({ label: item?.name, value: item?.id }))
  ), [categories]);

  return {
    categories: mappedCategories,
    isLoading: categoriesLoading,
  };
};
