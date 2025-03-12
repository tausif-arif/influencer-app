import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LinearGradient } from 'react-native-linear-gradient';
import { COLORS } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const profileData = {
  name: 'Sarah Johnson',
  handle: '@sarahcreates',
  bio: 'Digital creator & lifestyle influencer 🌟\nHelping brands tell their story ✨\nTravel • Fashion • Tech',
  location: 'Los Angeles, CA',
  website: 'www.sarahcreates.com',
  stats: {
    followers: '2.4M',
    following: '892',
    posts: '1.2K',
  },
  achievements: [
    { icon: '🏆', title: 'Top Creator', subtitle: '2023' },
    { icon: '💫', title: 'Rising Star', subtitle: 'Fashion' },
    { icon: '🎯', title: '100%', subtitle: 'Brand Safety' },
  ],
  platforms: [
    { name: 'Instagram', followers: '1.2M', engagement: '4.8%', icon: '📸' },
    { name: 'TikTok', followers: '800K', engagement: '6.2%', icon: '🎵' },
    { name: 'YouTube', followers: '400K', engagement: '5.5%', icon: '🎥' },
  ],
  categories: ['Fashion', 'Lifestyle', 'Tech', 'Travel'],
  recentCollabs: [
    { brand: 'Nike', image: 'https://i.pravatar.cc/100?img=1' },
    { brand: 'Apple', image: 'https://i.pravatar.cc/100?img=2' },
    { brand: 'Samsung', image: 'https://i.pravatar.cc/100?img=3' },
    { brand: 'Spotify', image: 'https://i.pravatar.cc/100?img=4' },
  ],
};

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
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
            <Icon name="settings-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Icon name="share-social-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300?img=47' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.handle}>{profileData.handle}</Text>
          <Text style={styles.bio}>{profileData.bio}</Text>
          
          <View style={styles.locationWebsite}>
            <View style={styles.infoRow}>
              <Icon name="location-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>{profileData.location}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="link-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>{profileData.website}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profileData.stats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.insightsButton}>
            <Text style={styles.insightsButtonText}>View Insights</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {profileData.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementSubtitle}>{achievement.subtitle}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Platform Stats */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Platform Performance</Text>
        {profileData.platforms.map((platform, index) => (
          <View key={index} style={styles.platformCard}>
            <View style={styles.platformHeader}>
              <View style={styles.platformInfo}>
                <Text style={styles.platformIcon}>{platform.icon}</Text>
                <Text style={styles.platformName}>{platform.name}</Text>
              </View>
              <TouchableOpacity style={styles.platformButton}>
                <Text style={styles.platformButtonText}>View Stats</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.platformStats}>
              <View style={styles.platformStat}>
                <Text style={styles.platformStatValue}>{platform.followers}</Text>
                <Text style={styles.platformStatLabel}>Followers</Text>
              </View>
              <View style={styles.platformStat}>
                <Text style={styles.platformStatValue}>{platform.engagement}</Text>
                <Text style={styles.platformStatLabel}>Engagement</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Categories */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Content Categories</Text>
        <View style={styles.categoriesContainer}>
          {profileData.categories.map((category, index) => (
            <View key={index} style={styles.categoryTag}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Collaborations */}
      <View style={[styles.sectionContainer, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Recent Collaborations</Text>
        <View style={styles.collabsContainer}>
          {profileData.recentCollabs.map((collab, index) => (
            <View key={index} style={styles.collabItem}>
              <Image source={{ uri: collab.image }} style={styles.collabImage} />
              <Text style={styles.collabName}>{collab.brand}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  profileSection: {
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  profileInfo: {
    marginTop: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  handle: {
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 4,
  },
  bio: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 12,
    lineHeight: 22,
  },
  locationWebsite: {
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  insightsButton: {
    flex: 1,
    backgroundColor: COLORS.card,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  insightsButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  lastSection: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  achievementCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    width: 120,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  achievementSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  platformCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  platformButton: {
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  platformButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  platformStats: {
    flexDirection: 'row',
    gap: 24,
  },
  platformStat: {
    flex: 1,
  },
  platformStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  platformStatLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  categoryText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  collabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collabItem: {
    alignItems: 'center',
  },
  collabImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  collabName: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});

export default ProfileScreen; 