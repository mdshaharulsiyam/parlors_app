import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Toast from 'react-native-toast-message';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {
  useChange_passwordMutation,
  useGet_profileQuery,
  useUpdateMutation,
} from '../../Redux/Apis/authApis';
import {hexToRGBA} from '../../utils/hexToRGBA';
const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {themeColors} = useGlobalContext();
  const [image, setImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<any>(null);
  const {data, isLoading} = useGet_profileQuery(undefined);
  const [update, {isLoading: is_updating}] = useUpdateMutation();
  const [change, {isLoading: is_changing}] = useChange_passwordMutation();
  // console.log(data);

  useEffect(() => {
    setName(data?.data?.name);
    setEmail(data?.data?.email);
    setPhone(data?.data?.phone?.toString());
    setImage(data?.data?.profile_image);
  }, [data?.data]);

  const handleProfileUpdate = () => {
    const data = {
      phone,
      email: email,
      name,
    } as any;

    if (newImage) {
      const imageFile = {
        uri: newImage.uri,
        name: newImage?.fileName ?? 'profile.jpg',
        type: newImage?.mimeType ?? 'image/jpeg',
        mimeType: newImage?.mimeType ?? 'image/jpeg',
      };
      data.img = imageFile;
    }
    const formData = new FormData();
    Object.keys(data)?.map(key => {
      const value = data[key as keyof typeof data];
      if (value && (typeof value == 'string' || typeof value == 'object')) {
        formData.append(key, value);
      }
    });

    update(formData)
      .unwrap()
      .then(res => {
        if (res?.success) {
          setImage(res?.data?.img);
          setNewImage(null);
          Toast.show({
            type: 'success',
            text1: 'Profile Updated',
            text2: res?.message ?? 'Profile updated successfully',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Update Failed',
            text2: res?.message ?? 'Something went wrong',
          });
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: err?.data?.message ?? 'Something went wrong',
        });
      });
  };
  const changePassword = () => {
    const data = {
      old_Password: oldPassword,
      password: password,
      confirm_password: confirmPassword,
    };

    change(data)
      .unwrap()
      .then(res => {
        if (res?.success) {
          Toast.show({
            type: 'success',
            text1: 'Password Changed',
            text2: res?.message ?? 'Password changed successfully',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Update Failed',
            text2: res?.message ?? 'Something went wrong',
          });
        }
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Update Failed',
          text2: err?.data?.message ?? 'Something went wrong',
        });
      });
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={themeColors.icon} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'profile' && {
              borderColor: themeColors.icon,
            },
          ]}
          onPress={() => setActiveTab('profile')}>
          <Text
            style={[
              styles.tabText,
              {
                color: themeColors.text,
              },
              activeTab === 'profile' && {
                color: themeColors.icon,
              },
            ]}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'password' && {
              borderColor: themeColors.icon,
            },
          ]}
          onPress={() => setActiveTab('password')}>
          <Text
            style={[
              styles.tabText,
              {
                color: themeColors.text,
              },
              activeTab === 'password' && {
                color: themeColors.icon,
              },
            ]}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <View style={styles.content}>
          <TouchableOpacity style={styles.profileImageContainer}>
            <View
              style={{
                backgroundColor: themeColors.background2,
                borderRadius: 6,
              }}>
              <Image
                source={{
                  uri: image ? image : 'https://via.placeholder.com/100',
                }}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: themeColors.text,
                color: themeColors.text,
              },
            ]}
            placeholderTextColor={hexToRGBA(themeColors.text, 0.6)}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            editable={false}
            style={[
              styles.input,
              {
                borderColor: hexToRGBA(themeColors.text, 0.6),
                color: hexToRGBA(themeColors.text, 0.6),
              },
            ]}
            placeholderTextColor={hexToRGBA(themeColors.text, 0.6)}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={[
              styles.input,
              {
                borderColor: themeColors.text,
                color: themeColors.text,
              },
            ]}
            placeholderTextColor={hexToRGBA(themeColors.text, 0.6)}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            onPress={handleProfileUpdate}
            style={[
              styles.button,
              {
                backgroundColor: themeColors.icon,
              },
            ]}>
            {is_updating ? (
              <ActivityIndicator size="small" color={themeColors.white} />
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: themeColors?.white,
                  },
                ]}>
                Update Profile
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
      {/* Shop Tab */}

      {/* Change Password Tab */}
      {activeTab === 'password' && (
        <View style={styles.content}>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: themeColors.text,
                color: themeColors.text,
              },
            ]}
            placeholderTextColor={hexToRGBA(themeColors.text, 0.6)}
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
            secureTextEntry={!showPassword}
          />
          <TextInput
            style={[
              styles.input,
              {
                borderColor: themeColors.text,
                color: themeColors.text,
              },
            ]}
            placeholderTextColor={hexToRGBA(themeColors.text, 0.6)}
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TextInput
            style={[
              styles.input,
              {
                borderColor: themeColors.text,
                color: themeColors.text,
              },
            ]}
            placeholderTextColor={hexToRGBA(themeColors.text, 0.6)}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}>
            <Text
              style={[
                styles.toggleText,
                {
                  color: themeColors.text,
                },
              ]}>
              {showPassword ? 'Hide All Passwords' : 'Show All Passwords'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={changePassword}
            style={[
              styles.button,
              {
                backgroundColor: themeColors.icon,
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: themeColors?.white,
                },
              ]}>
              {is_changing ? (
                <ActivityIndicator size="small" color={themeColors.white} />
              ) : (
                'Change Password'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {padding: 10, borderBottomWidth: 2, borderColor: 'transparent'},
  tabText: {fontSize: 16},
  content: {alignItems: 'center', width: '100%'},
  profileImageContainer: {position: 'relative', marginBottom: 20},
  profileImage: {width: 100, height: 100, borderRadius: 50},
  uploadIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
    borderRadius: 15,
  },
  uploadText: {fontSize: 18},
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  buttonText: {fontSize: 16, fontWeight: 'bold'},
  toggleButton: {
    marginTop: 10,
    padding: 5,
  },
  toggleText: {
    fontSize: 14,
  },
});

export default Profile;
