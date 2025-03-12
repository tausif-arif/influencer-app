import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { COLORS } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const collaborationsData = {
  active: [
    {
      id: '1',
      brand: 'Nike',
      campaign: 'Summer Collection 2024',
      budget: '$5,000',
      deadline: '2024-05-15',
      status: 'In Progress',
      progress: 65,
      deliverables: [
        { type: 'Instagram Post', completed: true },
        { type: 'Instagram Story', completed: true },
        { type: 'TikTok Video', completed: false },
      ],
      logo: 'https://example.com/nike-logo.png',
    },
    {
      id: '2',
      brand: 'Samsung',
      campaign: 'Galaxy S24 Launch',
      budget: '$8,000',
      deadline: '2024-04-30',
      status: 'Review',
      progress: 90,
      deliverables: [
        { type: 'YouTube Video', completed: true },
        { type: 'Instagram Reel', completed: true },
        { type: 'Blog Post', completed: true },
      ],
      logo: 'https://example.com/samsung-logo.png',
    },
  ],
  opportunities: [
    {
      id: '3',
      brand: 'Adidas',
      campaign: 'Sustainability Collection',
      budget: '$3,000-$5,000',
      deadline: '2024-06-01',
      requirements: [
        '2 Instagram Posts',
        '3 Instagram Stories',
        '1 TikTok Video',
      ],
      logo: 'https://example.com/adidas-logo.png',
    },
    {
      id: '4',
      brand: 'Apple',
      campaign: 'Creator Series',
      budget: '$10,000-$15,000',
      deadline: '2024-07-15',
      requirements: [
        '1 YouTube Video',
        '3 Instagram Posts',
        '5 Instagram Stories',
      ],
      logo: 'https://example.com/apple-logo.png',
    },
  ],
  completed: [
    {
      id: '5',
      brand: 'Spotify',
      campaign: 'Playlist Promotion',
      revenue: '$4,500',
      completionDate: '2024-03-15',
      performance: {
        engagement: '4.8%',
        reach: '250K',
        clicks: '12.5K',
      },
      logo: 'https://example.com/spotify-logo.png',
    },
    {
      id: '6',
      brand: 'Amazon',
      campaign: 'Prime Day Promotion',
      revenue: '$7,500',
      completionDate: '2024-03-01',
      performance: {
        engagement: '5.2%',
        reach: '320K',
        clicks: '18.2K',
      },
      logo: 'https://example.com/amazon-logo.png',
    },
  ],
};

const CollaborationsScreen = () => {
  const [activeTab, setActiveTab] = useState('active');

  const renderActiveCollaborations = () => (
    <View>
      {collaborationsData.active.map((collab) => (
        <TouchableOpacity key={collab.id} style={styles.collabCard}>
          <View style={styles.collabHeader}>
            <View style={styles.brandInfo}>
              <View style={styles.logoPlaceholder}>
                <Icon name="business" size={24} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.brandName}>{collab.brand}</Text>
                <Text style={styles.campaignName}>{collab.campaign}</Text>
              </View>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: collab.status === 'Review' ? `${COLORS.warning}20` : `${COLORS.primary}20` }
            ]}>
              <Text style={[
                styles.statusText,
                { color: collab.status === 'Review' ? COLORS.warning : COLORS.primary }
              ]}>{collab.status}</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${collab.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{collab.progress}%</Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Icon name="cash-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>{collab.budget}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="calendar-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>{collab.deadline}</Text>
            </View>
          </View>

          <View style={styles.deliverables}>
            <Text style={styles.deliverablesTitle}>Deliverables</Text>
            {collab.deliverables.map((item, index) => (
              <View key={index} style={styles.deliverableItem}>
                <Icon
                  name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
                  size={20}
                  color={item.completed ? COLORS.success : COLORS.textSecondary}
                />
                <Text style={[
                  styles.deliverableText,
                  item.completed && styles.completedDeliverable
                ]}>{item.type}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderOpportunities = () => (
    <View>
      {collaborationsData.opportunities.map((opp) => (
        <TouchableOpacity key={opp.id} style={styles.collabCard}>
          <View style={styles.collabHeader}>
            <View style={styles.brandInfo}>
              <View style={styles.logoPlaceholder}>
                <Icon name="business" size={24} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.brandName}>{opp.brand}</Text>
                <Text style={styles.campaignName}>{opp.campaign}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Icon name="cash-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>{opp.budget}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="calendar-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.detailText}>{opp.deadline}</Text>
            </View>
          </View>

          <View style={styles.requirements}>
            <Text style={styles.requirementsTitle}>Requirements</Text>
            {opp.requirements.map((req, index) => (
              <View key={index} style={styles.requirementItem}>
                <Icon name="checkmark-circle-outline" size={20} color={COLORS.textSecondary} />
                <Text style={styles.requirementText}>{req}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCompleted = () => (
    <View>
      {collaborationsData.completed.map((collab) => (
        <TouchableOpacity key={collab.id} style={styles.collabCard}>
          <View style={styles.collabHeader}>
            <View style={styles.brandInfo}>
              <View style={styles.logoPlaceholder}>
                <Icon name="business" size={24} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.brandName}>{collab.brand}</Text>
                <Text style={styles.campaignName}>{collab.campaign}</Text>
              </View>
            </View>
            <View style={styles.revenue}>
              <Text style={styles.revenueText}>{collab.revenue}</Text>
            </View>
          </View>

          <View style={styles.completionInfo}>
            <Icon name="calendar-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.completionDate}>Completed on {collab.completionDate}</Text>
          </View>

          <View style={styles.performanceGrid}>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Engagement</Text>
              <Text style={styles.performanceValue}>{collab.performance.engagement}</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Reach</Text>
              <Text style={styles.performanceValue}>{collab.performance.reach}</Text>
            </View>
            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Clicks</Text>
              <Text style={styles.performanceValue}>{collab.performance.clicks}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
          <TouchableOpacity>
            <Icon name="chevron-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Collaborations</Text>
          <TouchableOpacity>
            <Icon name="filter" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'opportunities' && styles.activeTab]}
          onPress={() => setActiveTab('opportunities')}
        >
          <Text style={[styles.tabText, activeTab === 'opportunities' && styles.activeTabText]}>
            Opportunities
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'active' && renderActiveCollaborations()}
        {activeTab === 'opportunities' && renderOpportunities()}
        {activeTab === 'completed' && renderCompleted()}
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
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  collabCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  collabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  campaignName: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    width: 45,
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  deliverables: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  deliverablesTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  deliverableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliverableText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  completedDeliverable: {
    color: COLORS.textPrimary,
    textDecorationLine: 'line-through',
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  applyButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  requirements: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  requirementsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  revenue: {
    backgroundColor: `${COLORS.success}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  revenueText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.success,
  },
  completionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  completionDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default CollaborationsScreen; 