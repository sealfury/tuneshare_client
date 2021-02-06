import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Text, View, Dimensions, TouchableOpacity } from 'react-native'
import User from '../modules/UserService'
import { Avatar, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import PostService from '../modules/PostService'
import { Ionicons } from '@expo/vector-icons'
import styles from '../styles/styles'

const UserProfile = () => {
  const navigation = useNavigation()
  const { userEmail, userPosts, userId, credentials, currentUser } = useSelector(
    state => state
  )

  useEffect(() => {
    User.show(userId, credentials)
  }, [])

  const screenWidth = Dimensions.get('window').width
  const numColumns = 3
  const tileSize = screenWidth / numColumns

  return (
    <View>
      <Text style={styles.userInfo} testID='user-email'>
        {userEmail || currentUser.email}
      </Text>
      {userPosts &&
        userPosts.map((item, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('SinglePost', { post: item })}
          >
            <ListItem testID={`user-post-${item.id}`} key={index}>
              <Avatar
                style={{ height: tileSize, width: tileSize }}
                source={{ uri: item.image }}
              />
              <ListItem.Content>
                <ListItem.Title>{item.track}</ListItem.Title>
                <ListItem.Subtitle>{item.artists}</ListItem.Subtitle>
              </ListItem.Content>
              <Ionicons
                name='trash'
                size={30}
                color='red'
                testID={`delete-button-${item.id}`}
                onPress={() => {
                  PostService.delete(item.id)
                }}
              />
            </ListItem>
          </TouchableOpacity>
        ))}
    </View>
  )
}

export default UserProfile
