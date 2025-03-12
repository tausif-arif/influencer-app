import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

interface CardProps {
  title: string;
  description: string;
  icon: string;
  isSelected: boolean;
  onSelect: () => void;
  iconName: string;
  color: string;
  animValue: Animated.Value;
}

const OnboardingCard: React.FC<CardProps> = ({
  title,
  description,
  isSelected,
  onSelect,
  iconName,
  color,
  animValue,
}) => {
  const scale = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.02, 1],
  });

  return (
    <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          { backgroundColor: `${color}15` }
        ]}
        onPress={onSelect}
        activeOpacity={0.9}
      >
        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: `${color}30` }]}>
            <Icon name={iconName} size={32} color={color} />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
          <View style={styles.selectionIndicator}>
            <View style={[
              styles.radioOuter,
              isSelected && [styles.radioOuterSelected, { borderColor: color }]
            ]}>
              <View style={[
                styles.radioInner,
                isSelected && [styles.radioInnerSelected, { backgroundColor: color }]
              ]} />
            </View>
            <Text style={[
              styles.selectionText,
              isSelected && [styles.selectionTextSelected, { color }]
            ]}>
              {isSelected ? 'Selected' : 'Select'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const OnboardingScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'creator' | 'brand' | null>(null);
  const [animation] = useState(new Animated.Value(0));
  const [cardAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSelect = (type: 'creator' | 'brand') => {
    Animated.sequence([
      Animated.timing(cardAnimation, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setSelectedType(type);
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={[styles.header, { transform: [{ translateY }], opacity }]}>
          <Text style={styles.title}>Welcome to InfluMD</Text>
          <Text style={styles.subtitle}>Choose your path to success</Text>
        </Animated.View>

        <View style={styles.cardsContainer}>
          <OnboardingCard
            title="I'm a Creator"
            description="Build your brand, connect with audiences, and monetize your content effectively."
            icon=""
            iconName="person-circle-outline"
            color={COLORS.primary}
            isSelected={selectedType === 'creator'}
            onSelect={() => handleSelect('creator')}
            animValue={cardAnimation}
          />

          <OnboardingCard
            title="I'm a Brand"
            description="Find the perfect creators, manage campaigns, and track performance."
            icon=""
            iconName="business-outline"
            color={COLORS.accent}
            isSelected={selectedType === 'brand'}
            onSelect={() => handleSelect('brand')}
            animValue={cardAnimation}
          />
        </View>

        <Animated.View style={[styles.footer, { transform: [{ translateY }], opacity }]}>
          <TouchableOpacity
            style={[
              styles.button,
              !selectedType && styles.buttonDisabled,
              selectedType && { backgroundColor: selectedType === 'creator' ? COLORS.primary : COLORS.accent }
            ]}
            disabled={!selectedType}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Icon 
              name="arrow-forward" 
              size={20} 
              color={COLORS.background}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>I'll decide later</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '85%',
  },
  cardsContainer: {
    gap: 20,
    marginBottom: 40,
    borderRadius: 28,
    overflow: 'hidden',
  },
  cardContainer: {
    width: '100%',
  },
  card: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: COLORS.card,
    // shadowColor: COLORS.primary,
    // shadowOffset: { width: 0, height: 8 },
    // shadowOpacity: 0.1,
    // shadowRadius: 24,
   // elevation: 8,
  },
  selectedCard: {
    shadowOpacity: 0.2,
    elevation: 12,
  },
  cardContent: {
    gap: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  selectionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  radioInnerSelected: {
    backgroundColor: COLORS.primary,
  },
  selectionText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  selectionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    gap: 16,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.background,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  skipButton: {
    alignItems: 'center',
    padding: 12,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default OnboardingScreen;