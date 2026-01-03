import React, { useState } from 'react';
import { NavProps, Language, VoiceLanguage } from '../types';
import { Icon } from '../components/Icon';
import { t, languageNames } from '../translations';

const voiceLanguageNames: Record<VoiceLanguage, string> = {
  'zh': '中文',
  'nan': '台語',
  'hak': '客語',
  'ja': '日文',
  'ko': '韓文',
  'vi': '越南文',
  'th': '泰語'
};

export const SettingsScreen: React.FC<NavProps> = ({ onNavigate, state, setState }) => {
  const { fontSize, isColorBlindMode, language, enableVoiceHints, voiceLanguage } = state;
  const l = language;
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isVoiceLangOpen, setIsVoiceLangOpen] = useState(false);
  
  const handleSOS = () => {
    setState(prev => ({ ...prev, showSOSModal: true }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-stone-200 bg-background-light px-4 dark:border-white/10 dark:bg-background-dark">
        <button 
          onClick={() => onNavigate('home')}
          className="flex size-10 items-center justify-center rounded-full text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10 transition-colors"
        >
          <Icon name="arrow_back" style={{ fontSize: '24px' }} />
        </button>
        <h1 className="flex-1 text-center font-bold text-stone-900 dark:text-white text-lg">
          {t('settings', l)}
        </h1>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline whitespace-nowrap text-xs font-semibold text-danger">{t('sos', l)}</span>
          <button 
            onClick={handleSOS}
            className="flex size-10 items-center justify-center rounded-full bg-danger text-white shadow-md active:scale-95 transition-transform animate-sos"
          >
            <span className="font-bold text-sm">SOS</span>
          </button>
        </div>
      </div>

      <main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        {/* General Settings */}
        <section className="mb-8">
          <h2 className="px-4 pb-3 font-bold uppercase text-stone-500 dark:text-stone-400 text-sm">
            {t('general', l)}
          </h2>
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm dark:bg-[#1C2935] divide-y divide-stone-100 dark:divide-white/5">
            
            {/* Language Selector Accordion */}
            <div>
              <div 
                className="flex items-center gap-4 px-4 py-4 active:bg-stone-50 dark:active:bg-white/5 cursor-pointer transition-colors" 
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                  <Icon name="language" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-800 dark:text-stone-200 truncate text-base">
                    {t('lang.btn', l)}
                  </p>
                  <p className="text-stone-500 dark:text-stone-400 mt-0.5 text-xs">
                    {languageNames[language]}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name={isLangOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"} className="text-stone-300 dark:text-stone-600" />
                </div>
              </div>

              {/* Expanded Language List */}
              {isLangOpen && (
                <div className="bg-stone-50 dark:bg-black/20 border-t border-stone-100 dark:border-white/5 animate-in slide-in-from-top-2 duration-200">
                  {Object.entries(languageNames).map(([key, name]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setState(s => ({ ...s, language: key as Language }));
                      }}
                      className={`flex w-full items-center justify-between px-16 py-3 text-left transition-colors hover:bg-stone-100 dark:hover:bg-white/5 ${state.language === key ? 'text-primary font-bold' : 'text-stone-600 dark:text-stone-400'}`}
                    >
                      <span className="text-sm">{name}</span>
                      {state.language === key && <Icon name="check" className="text-primary text-lg" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Nav Toggle */}
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                  <Icon name="volume_up" />
                </div>
                <p className="font-medium text-stone-800 dark:text-stone-200 text-base">
                  {t('voice_hint', l)}
                </p>
              </div>
              <label className="relative flex h-[30px] w-[50px] cursor-pointer items-center rounded-full bg-stone-200 p-1 has-[:checked]:bg-primary dark:bg-stone-700 transition-colors">
                <input 
                  className="peer sr-only" 
                  type="checkbox" 
                  checked={enableVoiceHints}
                  onChange={(e) => setState(s => ({...s, enableVoiceHints: e.target.checked}))}
                />
                <div className="h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-[20px]"></div>
              </label>
            </div>

            {/* Voice Language Selector (Shown only when Voice Hints enabled) */}
            {enableVoiceHints && (
              <div className="border-t border-stone-100 dark:border-white/5">
                <div 
                  className="flex items-center gap-4 px-4 py-4 active:bg-stone-50 dark:active:bg-white/5 cursor-pointer transition-colors" 
                  onClick={() => setIsVoiceLangOpen(!isVoiceLangOpen)}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                    <Icon name="record_voice_over" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-800 dark:text-stone-200 truncate text-base">
                      {t('voice_language', l)}
                    </p>
                    <p className="text-stone-500 dark:text-stone-400 mt-0.5 text-xs">
                      {voiceLanguageNames[voiceLanguage]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name={isVoiceLangOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"} className="text-stone-300 dark:text-stone-600" />
                  </div>
                </div>

                {/* Expanded Voice Language List */}
                {isVoiceLangOpen && (
                  <div className="bg-stone-50 dark:bg-black/20 border-t border-stone-100 dark:border-white/5 animate-in slide-in-from-top-2 duration-200">
                    {Object.entries(voiceLanguageNames).map(([key, name]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setState(s => ({ ...s, voiceLanguage: key as VoiceLanguage }));
                        }}
                        className={`flex w-full items-center justify-between px-16 py-3 text-left transition-colors hover:bg-stone-100 dark:hover:bg-white/5 ${state.voiceLanguage === key ? 'text-primary font-bold' : 'text-stone-600 dark:text-stone-400'}`}
                      >
                        <span className="text-sm">{name}</span>
                        {state.voiceLanguage === key && <Icon name="check" className="text-primary text-lg" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="px-4 pb-3 font-bold uppercase text-stone-500 dark:text-stone-400 text-sm">
            {t('accessibility', l)}
          </h2>
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm dark:bg-[#1C2935] divide-y divide-stone-100 dark:divide-white/5">
            
            {/* Color Blind Mode (Okabe & Ito Palette) */}
            <div className="flex items-center justify-between gap-4 px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                  <Icon name="palette" />
                </div>
                <p className="font-medium text-stone-800 dark:text-stone-200 text-base">
                  {t('color_blind_mode', l)}
                </p>
              </div>
              <label className="relative flex h-[30px] w-[50px] cursor-pointer items-center rounded-full bg-stone-200 p-1 has-[:checked]:bg-primary dark:bg-stone-700 transition-colors">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={isColorBlindMode}
                  onChange={(e) => setState(s => ({...s, isColorBlindMode: e.target.checked}))}
                />
                <div className="h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-[20px]"></div>
              </label>
            </div>

            {/* Font Size */}
            <div className="flex flex-col justify-center gap-4 px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                  <Icon name="format_size" />
                </div>
                <p className="font-medium text-stone-800 dark:text-stone-200 text-base">
                  {t('font_size', l)}
                </p>
              </div>
              <div className="flex items-center gap-4 px-2 pt-2">
                <span className="text-sm text-stone-600 dark:text-stone-400">A</span>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.1"
                  value={fontSize}
                  onChange={(e) => setState(s => ({...s, fontSize: parseFloat(e.target.value)}))}
                  className="flex-1 h-2 rounded-lg bg-stone-200 accent-primary cursor-pointer dark:bg-stone-700"
                />
                <span className="text-xl text-stone-600 dark:text-stone-400 font-bold">A</span>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};