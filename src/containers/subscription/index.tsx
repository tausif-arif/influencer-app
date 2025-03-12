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

const subscriptionData = {
  currentPlan: {
    name: 'Pro',
    price: '$29.99',
    billingCycle: 'monthly',
    nextBilling: '2024-05-15',
    features: [
      'Advanced Analytics',
      'Priority Support',
      'Custom Branding',
      'API Access',
      'Team Collaboration',
    ],
  },
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      price: '$9.99',
      billingCycle: 'monthly',
      features: [
        'Basic Analytics',
        'Email Support',
        'Content Calendar',
        'Performance Tracking',
      ],
      recommended: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$29.99',
      billingCycle: 'monthly',
      features: [
        'Advanced Analytics',
        'Priority Support',
        'Custom Branding',
        'API Access',
        'Team Collaboration',
      ],
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99.99',
      billingCycle: 'monthly',
      features: [
        'Custom Analytics',
        '24/7 Support',
        'White Labeling',
        'Advanced API',
        'Unlimited Teams',
        'Custom Integrations',
        'Dedicated Account Manager',
      ],
      recommended: false,
    },
  ],
  paymentMethod: {
    type: 'Visa',
    last4: '4242',
    expiry: '12/25',
  },
};

const SubscriptionScreen = () => {
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
          <Text style={styles.headerTitle}>Subscription</Text>
          <TouchableOpacity>
            <Icon name="help-circle-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Plan</Text>
          <View style={styles.currentPlanCard}>
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.planName}>{subscriptionData.currentPlan.name}</Text>
                <Text style={styles.planPrice}>
                  {subscriptionData.currentPlan.price}
                  <Text style={styles.billingCycle}>
                    /{subscriptionData.currentPlan.billingCycle}
                  </Text>
                </Text>
              </View>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>Active</Text>
              </View>
            </View>

            <View style={styles.nextBilling}>
              <Icon name="calendar-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.nextBillingText}>
                Next billing on {subscriptionData.currentPlan.nextBilling}
              </Text>
            </View>

            <View style={styles.features}>
              {subscriptionData.currentPlan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Icon name="checkmark-circle" size={20} color={COLORS.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Plans</Text>
          {subscriptionData.plans.map((plan) => (
            <View key={plan.id} style={[styles.planCard, plan.recommended && styles.recommendedCard]}>
              {plan.recommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>Recommended</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planPrice}>
                    {plan.price}
                    <Text style={styles.billingCycle}>/{plan.billingCycle}</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.features}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Icon name="checkmark-circle" size={20} color={COLORS.success} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[
                  styles.selectButton,
                  plan.id === subscriptionData.currentPlan.name.toLowerCase() && styles.currentButton
                ]}
              >
                <Text style={[
                  styles.selectButtonText,
                  plan.id === subscriptionData.currentPlan.name.toLowerCase() && styles.currentButtonText
                ]}>
                  {plan.id === subscriptionData.currentPlan.name.toLowerCase() ? 'Current Plan' : 'Select Plan'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Payment Method */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentCard}>
            <View style={styles.paymentInfo}>
              <Icon name="card-outline" size={24} color={COLORS.textPrimary} />
              <View style={styles.cardDetails}>
                <Text style={styles.cardType}>
                  {subscriptionData.paymentMethod.type} ending in {subscriptionData.paymentMethod.last4}
                </Text>
                <Text style={styles.cardExpiry}>
                  Expires {subscriptionData.paymentMethod.expiry}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
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
  currentPlanCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 4,
  },
  billingCycle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  activeBadge: {
    backgroundColor: `${COLORS.success}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: COLORS.success,
    fontSize: 14,
    fontWeight: '600',
  },
  nextBilling: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nextBillingText: {
    marginLeft: 8,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  features: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 12,
    color: COLORS.textPrimary,
    fontSize: 15,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  planCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  recommendedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  recommendedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  recommendedText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  selectButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: '600',
  },
  currentButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  currentButtonText: {
    color: COLORS.textSecondary,
  },
  paymentCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetails: {
    marginLeft: 12,
  },
  cardType: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  cardExpiry: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  updateText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default SubscriptionScreen; 