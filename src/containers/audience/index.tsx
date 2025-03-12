import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LinearGradient } from 'react-native-linear-gradient';
import { COLORS } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const audienceData = {
  overview: {
    totalFollowers: '2.4M',
    monthlyGrowth: '+125K',
    engagementRate: '4.8%',
    reachRate: '28%',
  },
  demographics: {
    age: [
      { group: '13-17', percentage: 15 },
      { group: '18-24', percentage: 35 },
      { group: '25-34', percentage: 30 },
      { group: '35-44', percentage: 15 },
      { group: '45+', percentage: 5 },
    ],
    gender: [
      { label: 'Female', percentage: 65 },
      { label: 'Male', percentage: 32 },
      { label: 'Other', percentage: 3 },
    ],
    topLocations: [
      { country: 'United States', followers: '850K' },
      { country: 'United Kingdom', followers: '420K' },
      { country: 'Canada', followers: '380K' },
      { country: 'Australia', followers: '250K' },
    ],
  },
  interests: [
    { category: 'Fashion', percentage: 85 },
    { category: 'Beauty', percentage: 75 },
    { category: 'Lifestyle', percentage: 70 },
    { category: 'Travel', percentage: 65 },
    { category: 'Technology', percentage: 55 },
  ],
  activeHours: [
    { hour: '6AM-9AM', engagement: 15 },
    { hour: '9AM-12PM', engagement: 25 },
    { hour: '12PM-3PM', engagement: 45 },
    { hour: '3PM-6PM', engagement: 85 },
    { hour: '6PM-9PM', engagement: 100 },
    { hour: '9PM-12AM', engagement: 65 },
  ],
};

const AudienceScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {Platform.OS === 'ios' && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={20}
          />
        )}
        <View style={styles.headerContent}>
          <TouchableOpacity>
            <Icon name="chevron-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Audience Insights</Text>
          <TouchableOpacity>
            <Icon name="download-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Cards */}
        <View style={styles.overviewGrid}>
          <View style={[styles.overviewCard, { backgroundColor: `${COLORS.primary}20` }]}>
            <Icon name="people-outline" size={24} color={COLORS.primary} />
            <Text style={styles.overviewValue}>{audienceData.overview.totalFollowers}</Text>
            <Text style={styles.overviewLabel}>Total Followers</Text>
          </View>
          <View style={[styles.overviewCard, { backgroundColor: `${COLORS.success}20` }]}>
            <Icon name="trending-up-outline" size={24} color={COLORS.success} />
            <Text style={[styles.overviewValue, { color: COLORS.success }]}>
              {audienceData.overview.monthlyGrowth}
            </Text>
            <Text style={styles.overviewLabel}>Monthly Growth</Text>
          </View>
          <View style={[styles.overviewCard, { backgroundColor: `${COLORS.secondary}20` }]}>
            <Icon name="heart-outline" size={24} color={COLORS.secondary} />
            <Text style={[styles.overviewValue, { color: COLORS.secondary }]}>
              {audienceData.overview.engagementRate}
            </Text>
            <Text style={styles.overviewLabel}>Engagement Rate</Text>
          </View>
          <View style={[styles.overviewCard, { backgroundColor: `${COLORS.accent}20` }]}>
            <Icon name="eye-outline" size={24} color={COLORS.accent} />
            <Text style={[styles.overviewValue, { color: COLORS.accent }]}>
              {audienceData.overview.reachRate}
            </Text>
            <Text style={styles.overviewLabel}>Reach Rate</Text>
          </View>
        </View>

        {/* Demographics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Demographics</Text>
          
          {/* Age Distribution */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Age Distribution</Text>
            {audienceData.demographics.age.map((item, index) => (
              <View key={index} style={styles.barContainer}>
                <Text style={styles.barLabel}>{item.group}</Text>
                <View style={styles.barWrapper}>
                  <View style={[styles.bar, { width: `${item.percentage}%` }]} />
                </View>
                <Text style={styles.barValue}>{item.percentage}%</Text>
              </View>
            ))}
          </View>

          {/* Gender Distribution */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Gender Distribution</Text>
            {audienceData.demographics.gender.map((item, index) => (
              <View key={index} style={styles.barContainer}>
                <Text style={styles.barLabel}>{item.label}</Text>
                <View style={styles.barWrapper}>
                  <View style={[styles.bar, { width: `${item.percentage}%` }]} />
                </View>
                <Text style={styles.barValue}>{item.percentage}%</Text>
              </View>
            ))}
          </View>

          {/* Top Locations */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Top Locations</Text>
            {audienceData.demographics.topLocations.map((item, index) => (
              <View key={index} style={styles.locationItem}>
                <Text style={styles.locationCountry}>{item.country}</Text>
                <Text style={styles.locationFollowers}>{item.followers}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audience Interests</Text>
          <View style={styles.card}>
            {audienceData.interests.map((item, index) => (
              <View key={index} style={styles.interestItem}>
                <View style={styles.interestHeader}>
                  <Text style={styles.interestCategory}>{item.category}</Text>
                  <Text style={styles.interestPercentage}>{item.percentage}%</Text>
                </View>
                <View style={styles.interestBarWrapper}>
                  <View style={[styles.interestBar, { width: `${item.percentage}%` }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Active Hours */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Best Time to Post</Text>
          <View style={styles.card}>
            <View style={styles.activeHoursContainer}>
              {audienceData.activeHours.map((item, index) => (
                <View key={index} style={styles.hourColumn}>
                  <View 
                    style={[
                      styles.hourBar,
                      { height: `${item.engagement}%`, backgroundColor: `${COLORS.primary}${Math.round(item.engagement / 2)}` }
                    ]}
                  />
                  <Text style={styles.hourLabel}>{item.hour}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 90,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: '100%',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  overviewCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 8,
  },
  overviewLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  barLabel: {
    width: 60,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  barWrapper: {
    flex: 1,
    height: 8,
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  barValue: {
    width: 40,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  locationCountry: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  locationFollowers: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '600',
  },
  interestItem: {
    marginBottom: 16,
  },
  interestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  interestCategory: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  interestPercentage: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '600',
  },
  interestBarWrapper: {
    height: 8,
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: 4,
    overflow: 'hidden',
  },
  interestBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  activeHoursContainer: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 24,
  },
  hourColumn: {
    alignItems: 'center',
    width: '15%',
  },
  hourBar: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    marginBottom: 8,
  },
  hourLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default AudienceScreen; 