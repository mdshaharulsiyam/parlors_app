import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const stats = [
  {label: 'Modules', value: '10'},
  {label: 'Roles', value: '4'},
  {label: 'Edge cases', value: '18'},
  {label: 'Future scope', value: '3'},
];

const roleBoards = [
  {
    role: 'Customer',
    focus: 'Book, cancel, review, earn points',
    color: '#0F766E',
  },
  {
    role: 'Owner',
    focus: 'Services, workers, slots, disputes',
    color: '#1D4ED8',
  },
  {
    role: 'Worker',
    focus: 'Assigned bookings and reminders',
    color: '#7C3AED',
  },
  {
    role: 'Admin',
    focus: 'Approvals, policies, analytics',
    color: '#B45309',
  },
];

const modules = [
  {
    title: 'Booking engine',
    badge: 'Core',
    color: '#C2410C',
    items: [
      'Slot capacity by service',
      'UTC storage, local display',
      'No double booking',
    ],
  },
  {
    title: 'Salon operations',
    badge: 'Owner',
    color: '#1D4ED8',
    items: ['Multi-salon support', 'Worker schedules', 'Open and closed days'],
  },
  {
    title: 'Service catalog',
    badge: 'Revenue',
    color: '#A16207',
    items: ['Duration-based blocking', 'Promo pricing', 'Worker assignment'],
  },
  {
    title: 'Trust and reviews',
    badge: 'Quality',
    color: '#4D7C0F',
    items: [
      'One review per booking',
      '24-hour edit window',
      'Moderation queue',
    ],
  },
  {
    title: 'Loyalty ledger',
    badge: 'Growth',
    color: '#BE185D',
    items: ['Points after completion', 'Bonus for reviews', 'Expiry policy'],
  },
  {
    title: 'Admin control',
    badge: 'Platform',
    color: '#4338CA',
    items: ['Salon approvals', 'Dispute actions', 'Cancellation analytics'],
  },
];

const policyItems = [
  'Free cancellation until 2 hours before a booking',
  'Late cancellation requires admin approval',
  'Owners and workers contact customers instead of declining',
  'Cancelled slots are released immediately',
];

const Workspace = () => {
  const {themeColors} = useGlobalContext();
  const textColor = themeColors.black as string;
  const surface = hexToRGBA(themeColors.black as string, 0.05);
  const border = hexToRGBA(themeColors.black as string, 0.08);

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: themeColors.white as string}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={[styles.hero, {borderColor: border}]}>
          <View>
            <Text
              style={[styles.eyebrow, {color: themeColors.primary as string}]}>
              Parlor command center
            </Text>
            <Text style={[styles.title, {color: textColor}]}>
              Run bookings, staff, loyalty, and policy from one workspace.
            </Text>
          </View>
          <View style={styles.statGrid}>
            {stats.map(item => (
              <View
                key={item.label}
                style={[styles.stat, {backgroundColor: surface}]}>
                <Text style={[styles.statValue, {color: textColor}]}>
                  {item.value}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.statLabel,
                    {color: hexToRGBA(textColor, 0.62)},
                  ]}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: textColor}]}>Roles</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.roleRow}>
            {roleBoards.map(role => (
              <View
                key={role.role}
                style={[
                  styles.roleCard,
                  {borderColor: hexToRGBA(role.color, 0.24)},
                ]}>
                <View
                  style={[styles.roleMark, {backgroundColor: role.color}]}
                />
                <Text style={[styles.roleName, {color: textColor}]}>
                  {role.role}
                </Text>
                <Text
                  style={[
                    styles.roleFocus,
                    {color: hexToRGBA(textColor, 0.66)},
                  ]}>
                  {role.focus}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color: textColor}]}>
              Feature modules
            </Text>
            <Text
              style={[styles.sectionMeta, {color: hexToRGBA(textColor, 0.56)}]}>
              v1 scope
            </Text>
          </View>
          {modules.map(module => (
            <TouchableOpacity
              key={module.title}
              activeOpacity={0.84}
              style={[styles.moduleCard, {borderColor: border}]}>
              <View style={styles.moduleHeader}>
                <View style={styles.moduleTitleRow}>
                  <View
                    style={[styles.moduleDot, {backgroundColor: module.color}]}
                  />
                  <Text style={[styles.moduleTitle, {color: textColor}]}>
                    {module.title}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.badge,
                    {
                      color: module.color,
                      backgroundColor: hexToRGBA(module.color, 0.12),
                    },
                  ]}>
                  {module.badge}
                </Text>
              </View>
              {module.items.map(item => (
                <Text
                  key={item}
                  style={[
                    styles.moduleItem,
                    {color: hexToRGBA(textColor, 0.68)},
                  ]}>
                  {item}
                </Text>
              ))}
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.policyPanel, {backgroundColor: surface}]}>
          <Text style={[styles.sectionTitle, {color: textColor}]}>
            Booking policy
          </Text>
          {policyItems.map(item => (
            <View key={item} style={styles.policyRow}>
              <View
                style={[
                  styles.policyDot,
                  {backgroundColor: themeColors.primary as string},
                ]}
              />
              <Text
                style={[
                  styles.policyText,
                  {color: hexToRGBA(textColor, 0.72)},
                ]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Workspace;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 96,
    gap: 20,
  },
  hero: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 18,
    gap: 18,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '800',
    marginTop: 8,
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  stat: {
    width: '47%',
    borderRadius: 8,
    padding: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  sectionMeta: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  roleRow: {
    gap: 10,
    paddingRight: 16,
  },
  roleCard: {
    width: 168,
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  roleMark: {
    width: 26,
    height: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  roleName: {
    fontSize: 16,
    fontWeight: '800',
  },
  roleFocus: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  moduleCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    gap: 8,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  moduleTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 9,
  },
  moduleDot: {
    width: 9,
    height: 9,
    borderRadius: 9,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '800',
  },
  moduleItem: {
    fontSize: 13,
    lineHeight: 19,
    marginLeft: 18,
  },
  policyPanel: {
    borderRadius: 8,
    padding: 16,
    gap: 10,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  policyDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    marginTop: 6,
  },
  policyText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
});
