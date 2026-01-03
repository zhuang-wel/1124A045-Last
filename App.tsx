import React, { useState, useEffect } from 'react';
import { AppState, Screen } from './types';
import { HomeScreen } from './screens/HomeScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { QuickNavScreen } from './screens/QuickNavScreen';
import { MapScreen } from './screens/MapScreen';
import { SOSModal } from './components/SOSModal';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'home',
    isColorBlindMode: false,
    fontSize: 1, // 1 to 3 scale
    isFamilyMode: true,
    destination: '心臟科門診', 
    destinationKey: 'clinic_heart', // Default key
    language: 'zh-TW',
    showSOSModal: false,
    enableVoiceHints: true,
    voiceLanguage: 'zh',
  });

  // Handle Color Blind Mode Side Effect
  useEffect(() => {
    if (appState.isColorBlindMode) {
      document.documentElement.classList.add('color-blind');
    } else {
      document.documentElement.classList.remove('color-blind');
    }
  }, [appState.isColorBlindMode]);

  // Handle Global Font Size Scaling
  useEffect(() => {
    // Base 100% (16px), increasing by 25% per step
    // 1 -> 100%, 2 -> 125%, 3 -> 150%
    const scalePercentage = 100 + (appState.fontSize - 1) * 25;
    document.documentElement.style.fontSize = `${scalePercentage}%`;
  }, [appState.fontSize]);

  const navigate = (screen: Screen) => {
    setAppState(prev => ({ ...prev, currentScreen: screen }));
  };

  const commonProps = {
    onNavigate: navigate,
    state: appState,
    setState: setAppState,
  };

  const renderScreen = () => {
    switch (appState.currentScreen) {
      case 'home':
        return <HomeScreen {...commonProps} />;
      case 'settings':
        return <SettingsScreen {...commonProps} />;
      case 'quick-nav':
        return <QuickNavScreen {...commonProps} />;
      case 'map':
        return <MapScreen {...commonProps} />;
      default:
        return <HomeScreen {...commonProps} />;
    }
  };

  return (
    <div className={`w-full min-h-screen font-display antialiased text-slate-900 dark:text-slate-50 bg-background-light dark:bg-background-dark selection:bg-primary/30 relative`}>
       {renderScreen()}
       
       <SOSModal 
         isOpen={appState.showSOSModal} 
         onClose={() => setAppState(prev => ({ ...prev, showSOSModal: false }))}
         language={appState.language}
       />
    </div>
  );
};

export default App;