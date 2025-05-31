import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LinearGradient } from 'react-native-linear-gradient';
import { COLORS } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../constants';

const { width } = Dimensions.get('window');

const contentData = {
  drafts: [
    {
      id: 1,
      thumbnail: 'https://picsum.photos/200/300?random=1',
      type: 'video',
      platform: 'Instagram',
      title: 'Summer Fashion Haul 2024',
      duration: '12:30',
      lastEdited: '2 hours ago',
    },
    {
      id: 2,
      thumbnail: 'https://picsum.photos/200/300?random=2',
      type: 'image',
      platform: 'TikTok',
      title: 'Tech Review: Latest Gadgets',
      lastEdited: '5 hours ago',
    },
  ],
  scheduled: [
    {
      id: 3,
      thumbnail: 'https://picsum.photos/200/300?random=3',
      type: 'video',
      platform: 'YouTube',
      title: 'Travel Vlog: Tokyo Adventures',
      duration: '18:45',
      scheduledFor: 'Tomorrow, 3:00 PM',
    },
    {
      id: 4,
      thumbnail: 'https://picsum.photos/200/300?random=4',
      type: 'carousel',
      platform: 'Instagram',
      title: 'Lifestyle Tips: Morning Routine',
      scheduledFor: 'Dec 15, 10:00 AM',
    },
  ],
  published: [
    {
      id: 5,
      thumbnail: 'https://picsum.photos/200/300?random=5',
      type: 'video',
      platform: 'TikTok',
      title: 'Dance Challenge',
      stats: {
        views: '1.2M',
        likes: '125K',
        comments: '3.2K',
      },
      publishedAt: '2 days ago',
    },
    {
      id: 6,
      thumbnail: 'https://picsum.photos/200/300?random=6',
      type: 'image',
      platform: 'Instagram',
      title: 'Product Review',
      stats: {
        views: '850K',
        likes: '95K',
        comments: '1.8K',
      },
      publishedAt: '3 days ago',
    },
  ],
};

const ContentScreen = () => {
  const [activeTab, setActiveTab] = useState<'drafts' | 'scheduled' | 'published'>('drafts');

  const renderContentCard = (item: any, type: 'drafts' | 'scheduled' | 'published') => {
    return (
      <View style={styles.contentCard} key={item.id}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.thumbnailOverlay}
        />
        
        <View style={styles.contentInfo}>
          <View style={styles.platformBadge}>
            <Text style={styles.platformText}>{item.platform}</Text>
          </View>
          
          <View style={styles.contentDetails}>
            <Text style={styles.contentTitle}>{item.title}</Text>
            
            {type === 'drafts' && (
              <Text style={styles.contentMeta}>Last edited {item.lastEdited}</Text>
            )}
            
            {type === 'scheduled' && (
              <Text style={styles.contentMeta}>Scheduled for {item.scheduledFor}</Text>
            )}
            
            {type === 'published' && (
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Icon name="eye-outline" size={16} color={COLORS.textSecondary} />
                  <Text style={styles.statText}>{item.stats.views}</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="heart-outline" size={16} color={COLORS.textSecondary} />
                  <Text style={styles.statText}>{item.stats.likes}</Text>
                </View>
                <View style={styles.statItem}>
                  <Icon name="chatbubble-outline" size={16} color={COLORS.textSecondary} />
                  <Text style={styles.statText}>{item.stats.comments}</Text>
                </View>
              </View>
            )}
          </View>
          
          {item.type === 'video' && (
            <View style={styles.durationBadge}>
              <Icon name="play" size={12} color={COLORS.textPrimary} />
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          )}
          
          {item.type === 'carousel' && (
            <View style={styles.durationBadge}>
              <Icon name="images-outline" size={12} color={COLORS.textPrimary} />
              <Text style={styles.durationText}>Multiple</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerTitle}>Content Manager</Text>
          <TouchableOpacity style={styles.createButton}>
            <Icon name="add" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'drafts' && styles.activeTab]}
          onPress={() => setActiveTab('drafts')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'drafts' && styles.activeTabText
          ]}>Drafts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'scheduled' && styles.activeTab]}
          onPress={() => setActiveTab('scheduled')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'scheduled' && styles.activeTabText
          ]}>Scheduled</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'published' && styles.activeTab]}
          onPress={() => setActiveTab('published')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'published' && styles.activeTabText
          ]}>Published</Text>
        </TouchableOpacity>
      </View>

      {/* Content List */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'drafts' && contentData.drafts.map(item => renderContentCard(item, 'drafts'))}
        {activeTab === 'scheduled' && contentData.scheduled.map(item => renderContentCard(item, 'scheduled'))}
        {activeTab === 'published' && contentData.published.map(item => renderContentCard(item, 'published'))}
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
   // height: 90,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : COLORS.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
   // height: '100%',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    paddingVertical:10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.backgroundLight,
    //marginTop:20
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: `${COLORS.primary}20`,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentCard: {
    height: 200,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  contentInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  platformBadge: {
    position: 'absolute',
    top: -80,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.card,
    borderRadius: 8,
  },
  platformText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  contentDetails: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  contentMeta: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  durationBadge: {
    position: 'absolute',
    top: -80,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 6,
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});

export default ContentScreen; 