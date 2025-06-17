import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { commonStyles } from '../../utils/styles/Styles';
import { ICategory } from '../../utils/types/Types';
import CategoryCard from '../Shared/CategoryCard';
const category: ICategory[] = [
  {
    _id: '1',
    category: 'Beard Styling',
    img: 'https://placehold.co/400x400.png?text=0',
  },
  {
    _id: '2',
    category: 'Haircuts',
    img: 'https://placehold.co/400x400.png?text=0',
  },
  {
    _id: '3',
    category: 'Shaving',
    img: 'https://placehold.co/400x400.png?text=0',
  },
  {
    _id: '4',
    category: 'Beard Styling',
    img: 'https://placehold.co/400x400.png?text=0',
  },
  {
    _id: '5',
    category: 'Haircuts',
    img: 'https://placehold.co/400x400.png?text=0',
  },
  {
    _id: '6',
    category: 'Shaving',
    img: 'https://placehold.co/400x400.png?text=0',
  },
  {
    _id: '7',
    category: 'Beard Styling',
    img: 'https://placehold.co/400x400.png?text=0',
  },
  {
    _id: '8',
    category: 'Haircuts',
    img: 'https://placehold.co/400x400.png?text=0',
  },
  {
    _id: '9',
    category: 'Shaving',
    img: 'https://placehold.co/400x400.png?text=0',
  },
  {
    _id: '10',
    category: 'Beard Styling',
    img: 'https://placehold.co/400x400.png?text=0',
  },
];

const Categories = () => {
  const { themeColors } = useGlobalContext();
  const ref = useRef<FlatList<any | null>>(null);
  const [Index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % category?.length;
        if (ref.current) {
          ref.current?.scrollToOffset({
            offset: nextIndex * 100 + 10 * nextIndex,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [ref, category?.length]);

  return (
    <View style={{ paddingHorizontal: 5 }}>
      <Text style={[commonStyles.headerText, { color: themeColors.black as string }]}>
        Categories
      </Text>
      <FlatList
        ref={ref}
        data={category}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={item => item?._id}
        renderItem={({ item }) => <CategoryCard item={item} />}
      />
    </View>
  );
};

export default Categories;
