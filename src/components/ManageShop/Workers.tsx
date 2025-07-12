import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../../constant/styles';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {conversations} from '../../screens/drawer/Chat';
import SingleSelectDropDown from '../../screens/drawer/SingleSelectDropDown';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {ScreenParamsType} from '../../utils/types/ScreenParamsType';
import {IConversation} from '../../utils/types/Types';
import GradientButton from '../Shared/GradientButton';

const Workers = () => {
  const {themeColors} = useGlobalContext();
  const [totalWorkers, setTotalWorkers] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [inputValue, setInputValue] = useState<{workers: string}>({
    workers: '',
  });
  const [error, setError] = useState<{workers: boolean}>({
    workers: false,
  });
  return (
    <View>
      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Workers (optional)</Text>
        <SingleSelectDropDown
          name={'workers'}
          data={[{label: 'workers', value: 'workers'}]}
          value={inputValue?.workers}
          inputValue={inputValue}
          placeholder="workers"
          setInputValue={setInputValue}
          setError={setError}
          error={error}
        />
      </View>
      <GradientButton handler={() => {}}>
        {isUpdating ? (
          <ActivityIndicator
            size="small"
            color={themeColors.constWhite as string}
          />
        ) : (
          <Text
            style={[
              styles.buttonText,
              {
                color: themeColors.constWhite as string,
                textAlign: 'center',
                textTransform: 'capitalize',
              },
            ]}>
            add new worker
          </Text>
        )}
      </GradientButton>
      <WorkerList />
    </View>
  );
};
const WorkerList = () => {
  const navigate = useNavigation<StackNavigationProp<ScreenParamsType>>();
  const {themeColors} = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const filteredConversations = conversations.filter(
    conversation =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.message.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const black = themeColors.black as string;
  const white = themeColors.white as string;
  const renderItem = ({item}: {item: IConversation}) => (
    <TouchableOpacity
      // onPressIn={ }
      style={[
        styles.chatItem,
        {
          backgroundColor: hexToRGBA(black, 0.1),
        },
      ]}
      onPress={() =>
        navigate.navigate('Tabs', {
          screen: 'Stacks',
          params: {
            screen: 'Messages',
            params: {id: item._id?.toString()},
          },
        })
      }>
      <Image source={{uri: item.img}} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text
          style={[
            styles.name,
            {
              color: hexToRGBA(black, 0.9),
            },
          ]}>
          {item.name}
        </Text>
        <Text
          style={[
            styles.message,
            {
              color: hexToRGBA(black, 0.7),
            },
          ]}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: hexToRGBA(white, 0.95),
        },
      ]}>
      <TextInput
        style={[
          styles.searchBar,
          {
            color: black,
            backgroundColor: hexToRGBA(black, 0.1),
            borderColor: hexToRGBA(themeColors.primary as string, 0.1),
          },
        ]}
        placeholder="Search..."
        placeholderTextColor={hexToRGBA(black, 0.6)}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text
        style={[
          globalStyles.inputLabel,
          {
            color: hexToRGBA(themeColors.black as string, 0.8),
          },
        ]}>
        Total Workers: {filteredConversations?.length}
      </Text>
      {/* Chat List */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredConversations}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};
export default Workers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  selectContainer: {
    marginBottom: 8,
  },
  selectHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {fontSize: 16, fontWeight: 'bold'},
  chatList: {
    padding: 10,
  },
  searchBar: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    marginTop: 5,
  },
});
