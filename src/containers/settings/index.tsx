import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Switch,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { COLORS } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const settingsData = {
  account: {
    name: 'Sarah Johnson',
    email: 'sarah@influencer.com',
    subscription: 'Pro',
    subscriptionValidUntil: '2024-12-31',
  },
  preferences: {
    notifications: {
      newOpportunities: true,
      dealUpdates: true,
      paymentAlerts: true,
      platformStats: false,
    },
    privacy: {
      profileVisibility: 'public',
      showEarnings: false,
      allowMessages: true,
    },
    appearance: {
      darkMode: true,
      compactView: false,
    },
  },
  integrations: [
    {
      platform: 'Instagram',
      connected: true,
      username: '@sarahcreates',
      followers: '250K',
    },
    {
      platform: 'TikTok',
      connected: true,
      username: '@sarahj',
      followers: '500K',
    },
    {
      platform: 'YouTube',
      connected: false,
    },
  ],
  billing: {
    plan: 'Pro Annual',
    amount: '$199/year',
    nextBilling: '2024-12-31',
    paymentMethod: {
      type: 'Credit Card',
      last4: '4242',
      expiry: '05/25',
    },
  },
};

const SettingsScreen = () => {
  const renderAccountSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.card}>
        <View style={styles.accountHeader}>
          <View style={styles.accountInfo}>
            <Text style={styles.accountName}>{settingsData.account.name}</Text>
            <Text style={styles.accountEmail}>{settingsData.account.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="pencil" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.subscriptionInfo}>
          <View style={styles.subscriptionBadge}>
            <Icon name="star" size={16} color={COLORS.primary} />
            <Text style={styles.subscriptionText}>{settingsData.account.subscription}</Text>
          </View>
          <Text style={styles.subscriptionDate}>
            Valid until {new Date(settingsData.account.subscriptionValidUntil).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPreferencesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.card}>
        <Text style={styles.subsectionTitle}>Notifications</Text>
        {Object.entries(settingsData.preferences.notifications).map(([key, value]) => (
          <View key={key} style={styles.settingItem}>
            <Text style={styles.settingLabel}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Text>
            <Switch
              value={value}
              onValueChange={() => {}}
              trackColor={{ false: COLORS.border, true: `${COLORS.primary}80` }}
              thumbColor={value ? COLORS.primary : COLORS.textSecondary}
            />
          </View>
        ))}

        <View style={styles.separator} />

        <Text style={styles.subsectionTitle}>Privacy</Text>
        {Object.entries(settingsData.preferences.privacy).map(([key, value]) => (
          <View key={key} style={styles.settingItem}>
            <Text style={styles.settingLabel}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Text>
            {typeof value === 'boolean' ? (
              <Switch
                value={value}
                onValueChange={() => {}}
                trackColor={{ false: COLORS.border, true: `${COLORS.primary}80` }}
                thumbColor={value ? COLORS.primary : COLORS.textSecondary}
              />
            ) : (
              <Text style={styles.settingValue}>{value}</Text>
            )}
          </View>
        ))}

        <View style={styles.separator} />

        <Text style={styles.subsectionTitle}>Appearance</Text>
        {Object.entries(settingsData.preferences.appearance).map(([key, value]) => (
          <View key={key} style={styles.settingItem}>
            <Text style={styles.settingLabel}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Text>
            <Switch
              value={value}
              onValueChange={() => {}}
              trackColor={{ false: COLORS.border, true: `${COLORS.primary}80` }}
              thumbColor={value ? COLORS.primary : COLORS.textSecondary}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const renderIntegrationsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Platform Integrations</Text>
      <View style={styles.card}>
        {settingsData.integrations.map((integration, index) => (
          <React.Fragment key={integration.platform}>
            <View style={styles.integrationItem}>
              <View style={styles.integrationInfo}>
                <Text style={styles.integrationPlatform}>{integration.platform}</Text>
                {integration.connected ? (
                  <View>
                    <Text style={styles.integrationUsername}>{integration.username}</Text>
                    <Text style={styles.integrationFollowers}>{integration.followers} followers</Text>
                  </View>
                ) : (
                  <Text style={styles.integrationDisconnected}>Not connected</Text>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.integrationButton,
                  { backgroundColor: integration.connected ? `${COLORS.error}20` : `${COLORS.primary}20` }
                ]}
              >
                <Text
                  style={[
                    styles.integrationButtonText,
                    { color: integration.connected ? COLORS.error : COLORS.primary }
                  ]}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
            {index < settingsData.integrations.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );

  const renderBillingSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Billing</Text>
      <View style={styles.card}>
        <View style={styles.billingPlan}>
          <View>
            <Text style={styles.planName}>{settingsData.billing.plan}</Text>
            <Text style={styles.planAmount}>{settingsData.billing.amount}</Text>
          </View>
          <TouchableOpacity style={styles.changePlanButton}>
            <Text style={styles.changePlanText}>Change Plan</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.paymentMethod}>
          <View style={styles.paymentInfo}>
            <Icon name="card-outline" size={24} color={COLORS.textPrimary} />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentType}>{settingsData.billing.paymentMethod.type}</Text>
              <Text style={styles.paymentMeta}>
                •••• {settingsData.billing.paymentMethod.last4} | Expires {settingsData.billing.paymentMethod.expiry}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="create-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.nextBilling}>
          <Text style={styles.nextBillingLabel}>Next billing date</Text>
          <Text style={styles.nextBillingDate}>
            {new Date(settingsData.billing.nextBilling).toLocaleDateString()}
          </Text>
        </View>
      </View>
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
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {renderAccountSection()}
        {renderPreferencesSection()}
        {renderIntegrationsSection()}
        {renderBillingSection()}
        
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 24,
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
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  accountEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  subscriptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  subscriptionDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  settingValue: {
    fontSize: 15,
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  integrationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  integrationInfo: {
    flex: 1,
  },
  integrationPlatform: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  integrationUsername: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  integrationFollowers: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  integrationDisconnected: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  integrationButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  integrationButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  billingPlan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  planAmount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  changePlanButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: 8,
  },
  changePlanText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentType: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  paymentMeta: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  nextBilling: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextBillingLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  nextBillingDate: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: `${COLORS.error}10`,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error,
  },
});

export default SettingsScreen; 