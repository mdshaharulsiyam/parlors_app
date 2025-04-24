import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Generate some dummy messages for the component
const generateDummyMessages = (count: number) => {
  const messages = [];
  for (let i = 1; i <= count; i++) {
    messages.push({
      id: i.toString(),
      message: `This is message number ${i}`,
      sender: i % 2 === 0 ? 'me' : 'other',
    });
  }
  return messages;
};

// MapMessages component for rendering message list
const MapMessages = ({ id }: { id: string }) => {
  const [messages, setMessages] = useState(generateDummyMessages(500));

  // Render each individual message
  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'me' ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text style={[styles.messageText]}>{item.message}</Text>
    </View>
  );

  return (
    <FlatList
      data={messages.reverse()}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      inverted={true}
      style={{ flex: 1 }} // Important to make the FlatList take up available space
    />
  );
};

const Messages = (params: any) => {
  const { id } = params.route.params;
  const [newMessage, setNewMessage] = useState('');

  // Function to handle sending the message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would update the messages state here
      console.log('Sending:', newMessage);
      setNewMessage('');
    }
  };

  // Render the header
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }}
        style={styles.profileImage}
      />
      <View style={styles.headerTextContainer}>
        <Text style={styles.name}>Alice Smith</Text>
        <Text style={styles.lastMessageTime}>30 minutes ago</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Render header with profile info */}
      {renderHeader()}

      {/* Messages FlatList */}
      <MapMessages id={id} />

      <View style={styles.footerContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
    backgroundColor: '#0078fe',
    alignSelf: 'flex-end',
    marginLeft: '20%',
  },
  receivedMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    marginRight: '20%',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#0078fe',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Messages;