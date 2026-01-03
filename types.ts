import React from 'react';

export type Screen = 'home' | 'settings' | 'quick-nav' | 'map';

export type Language = 'zh-TW' | 'en' | 'ja' | 'ko' | 'vi' | 'th';

export type VoiceLanguage = 'zh' | 'nan' | 'hak' | 'ja' | 'ko' | 'vi' | 'th';

export interface AppState {
  currentScreen: Screen;
  // isDarkMode removed
  isColorBlindMode: boolean; // Changed from isHighContrast for Okabe & Ito palette
  fontSize: number;
  isFamilyMode: boolean;
  destination?: string;
  destinationKey?: string; // Added to track logical destination
  language: Language;
  showSOSModal: boolean;
  enableVoiceHints: boolean;
  voiceLanguage: VoiceLanguage;
}

export interface NavProps {
  onNavigate: (screen: Screen) => void;
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}