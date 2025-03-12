import React, { useState } from 'react';
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

const monetizationData = {
  overview: {
    totalEarnings: 158750,
    monthlyEarnings: 12500,
    pendingPayouts: 3250,
    activeDeals: 8,
  },
  revenueStreams: [
    {
      id: 1,
      name: 'Brand Collaborations',
      amount: 85000,
      growth: 15,
      deals: 12,
    },
    {
      id: 2,
      name: 'Platform Revenue',
      amount: 45000,
      growth: 8,
      views: '2.5M',
    },
    {
      id: 3,
      name: 'Affiliate Marketing',
      amount: 28750,
      growth: 22,
      conversions: 850,
    },
  ],
  opportunities: [
    {
      id: 1,
      brand: 'TechGear Pro',
      type: 'Product Review',
      budget: '5000-8000',
      deadline: '2 weeks',
      status: 'new',
      requirements: ['3 posts', '1 video review', 'Story highlights'],
    },
    {
      id: 2,
      brand: 'FitLife Supplements',
      type: 'Brand Ambassador',
      budget: '10000-15000',
      deadline: '1 month',
      status: 'negotiating',
      requirements: ['Monthly content', 'Event appearance', 'Social promotion'],
    },
  ],
  activeDeals: [
    {
      id: 1,
      brand: 'StyleHub',
      type: 'Fashion Collection',
      value: 12000,
      progress: 65,
      deadline: '5 days',
      deliverables: ['Lookbook', 'Instagram Posts', 'TikTok Series'],
    },
    {
      id: 2,
      brand: 'GreenLife',
      type: 'Sustainability Campaign',
      value: 8500,
      progress: 30,
      deadline: '2 weeks',
      deliverables: ['YouTube Video', 'Instagram Stories', 'Blog Post'],
    },
  ],
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const MonetizationScreen = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderOverviewCard = () => (
    <View style={styles.overviewCard}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overviewGradient}
      >
        <Text style={styles.overviewTitle}>Total Earnings</Text>
        <Text style={styles.overviewAmount}>
          {formatCurrency(monetizationData.overview.totalEarnings)}
        </Text>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStatItem}>
            <Text style={styles.overviewStatLabel}>This Month</Text>
            <Text style={styles.overviewStatValue}>
              {formatCurrency(monetizationData.overview.monthlyEarnings)}
            </Text>
          </View>
          <View style={styles.overviewStatItem}>
            <Text style={styles.overviewStatLabel}>Pending</Text>
            <Text style={styles.overviewStatValue}>
              {formatCurrency(monetizationData.overview.pendingPayouts)}
            </Text>
          </View>
          <View style={styles.overviewStatItem}>
            <Text style={styles.overviewStatLabel}>Active Deals</Text>
            <Text style={styles.overviewStatValue}>
              {monetizationData.overview.activeDeals}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderRevenueStreams = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Revenue Streams</Text>
      {monetizationData.revenueStreams.map(stream => (
        <View key={stream.id} style={styles.streamCard}>
          <View style={styles.streamHeader}>
            <Text style={styles.streamName}>{stream.name}</Text>
            <View style={[
              styles.growthBadge,
              { backgroundColor: stream.growth > 10 ? `${COLORS.success}20` : `${COLORS.warning}20` }
            ]}>
              <Icon
                name={stream.growth > 10 ? 'trending-up' : 'trending-down'}
                size={16}
                color={stream.growth > 10 ? COLORS.success : COLORS.warning}
              />
              <Text style={[
                styles.growthText,
                { color: stream.growth > 10 ? COLORS.success : COLORS.warning }
              ]}>{stream.growth}%</Text>
            </View>
          </View>
          <Text style={styles.streamAmount}>{formatCurrency(stream.amount)}</Text>
          <View style={styles.streamMeta}>
            {stream.deals && (
              <Text style={styles.streamMetaText}>{stream.deals} Deals</Text>
            )}
            {stream.views && (
              <Text style={styles.streamMetaText}>{stream.views} Views</Text>
            )}
            {stream.conversions && (
              <Text style={styles.streamMetaText}>{stream.conversions} Conversions</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderOpportunities = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Opportunities</Text>
      {monetizationData.opportunities.map(opportunity => (
        <View key={opportunity.id} style={styles.opportunityCard}>
          <View style={styles.opportunityHeader}>
            <View>
              <Text style={styles.opportunityBrand}>{opportunity.brand}</Text>
              <Text style={styles.opportunityType}>{opportunity.type}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: opportunity.status === 'new' ? `${COLORS.primary}20` : `${COLORS.warning}20` }
            ]}>
              <Text style={[
                styles.statusText,
                { color: opportunity.status === 'new' ? COLORS.primary : COLORS.warning }
              ]}>{opportunity.status}</Text>
            </View>
          </View>
          <View style={styles.opportunityDetails}>
            <View style={styles.opportunityDetail}>
              <Icon name="cash-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.opportunityDetailText}>{opportunity.budget}</Text>
            </View>
            <View style={styles.opportunityDetail}>
              <Icon name="time-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.opportunityDetailText}>{opportunity.deadline}</Text>
            </View>
          </View>
          <View style={styles.requirementsList}>
            {opportunity.requirements.map((req, index) => (
              <View key={index} style={styles.requirementItem}>
                <Icon name="checkmark-circle-outline" size={14} color={COLORS.success} />
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  const renderActiveDeals = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Active Deals</Text>
      {monetizationData.activeDeals.map(deal => (
        <View key={deal.id} style={styles.dealCard}>
          <View style={styles.dealHeader}>
            <View>
              <Text style={styles.dealBrand}>{deal.brand}</Text>
              <Text style={styles.dealType}>{deal.type}</Text>
            </View>
            <Text style={styles.dealValue}>{formatCurrency(deal.value)}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${deal.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{deal.progress}%</Text>
          </View>
          <View style={styles.dealMeta}>
            <View style={styles.dealMetaItem}>
              <Icon name="time-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.dealMetaText}>{deal.deadline}</Text>
            </View>
            <View style={styles.deliverablesList}>
              {deal.deliverables.map((deliverable, index) => (
                <View key={index} style={styles.deliverableItem}>
                  <Text style={styles.deliverableText}>{deliverable}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );

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
          <Text style={styles.headerTitle}>Monetization</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderOverviewCard()}
        {renderRevenueStreams()}
        {renderOpportunities()}
        {renderActiveDeals()}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  overviewCard: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  overviewGradient: {
    flex: 1,
    padding: 20,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    opacity: 0.8,
  },
  overviewAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  overviewStatItem: {
    alignItems: 'center',
  },
  overviewStatLabel: {
    fontSize: 12,
    color: COLORS.textPrimary,
    opacity: 0.8,
    marginBottom: 4,
  },
  overviewStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  streamCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  streamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  streamName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  growthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  streamAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  streamMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  streamMetaText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  opportunityCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  opportunityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  opportunityBrand: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  opportunityType: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  opportunityDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  opportunityDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  opportunityDetailText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  requirementsList: {
    gap: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  dealCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dealBrand: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  dealType: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dealValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    width: 35,
  },
  dealMeta: {
    gap: 12,
  },
  dealMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealMetaText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  deliverablesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  deliverableItem: {
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  deliverableText: {
    fontSize: 12,
    color: COLORS.primary,
  },
});

export default MonetizationScreen; 