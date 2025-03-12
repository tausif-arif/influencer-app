import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo and Branding */}
          <View style={styles.brandingContainer}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.logoBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="rocket" size={40} color={COLORS.background} />
              </LinearGradient>
            </View>
            <Text style={styles.brandName}>InfluMD</Text>
            <Text style={styles.tagline}>Your Journey to Success</Text>
          </View>

          {/* Auth Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'signin' && styles.activeTab]}
              onPress={() => setActiveTab('signin')}
            >
              <Text style={[styles.tabText, activeTab === 'signin' && styles.activeTabText]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
              onPress={() => setActiveTab('signup')}
            >
              <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <Icon name="alert-circle" size={20} color={COLORS.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Form */}
          <View style={styles.formCard}>
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.passwordToggle}
              >
                <Icon
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.background} />
              ) : (
                <>
                  <Text style={styles.buttonText}>{activeTab === 'signin' ? 'Sign In' : 'Create Account'}</Text>
                  <Icon name="arrow-forward" size={20} color={COLORS.background} style={styles.buttonIcon} />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={[styles.button, styles.socialButton]}
                onPress={handleGoogleSignIn}
                disabled={isLoading}
              >
                <Icon name="logo-google" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.socialButton]}
                disabled={isLoading}
              >
                <Icon name="logo-apple" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.socialButton]}
                disabled={isLoading}
              >
                <Icon name="logo-facebook" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {activeTab === 'signin' ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}>
              <Text style={styles.footerLink}>
                {activeTab === 'signin' ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: `${COLORS.card}80`,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.card,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  activeTabText: {
    color: COLORS.primary,
  },
  formCard: {
    backgroundColor: `${COLORS.card}95`,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.error}20`,
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
  },
  errorText: {
    color: COLORS.error,
    marginLeft: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.background}80`,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 16,
    height: '100%',
  },
  passwordToggle: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    marginBottom: 24,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textSecondary,
    marginHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 56,
    backgroundColor: `${COLORS.background}80`,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AuthScreen;