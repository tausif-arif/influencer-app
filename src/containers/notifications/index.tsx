import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { COLORS } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const notificationsData = [
  {
    id: 1,
    type: 'opportunity',
    title: 'New Brand Collaboration',
    message: 'TechGear Pro wants to work with you on a new campaign',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Received',
    message: 'You received $2,500 from StyleHub Campaign',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 3,
    type: 'milestone',
    title: 'Milestone Achieved',
    message: 'Congratulations! You reached 2M followers on TikTok',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 4,
    type: 'content',
    title: 'Content Performance',
    message: 'Your latest post is trending! +500K views in 24h',
    time: '2 days ago',
    unread: false,
  },
];

const NotificationsScreen = () => {
  const getIconName = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'briefcase-outline';
      case 'payment':
        return 'cash-outline';
      case 'milestone':
        return 'trophy-outline';
      case 'content':
        return 'trending-up-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return COLORS.primary;
      case 'payment':
        return COLORS.success;
      case 'milestone':
        return COLORS.accent;
      case 'content':
        return COLORS.secondary;
      default:
        return COLORS.textPrimary;
    }
  };

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
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity>
            <Icon name="options-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {notificationsData.map(notification => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              notification.unread && styles.unreadCard
            ]}
          >
            <View style={[
              styles.iconContainer,
              { backgroundColor: `${getIconColor(notification.type)}20` }
            ]}>
              <Icon
                name={getIconName(notification.type)}
                size={24}
                color={getIconColor(notification.type)}
              />
            </View>
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
            {notification.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
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
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  unreadCard: {
    backgroundColor: COLORS.cardDark,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  notificationMessage: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default NotificationsScreen; 