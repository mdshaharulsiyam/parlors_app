import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {KeyboardStickyView} from 'react-native-keyboard-controller';
import {SafeAreaView} from 'react-native-safe-area-context';
import GradientButton from '../../components/Shared/GradientButton';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

// Dummy message generator wrapped in useMemo
const useDummyMessages = (count: number) => {
  return useMemo(() => {
    const messages = [];
    for (let i = 1; i <= count; i++) {
      messages.push({
        id: i.toString(),
        message: `This is message number ${i}`,
        sender: i % 2 === 0 ? 'me' : 'other',
      });
    }
    return messages;
  }, [count]);
};

const MapMessages = () => {
  const dummyMessages = useDummyMessages(500);
  const {themeColors} = useGlobalContext();
  const black = themeColors.black as string;
  const primary = themeColors.primary as string;
  // reverse memoized
  const reversedMessages = useMemo(
    () => [...dummyMessages].reverse(),
    [dummyMessages],
  );

  const renderItem = useCallback(
    ({item}: any) => (
      <View
        style={[
          styles.messageContainer,
          item.sender === 'me'
            ? {...styles.sentMessage, backgroundColor: hexToRGBA(primary, 0.9)}
            : {
                ...styles.receivedMessage,
                backgroundColor: hexToRGBA(black, 0.2),
              },
        ]}>
        <Text
          style={[
            styles.messageText,
            {
              color: black,
            },
          ]}>
          {item.message}
        </Text>
      </View>
    ),
    [black, primary],
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  return (
    <FlatList
      data={reversedMessages}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      inverted
      style={{flex: 1}}
      initialNumToRender={20}
      maxToRenderPerBatch={20}
      windowSize={10}
      removeClippedSubviews
    />
  );
};

const Messages = () => {
  const [newMessage, setNewMessage] = useState('');
  const {themeColors} = useGlobalContext();
  const black = themeColors.black as string;
  const white = themeColors.white as string;
  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  }, [newMessage]);

  const renderHeader = useCallback(
    () => (
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: hexToRGBA(black, 0.1),
            borderBlockColor: hexToRGBA(black, 0.2),
          },
        ]}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/women/1.jpg'}}
          style={styles.profileImage}
        />
        <View style={styles.headerTextContainer}>
          <Text
            style={[
              styles.name,
              {
                color: hexToRGBA(black, 0.9),
              },
            ]}>
            Alice Smith
          </Text>
          <Text
            style={[
              styles.lastMessageTime,
              {
                color: hexToRGBA(black, 0.7),
              },
            ]}>
            30 minutes ago
          </Text>
        </View>
      </View>
    ),
    [black],
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: hexToRGBA(white, 0.95),
        },
      ]}>
      {renderHeader()}
      <MapMessages />
      <KeyboardStickyView
        style={[
          styles.footerContainer,
          {
            borderTopColor: hexToRGBA(black, 0.2),
            backgroundColor: hexToRGBA(white, 0.95),
          },
        ]}>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: hexToRGBA(black, 0.1),
              color: hexToRGBA(black, 0.9),
            },
          ]}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor={hexToRGBA(black, 0.5)}
        />
        <GradientButton handler={handleSendMessage} padding={8} borderWidth={0}>
          <Text
            style={{
              color: themeColors.constWhite as string,
            }}>
            Send
          </Text>
        </GradientButton>
      </KeyboardStickyView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTextContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#888',
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginLeft: '10%',
    marginRight: '10%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    marginLeft: '20%',
  },
  receivedMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    marginRight: '20%',
  },
  messageText: {
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingLeft: 10,
    marginRight: 10,
  },
});

export default Messages;
