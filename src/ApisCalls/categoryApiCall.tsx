import { useMemo } from 'react';
import { useGetCategoriesQuery, useGetSubCategoriesQuery } from '../Redux/Apis/categoryApis';

const useCategoriesApiCall = (categorySearch?: string, subCategorySearch?: string) => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery({ search: categorySearch, });
  const { data: subCategories, isLoading: subCategoriesLoading } = useGetSubCategoriesQuery({ search: subCategorySearch, });
  const mappedCategories = useMemo(() => (
    categories?.data?.map((item: any) => ({ label: item?.name, value: item?.id }))
  ), [categories]);

  const mappedSubCategories = useMemo(() => (
    subCategories?.data?.map((item: any) => ({ label: item?.name, value: item?.id }))
  ), [subCategories]);

  return {
    categories: mappedCategories,
    subCategories: mappedSubCategories,
    isLoading: categoriesLoading,
    subCategoriesLoading,
  };
};
