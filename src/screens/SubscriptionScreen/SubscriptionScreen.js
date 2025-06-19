import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { colors } from '../../constants/colors';
import { Poppins } from '../../constants/fonts';
import { styles } from './styles';

const { width, height } = Dimensions.get('window');

const SubscriptionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'weekly',
      title: 'Weekly',
      price: '$2.99',
      period: '/week',
      description: 'Perfect for trying out premium features',
      features: ['Advanced Stats', 'Live Scores', 'Player Analysis'],
      color: colors.lightBlue,
      savings: null,
    },
    {
      id: 'monthly',
      title: 'Monthly',
      price: '$9.99',
      period: '/month',
      description: 'Most popular choice for regular users',
      features: ['All Weekly Features', 'Team Insights', 'Custom Reports', 'Priority Support'],
      color: colors.theme,
      savings: 'Save 17%',
      popular: true,
    },
    {
      id: 'yearly',
      title: 'Yearly',
      price: '$79.99',
      period: '/year',
      description: 'Best value for serious baseball fans',
      features: ['All Monthly Features', 'Exclusive Content', 'Season Predictions', 'Ad-Free Experience'],
      color: colors.greenishBlue,
      savings: 'Save 33%',
    },
  ];

  const premiumFeatures = [
    '⚾ Advanced Player Statistics',
    '📊 Real-time Game Analytics',
    '🏆 Team Performance Insights',
    '📱 Offline Access',
    '🎯 Custom Notifications',
    '📈 Historical Data Access',
  ];

  const PlanCard = ({ plan }) => (
    <TouchableOpacity
      style={[
        styles.planCard,
        selectedPlan === plan.id && styles.selectedPlan,
        { borderColor: plan.color }
      ]}
      onPress={() => setSelectedPlan(plan.id)}
    >
      {plan.popular && (
        <View style={[styles.popularBadge, { backgroundColor: colors.theme }]}>
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </View>
      )}
      {plan.savings && (
        <View style={[styles.savingsBadge, { backgroundColor: colors.yellow }]}>
          <Text style={styles.savingsText}>{plan.savings}</Text>
        </View>
      )}
      
      <View style={styles.planHeader}>
        <Text style={[styles.planTitle, { fontFamily: Poppins.bold }]}>{plan.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.planPrice, { fontFamily: Poppins.black, color: plan.color }]}>
            {plan.price}
          </Text>
          <Text style={[styles.planPeriod, { fontFamily: Poppins.regular }]}>{plan.period}</Text>
        </View>
      </View>
      
      <Text style={[styles.planDescription, { fontFamily: Poppins.regular }]}>
        {plan.description}
      </Text>
      
      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={[styles.checkmark, { color: plan.color }]}>✓</Text>
            <Text style={[styles.featureText, { fontFamily: Poppins.regular }]}>{feature}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.darkGray} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, { fontFamily: Poppins.semiBold }]}>
            What you'll get with Premium
          </Text>
          <View style={styles.featuresGrid}>
            {premiumFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={[styles.featureItemText, { fontFamily: Poppins.regular }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.plansSection}>
          <Text style={[styles.sectionTitle, { fontFamily: Poppins.semiBold }]}>
            Choose Your Plan
          </Text>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </View>
        
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.subscribeButton, { backgroundColor: colors.theme }]}
          >
            <Text style={[styles.subscribeButtonText, { fontFamily: Poppins.bold }]}>
              Start Your Premium Experience
            </Text>
          </TouchableOpacity>
          
          <Text style={[styles.termsText, { fontFamily: Poppins.light }]}>
            Cancel anytime. Terms and conditions apply.
          </Text>
          
          <View style={styles.linksContainer}>
            <TouchableOpacity>
              <Text style={[styles.linkText, { fontFamily: Poppins.regular }]}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={[styles.separator, { fontFamily: Poppins.regular }]}>•</Text>
            <TouchableOpacity>
              <Text style={[styles.linkText, { fontFamily: Poppins.regular }]}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default SubscriptionScreen;