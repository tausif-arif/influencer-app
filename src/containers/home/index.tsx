import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LinearGradient } from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

// Modern neon color scheme for influencer platform
const COLORS = {
  primary: '#FF3DFF', // Vibrant pink
  primaryDark: '#CC00CC',
  primaryLight: '#FF80FF',
  secondary: '#00E5FF', // Electric blue
  secondaryDark: '#00B3CC',
  accent: '#FFD600', // Gold
  background: '#0A0A1F', // Deep space blue
  backgroundLight: '#141432',
  card: '#1A1A3E',
  cardDark: '#12122E',
  success: '#00FFB2', // Neon mint
  warning: '#FFB800',
  error: '#FF3366',
  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#252552',
  divider: '#1E1E42',
  gradientStart: '#1A1A3E',
  gradientEnd: '#12122E',
};

// Updated dummy data for influencer analytics
const analyticsData = {
  totalFollowers: 2483921,
  monthlyGrowth: 45.8,
  engagementRate: 8.2,
  totalRevenue: 128450,
  revenueGrowth: 67.3,
  subscriptionTier: 'PRO',
  daysLeft: 25,
  reachStats: {
    views: 12890345,
    likes: 892340,
    shares: 145230,
    comments: 89234,
  },
  contentPerformance: [
    { month: 'Jan', engagement: 65000 },
    { month: 'Feb', engagement: 78000 },
    { month: 'Mar', engagement: 92000 },
    { month: 'Apr', engagement: 108000 },
    { month: 'May', engagement: 125000 },
    { month: 'Jun', engagement: 145000 },
    { month: 'Jul', engagement: 168000 },
    { month: 'Aug', engagement: 185000 },
    { month: 'Sep', engagement: 210000 },
    { month: 'Oct', engagement: 245000 },
    { month: 'Nov', engagement: 278000 },
    { month: 'Dec', engagement: 312000 },
  ],
  audienceBreakdown: [
    { name: '👥 Gen Z', percentage: 45 },
    { name: '👥 Millennials', percentage: 35 },
    { name: '👥 Gen X', percentage: 15 },
    { name: '👥 Others', percentage: 5 },
  ],
  topPlatforms: [
    { name: 'Instagram', value: 42, trend: '+22%', icon: '📸' },
    { name: 'TikTok', value: 35, trend: '+45%', icon: '🎵' },
    { name: 'YouTube', value: 15, trend: '+18%', icon: '🎥' },
    { name: 'Twitter', value: 8, trend: '+12%', icon: '🐦' },
  ],
  upcomingCollabs: [
    { brand: 'Nike', date: 'Dec 15', value: '$15K', status: 'Confirmed' },
    { brand: 'Spotify', date: 'Dec 20', value: '$8K', status: 'Pending' },
    { brand: 'Samsung', date: 'Dec 28', value: '$22K', status: 'In Talks' },
  ]
};

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: string;
  color: string;
  subtitle?: string;
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  height?: number;
  children?: React.ReactNode;
}

// Modern header with subscription status
const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      {Platform.OS === 'ios' && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={20}
        />
      )}
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.headerTitle}>⚡ Creator Hub</Text>
          <Text style={styles.headerSubtitle}>Welcome back, Sarah!</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.subscriptionBadge}>
            <Text style={styles.subscriptionText}>PRO</Text>
            <Text style={styles.subscriptionDays}>25 days left</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.notificationBadge} />
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Updated stat card with modern design
const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color, subtitle }) => {
  return (
    <View style={[styles.statCard]}>
      <LinearGradient
        colors={[color + '20', 'transparent']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.statCardContent}>
        <View style={[styles.statCardIcon, { backgroundColor: `${color}15` }]}>
          <Text style={[styles.statCardIconText]}>{icon}</Text>
        </View>
        <Text style={styles.statCardTitle}>{title}</Text>
        <Text style={[styles.statCardValue, { color }]}>{value}</Text>
        {subtitle && (
          <Text style={styles.statCardSubtitle}>{subtitle}</Text>
        )}
        {change && (
          <View style={[
            styles.statCardChange,
            { backgroundColor: change >= 0 ? `${COLORS.success}15` : `${COLORS.error}15` }
          ]}>
            <Text style={[
              styles.statCardChangeText,
              { color: change >= 0 ? COLORS.success : COLORS.error }
            ]}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.statCardGlow, { backgroundColor: color }]} />
    </View>
  );
};

// Chart card component
const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  subtitle, 
  height = 200,
  children 
}) => {
  return (
    <View style={[styles.chartCard, { height: height + 80 }]}>
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.chartCardHeader}>
        <View>
          <Text style={styles.chartCardTitle}>{title}</Text>
          {subtitle && <Text style={styles.chartCardSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={[styles.chartContainer, { height }]}>
        {children}
      </View>
    </View>
  );
};

// Main dashboard component
const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor={COLORS.background} /> */}
      
      <Header />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick stats */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsContainer}
        >
           <StatCard
            title="Revenue"
            value={`$${analyticsData.totalRevenue.toLocaleString()}`}
            change={analyticsData.revenueGrowth}
            icon="💰"
            color={COLORS.accent}
            subtitle="This month"
          />
          <StatCard
            title="Total Followers"
            value={analyticsData.totalFollowers.toLocaleString()}
            change={analyticsData.monthlyGrowth}
            icon="👥"
            color={COLORS.primary}
            subtitle="Across all platforms"
          />
          <StatCard
            title="Engagement Rate"
            value={`${analyticsData.engagementRate}%`}
            icon="❤️"
            color={COLORS.secondary}
            subtitle="Last 30 days avg."
          />
         
        </ScrollView>

        {/* Reach Statistics */}
        <View style={styles.reachStatsContainer}>
          <Text style={styles.sectionTitle}>📊 Reach Statistics</Text>
          <View style={styles.reachGrid}>
            <View style={styles.reachItem}>
              <Text style={styles.reachValue}>{(analyticsData.reachStats.views / 1000000).toFixed(1)}M</Text>
              <Text style={styles.reachLabel}>Views</Text>
            </View>
            <View style={styles.reachItem}>
              <Text style={styles.reachValue}>{(analyticsData.reachStats.likes / 1000).toFixed(1)}K</Text>
              <Text style={styles.reachLabel}>Likes</Text>
            </View>
            <View style={styles.reachItem}>
              <Text style={styles.reachValue}>{(analyticsData.reachStats.shares / 1000).toFixed(1)}K</Text>
              <Text style={styles.reachLabel}>Shares</Text>
            </View>
            <View style={styles.reachItem}>
              <Text style={styles.reachValue}>{(analyticsData.reachStats.comments / 1000).toFixed(1)}K</Text>
              <Text style={styles.reachLabel}>Comments</Text>
            </View>
          </View>
        </View>

        {/* Platform Performance */}
        <View style={styles.tableCard}>
          <Text style={styles.tableTitle}>🎯 Platform Performance</Text>
          {analyticsData.topPlatforms.map((platform, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.platformInfo}>
                <Text style={styles.platformIcon}>{platform.icon}</Text>
                <Text style={styles.platformName}>{platform.name}</Text>
              </View>
              <View style={styles.tableBarContainer}>
                <LinearGradient
                  colors={[COLORS.primary, COLORS.secondary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.tableBar, { width: `${platform.value}%` }]}
                />
              </View>
              <View style={styles.tableValueContainer}>
                <Text style={styles.tableValue}>{platform.value}%</Text>
                <Text style={[
                  styles.tableTrend,
                  { color: platform.trend.includes('+') ? COLORS.success : COLORS.error }
                ]}>
                  {platform.trend}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Upcoming Collaborations */}
        <View style={styles.collabsCard}>
          <Text style={styles.collabsTitle}>🤝 Upcoming Collaborations</Text>
          {analyticsData.upcomingCollabs.map((collab, index) => (
            <View key={index} style={styles.collabRow}>
              <View style={styles.collabInfo}>
                <Text style={styles.collabBrand}>{collab.brand}</Text>
                <Text style={styles.collabDate}>{collab.date}</Text>
              </View>
              <Text style={styles.collabValue}>{collab.value}</Text>
              <View style={[
                styles.collabStatus,
                { backgroundColor: collab.status === 'Confirmed' ? `${COLORS.success}20` : 
                                collab.status === 'Pending' ? `${COLORS.warning}20` : `${COLORS.primary}20` }
              ]}>
                <Text style={[
                  styles.collabStatusText,
                  { color: collab.status === 'Confirmed' ? COLORS.success :
                          collab.status === 'Pending' ? COLORS.warning : COLORS.primary }
                ]}>{collab.status}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    height: 100,
    width: '100%',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    zIndex: 1000,
    paddingTop:20
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: '100%',
    width: '100%',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '500',
  },
  subscriptionBadge: {
    backgroundColor: `${COLORS.accent}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 16,
  },
  subscriptionText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  subscriptionDays: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.error,
    borderWidth: 2,
    borderColor: COLORS.background,
    zIndex: 1,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  statsContainer: {
    paddingRight: 16,
    marginBottom: 24,
  },
  statCard: {
    width: width * 0.75,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    overflow: 'hidden',
  },
  statCardContent: {
    flex: 1,
  },
  statCardIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statCardIconText: {
    fontSize: 24,
  },
  statCardTitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  statCardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statCardSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  statCardChange: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statCardChangeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statCardGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.15,
    transform: [{ scale: 1.5 }],
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  reachStatsContainer: {
    marginBottom: 24,
  },
  reachGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  reachItem: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  reachValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  reachLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  tableCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
  platformIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  platformName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  tableBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 16,
  },
  tableBar: {
    height: '100%',
    borderRadius: 4,
  },
  tableValueContainer: {
    alignItems: 'flex-end',
    width: 80,
  },
  tableValue: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  tableTrend: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  collabsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
  },
  collabsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  collabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  collabInfo: {
    flex: 1,
  },
  collabBrand: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  collabDate: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  collabValue: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 16,
  },
  collabStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  collabStatusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  chartCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  chartCardSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 4,
    fontWeight: '500',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default AnalyticsDashboard;