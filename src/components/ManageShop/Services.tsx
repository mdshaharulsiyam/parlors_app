import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IServicesInput, IServicesInputError, IServicesInputLabel } from '../../utils/types/Types';

const Services = () => {
  const [inputValue, setInputValue] = useState<IServicesInput>({
    name: '',
    price: '',
    description: '',
    img: '',
    category: '',
    sub_category: '',
  });
  const [error, setError] = useState<IServicesInputError>({
    name: false,
    price: false,
    description: false,
    img: false,
    category: false,
    sub_category: false,
  })
  const [inputLabel, setInputLabel] = useState<IServicesInputLabel>({
    name: 'Name',
    price: 'Price',
    description: 'Description',
    img: 'Image',
    category: 'Category',
    sub_category: 'Sub Category',
  })
  return (
    <View>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})