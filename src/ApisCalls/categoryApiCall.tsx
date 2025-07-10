import { useMemo } from 'react';
import { useGetCategoriesQuery, useGetSubCategoriesQuery } from '../Redux/Apis/categoryApis';

export const useCategoriesApiCall = ({ categorySearch, subCategorySearch, category }: { categorySearch?: string, subCategorySearch?: string, category?: string }) => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery({ page: 1, search: categorySearch, });
  const { data: subCategories, isLoading: subCategoriesLoading } = useGetSubCategoriesQuery({ search: subCategorySearch, category });
  const mappedCategories = useMemo(() => (
    categories?.data?.map((item: any) => ({ label: item?.name, value: item?._id }))
  ), [categories]);

  const mappedSubCategories = useMemo(() => (
    subCategories?.data?.map((item: any) => ({ label: item?.name, value: item?._id }))
  ), [subCategories]);

  return {
    categories: mappedCategories,
    subCategories: mappedSubCategories,
    isLoading: categoriesLoading,
    subCategoriesLoading,
  };
};
