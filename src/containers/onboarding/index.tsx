import React, { useState } from 'react';
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
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { navigate } from '../../navigation/navigationUtils';

const { width, height } = Dimensions.get('window');

interface CardProps {
  title: string;
  description: string;
  icon: string;
  gradientColors: string[];
  isSelected: boolean;
  onSelect: () => void;
}

const OnboardingCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  gradientColors,
  isSelected,
  onSelect,
}) => {
  // Convert gradient colors to background with linear gradient-like effect
  const mainColor = gradientColors[0];
  const accentColor = gradientColors[1];

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        isSelected && styles.selectedCardContainer,
      ]}
      onPress={onSelect}
      activeOpacity={0.9}
    >
      {/* Main card with gradient-like background */}
      <View style={[
        styles.card,
        { backgroundColor: mainColor },
      ]}>
        {/* Blur effect for selected state */}
        {Platform.OS === 'ios' && isSelected && (
          <BlurView
            style={styles.absoluteFill}
            blurType="dark"
            blurAmount={10}
          />
        )}

        {/* Selection indicator */}
        <View style={styles.selectionIndicator}>
          <View
            style={[
              styles.radioOuter,
              isSelected && { borderColor: '#FFFFFF' },
            ]}
          >
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>

        {/* Decorative elements */}
        <View style={[styles.decorativeCircle, { backgroundColor: accentColor }]} />
        <View style={[styles.decorativeSquare, { backgroundColor: accentColor }]} />

        {/* Card content */}
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconBackground, { backgroundColor: accentColor }]}>
              <Image
                source={{ uri: icon }}
                style={styles.cardIcon}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>

        {/* Selected indicator */}
        {isSelected && (
          <View style={styles.checkMarkContainer}>
            <View style={[styles.checkMark, { backgroundColor: accentColor }]}>
              <Text style={styles.checkMarkText}>✓</Text>
            </View>
          </View>
        )}
      </View>

      {/* Card reflection/shadow effect */}
      <View style={[styles.cardReflection, { backgroundColor: mainColor }]} />
    </TouchableOpacity>
  );
};

const OnboardingScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'user' | 'customer' | null>(null);

  const handleContinue = () => {
    try {
      navigate("Main")

    } catch (error) {
      console.log(error)
    }
    if (selectedType) {
      // Navigate to the next screen based on selection
      console.log(`Continuing as ${selectedType}`);
      // navigation.navigate(selectedType === 'user' ? 'UserSetup' : 'CustomerSetup');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Decorative background elements */}
      <View style={styles.backgroundGradient} />
      <View style={styles.backgroundDecorativeCircle1} />
      <View style={styles.backgroundDecorativeCircle2} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Path</Text>
          <Text style={styles.subtitle}>
            Select how you'll use Vortex to get a personalized experience
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <OnboardingCard
            title="I'm a User"
            description="Looking for services? Create a personal account to browse, book and manage your appointments."
            icon="https://via.placeholder.com/150"
            gradientColors={['#1E3A8A', '#3B82F6']}
            isSelected={selectedType === 'user'}
            onSelect={() => setSelectedType('user')}
          />

          <OnboardingCard
            title="I'm a Service Provider"
            description="Want to showcase your services? Create a business account to manage your profile, appointments and clients."
            icon="https://via.placeholder.com/150"
            gradientColors={['#065F46', '#10B981']}
            isSelected={selectedType === 'customer'}
            onSelect={() => setSelectedType('customer')}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedType && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedType}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipContainer}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#121212',
  },
  backgroundDecorativeCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
    top: -100,
    right: -100,
  },
  backgroundDecorativeCircle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    bottom: -50,
    left: -100,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '85%',
  },
  cardsContainer: {
    marginBottom: 40,
  },
  cardContainer: {
    marginBottom: 24,
    borderRadius: 20,
  },
  selectedCardContainer: {
    transform: [{ scale: 1.02 }],
  },
  card: {
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  cardReflection: {
    height: 5,
    marginHorizontal: 10,
    marginTop: -3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: 0.7,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    right: -40,
    top: -40,
    opacity: 0.3,
  },
  decorativeSquare: {
    position: 'absolute',
    width: 80,
    height: 80,
    transform: [{ rotate: '45deg' }],
    left: -20,
    bottom: -20,
    opacity: 0.3,
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    marginTop: 10,
    marginLeft: 8,
  },
  cardIcon: {
    width: 36,
    height: 36,
    tintColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
    marginRight: 20,
    paddingBottom: 8,
  },
  checkMarkContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  checkMark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#374151',
    shadowOpacity: 0,
  },
  skipContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  skipText: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default OnboardingScreen;