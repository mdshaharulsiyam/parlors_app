import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Banner from '../../components/Home/Banner';
import Categories from '../../components/Home/Categories';
import Parlors from '../../components/Home/Parlors';
import TopBerber from '../../components/Home/TopBerber';
import SearchFilterTrigger from '../../components/Shared/SearchFilterTrigger';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const quickActions = [
  {label: 'Book service', route: 'Parlors'},
  {label: 'My bookings', route: 'Bookings'},
  {label: 'Owner tools', route: 'Workspace'},
];

const Home = () => {
  const navigation = useNavigation<any>();
  const {themeColors, height} = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const textColor = themeColors.black as string;
  const surface = hexToRGBA(textColor, 0.05);
  const border = hexToRGBA(textColor, 0.08);

  const data = [
    <HomeHero
      border={border}
      surface={surface}
      textColor={textColor}
      primary={themeColors.primary as string}
      onAction={route => navigation.navigate(route)}
    />,
    <SearchFilterTrigger />,
    <Banner refreshing={refreshing} />,
    <TopBerber refreshing={refreshing} />,
    <Categories refreshing={refreshing} />,
    <Parlors refreshing={refreshing} />,
  ];

  return (
    <SafeAreaView
      style={{
        backgroundColor: themeColors.white as string,
        minHeight: height,
      }}>
      <FlatList
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
          }, 500);
        }}
        refreshing={refreshing}
        onEndReachedThreshold={0.5}
        data={data}
        renderItem={({item}) => item}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

type HomeHeroProps = {
  border: string;
  surface: string;
  textColor: string;
  primary: string;
  onAction: (route: string) => void;
};

const HomeHero = ({
  border,
  surface,
  textColor,
  primary,
  onAction,
}: HomeHeroProps) => {
  return (
    <View style={[styles.hero, {borderColor: border}]}>
      <Text style={[styles.kicker, {color: primary}]}>Salon booking</Text>
      <Text style={[styles.title, {color: textColor}]}>
        Find the right parlor, reserve a slot, and keep every visit on track.
      </Text>
      <View style={styles.actionRow}>
        {quickActions.map(action => (
          <TouchableOpacity
            key={action.label}
            activeOpacity={0.82}
            onPress={() => onAction(action.route)}
            style={[
              styles.actionButton,
              {
                backgroundColor: action.route === 'Parlors' ? primary : surface,
              },
            ]}>
            <Text
              numberOfLines={1}
              style={[
                styles.actionText,
                {
                  color: action.route === 'Parlors' ? '#FFFFFF' : textColor,
                },
              ]}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.policyStrip, {backgroundColor: surface}]}>
        <View style={styles.policyItem}>
          <Text style={[styles.policyValue, {color: textColor}]}>2h</Text>
          <Text
            style={[styles.policyLabel, {color: hexToRGBA(textColor, 0.62)}]}>
            free cancel window
          </Text>
        </View>
        <View style={styles.policyItem}>
          <Text style={[styles.policyValue, {color: textColor}]}>UTC</Text>
          <Text
            style={[styles.policyLabel, {color: hexToRGBA(textColor, 0.62)}]}>
            reliable slot storage
          </Text>
        </View>
        <View style={styles.policyItem}>
          <Text style={[styles.policyValue, {color: textColor}]}>Pts</Text>
          <Text
            style={[styles.policyLabel, {color: hexToRGBA(textColor, 0.62)}]}>
            loyalty after visits
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 92,
    gap: 22,
    paddingHorizontal: 12,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 18,
    marginTop: 6,
    gap: 16,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
  policyStrip: {
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
  },
  policyItem: {
    flex: 1,
    minWidth: 0,
  },
  policyValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  policyLabel: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 15,
  },
});

export default Home;
