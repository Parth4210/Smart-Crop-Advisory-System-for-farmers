import { useState } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { Dashboard } from './components/Dashboard';
import { SoilHealthScreen } from './components/SoilHealthScreen';
import { PestDetectionScreen } from './components/PestDetectionScreen';
import { WeatherScreen } from './components/WeatherScreen';
import { PricingScreen } from './components/PricingScreen';
import { FeedbackScreen } from './components/FeedbackScreen';

type Screen = 'onboarding' | 'dashboard' | 'soil-health' | 'pest-detection' | 'weather' | 'pricing' | 'feedback';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className="size-full max-w-md mx-auto bg-background">
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard onNavigate={handleNavigate} />
      )}
      
      {currentScreen === 'soil-health' && (
        <SoilHealthScreen onBack={handleBack} />
      )}
      
      {currentScreen === 'pest-detection' && (
        <PestDetectionScreen onBack={handleBack} />
      )}
      
      {currentScreen === 'weather' && (
        <WeatherScreen onBack={handleBack} />
      )}
      
      {currentScreen === 'pricing' && (
        <PricingScreen onBack={handleBack} />
      )}
      
      {currentScreen === 'feedback' && (
        <FeedbackScreen onBack={handleBack} />
      )}
    </div>
  );
}