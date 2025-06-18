import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useGlobalContext } from '../../Provider/GlobalContextProvider'
import { hexToRGBA } from '../../utils/hexToRGBA'
import { ScreenParamsType } from '../../utils/types/ScreenParamsType'
import { IConversation } from '../../utils/types/Types'

const conversations: IConversation[] = [
  {
    "_id": "1",
    "name": "Alice Johnson",
    "message": "Just finished a great book!",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "2",
    "name": "Brian Smith",
    "message": "Loving this weather today 🌞",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "3",
    "name": "Carla Ruiz",
    "message": "Excited for the weekend!",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "4",
    "name": "Derek Miles",
    "message": "Trying a new recipe tonight.",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "5",
    "name": "Evelyn Brooks",
    "message": "Can’t believe it’s already Thursday!",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "6",
    "name": "Frankie Hill",
    "message": "Morning jogs are the best.",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "7",
    "name": "Grace Lee",
    "message": "Coffee first, always ☕",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "8",
    "name": "Hassan Karim",
    "message": "Watching the new Marvel movie tonight!",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "9",
    "name": "Ivy Chen",
    "message": "Just booked my summer vacation 🌴",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "10",
    "name": "Jackie Daniels",
    "message": "Work grind never stops 💻",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "11",
    "name": "Kevin Lin",
    "message": "Just ran my first 10k!",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "12",
    "name": "Laura Kim",
    "message": "Game night with friends 🎲",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "13",
    "name": "Marco Silva",
    "message": "City lights are magical tonight ✨",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "14",
    "name": "Nina Patel",
    "message": "Reading by the fireplace 🔥",
    "img": "https://placehold.co/600x400.png"
  },
  {
    "_id": "15",
    "name": "Omar Reyes",
    "message": "Weekend hike was worth it 🥾",
    "img": "https://placehold.co/600x400.png"
  }
]

const Chat = () => {
  const navigate = useNavigation<StackNavigationProp<ScreenParamsType>>()
  const { themeColors } = useGlobalContext()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.message.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const black = themeColors.black as string
  const white = themeColors.white as string
  const renderItem = ({ item }: { item: IConversation }) => (
    <TouchableOpacity
      // onPressIn={ } 
      style={styles.chatItem} onPress={() =>
        navigate.navigate('Tabs', {
          screen: 'Stacks',
          params: {
            screen: 'Messages',
            params: { id: item._id?.toString() },
          },
        })
      }>
      <Image source={{ uri: item.img }} style={styles.avatar} />
      <View style={styles.chatDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity >
  )

  return (
    <View style={[styles.container, {
      backgroundColor: hexToRGBA(white, 0.95),
    }]}>
      <TextInput
        style={[styles.searchBar, {
          color: black,
          backgroundColor: hexToRGBA(black, 0.1),
          borderColor: hexToRGBA(themeColors.primary as string, 0.1),
        }]}
        placeholder="Search..."
        placeholderTextColor={hexToRGBA(black, 0.6)}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Chat List */}
      <FlatList
        data={filteredConversations}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.chatList}
      />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  chatList: {
    padding: 10,
  },
  searchBar: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontSize: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
})
