import React, { useState } from 'react';
import { NavProps, Language } from '../types';
import { Icon } from '../components/Icon';
import { t, languageNames } from '../translations';

export const HomeScreen: React.FC<NavProps> = ({ onNavigate, state, setState }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const l = state.language;
  const { fontSize } = state;
  
  // Hide SOS text label when font size is scaled > 110% (fontSize > 1.4) to prevent overlapping with title
  // Base 100% + (fontSize-1)*25. 1.4 results in 110%.
  const showSOSText = fontSize <= 1.4;

  const handleLanguageSelect = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
    setIsLangMenuOpen(false);
  };

  const handleSOS = () => {
    setState(prev => ({ ...prev, showSOSModal: true }));
  };

  const handleShare = async () => {
    const locationName = t('clinic_302', l); // X-Ray Reception
    const doctorName = "王大明";
    const waitTime = "15 min";
    
    // Construct localized message
    const shareTitle = `${t('app.title', l)} - ${t('family_mode', l)}`;
    const shareText = `${t('family_mode', l)}\n${t('clinic_heart', l)} - ${locationName}\n${t('doctor', l)}: ${doctorName}\n${t('wait_time', l)}: ${waitTime}`;
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } else {
        // Fallback for desktop/unsupported browsers
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        alert(l === 'en' ? "Location info copied to clipboard!" : "位置資訊已複製到剪貼簿！");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark relative">
      {/* Custom Animation Style */}
      <style>{`
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-y {
          animation: float-y 3s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2 sticky top-0 z-20 bg-background-light dark:bg-background-dark">
        <div className="relative">
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="text-primary dark:text-blue-400 text-base font-bold tracking-wide flex items-center gap-1"
          >
            {t('lang.btn', l)}
            <Icon name="arrow_drop_down" />
          </button>
          
          {/* Language Dropdown */}
          {isLangMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
              {Object.entries(languageNames).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => handleLanguageSelect(key as Language)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${state.language === key ? 'text-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-slate-700 dark:text-slate-200'}`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        <h1 className={`text-slate-900 dark:text-slate-50 text-lg font-bold absolute ${showSOSText ? 'left-[42%]' : 'left-1/2'} -translate-x-1/2 whitespace-nowrap transition-all duration-300`}>
          {t('app.title', l)}
        </h1>
        <button className="flex items-center gap-1 group" onClick={handleSOS}>
          {showSOSText && (
            <span className="text-danger text-xs font-bold whitespace-nowrap group-active:opacity-80">
              {t('sos', l)}
            </span>
          )}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger text-white shadow-md group-active:scale-95 transition-transform animate-sos">
            <Icon name="sos" />
          </div>
        </button>
      </div>

      <main className="flex-grow px-4 py-2 pb-24 overflow-y-auto no-scrollbar" onClick={() => setIsLangMenuOpen(false)}>
        {/* Family Mode Banner */}
        <div className="mb-4 flex items-center justify-between rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-800/50">
          <div className="flex items-center gap-3">
            <Icon name="group" className="text-yellow-600 dark:text-yellow-400" />
            <span className="font-bold text-yellow-800 dark:text-yellow-200">
              {t('family_mode', l)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleShare}
              className="text-yellow-800 dark:text-yellow-200 hover:bg-yellow-200/50 dark:hover:bg-yellow-800/50 p-2 rounded-full transition-colors active:scale-90 transform"
              title="Share Location"
            >
              <Icon name="share" />
            </button>
            <div 
              className="relative inline-block w-12 h-7 cursor-pointer"
              onClick={() => setState(s => ({...s, isFamilyMode: !s.isFamilyMode}))}
            >
              <div className={`block w-full h-full rounded-full transition-colors duration-300 ${state.isFamilyMode ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
              <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow transition-transform duration-300 ${state.isFamilyMode ? 'translate-x-5' : ''}`}></div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="flex flex-col rounded-xl shadow-lg bg-white dark:bg-slate-800 mb-6 overflow-hidden border border-slate-100 dark:border-slate-700">
          <div className="relative w-full aspect-video bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Clinic corridor"
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <div className="relative bg-black/60 backdrop-blur-md rounded-lg px-5 py-2 text-white text-2xl font-bold border border-white/20 shadow-xl animate-float-y whitespace-nowrap">
                 X光室 報到處
                 <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black/60 rotate-45 border-r border-b border-white/20"></div>
               </div>
            </div>
          </div>
          
          <div className="flex flex-col p-5 gap-3">
            <div>
              <p className="text-primary dark:text-blue-400 text-sm font-bold uppercase tracking-wider mb-1">
                {t('clinic_heart', l)}
              </p>
              <h2 className="text-slate-900 dark:text-slate-50 text-2xl font-bold">
                {t('clinic_302', l)}
              </h2>
            </div>
            
            <div className="space-y-2 mt-1">
              <p className="text-slate-600 dark:text-slate-300 text-base flex items-center gap-2">
                <Icon name="person" className="text-slate-400 text-xl" />
                {t('doctor', l)}：王大明
              </p>
              <div className="flex items-center gap-3">
                <p className="text-slate-600 dark:text-slate-300 text-base flex items-center gap-2">
                   <Icon name="schedule" className="text-slate-400 text-xl" />
                   {t('wait_time', l)}：
                </p>
                <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/60 px-3 py-1 text-sm font-bold text-green-700 dark:text-green-300">
                  15 min
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mb-8">
          <button 
            onClick={() => setState(prev => ({ ...prev, currentScreen: 'map', destinationKey: 'clinic_heart', destination: t('clinic_heart', l) }))}
            className="flex-1 max-w-md bg-primary hover:bg-blue-600 active:scale-[0.98] transition-all text-white h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            <Icon name="navigation" />
            <span>{t('start_nav', l)}</span>
          </button>
        </div>

        {/* Quick Nav Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-slate-900 dark:text-slate-50 text-lg font-bold">
            {t('quick_nav', l)}
          </h3>
          <button 
            onClick={() => onNavigate('quick-nav')}
            className="text-primary dark:text-blue-400 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            {t('more', l)} &gt;
          </button>
        </div>
        
        {/* Quick Nav Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'restroom', icon: 'wc' },
            { key: 'pharmacy', icon: 'medication' },
            { key: 'cashier', icon: 'payments' },
            { key: 'exit', icon: 'exit_to_app' },
          ].map((item) => (
            <button 
              key={item.key}
              onClick={() => setState(prev => ({ ...prev, currentScreen: 'map', destinationKey: item.key, destination: t(item.key, l) }))}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 items-start transition-all hover:border-primary hover:shadow-md active:bg-slate-50 dark:active:bg-slate-700"
            >
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                <Icon name={item.icon} />
              </div>
              <div className="text-left">
                <h2 className="text-slate-800 dark:text-slate-200 text-base font-bold leading-tight">
                  {t(item.key, l)}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/90 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/90 pb-safe">
        <div className="flex items-center justify-around p-2">
          <button onClick={() => onNavigate('home')} className="flex flex-1 flex-col items-center gap-1 p-2 text-primary dark:text-blue-400">
            <Icon name="home" fill className="text-2xl" />
            <span className="text-xs font-bold">{t('home', l)}</span>
          </button>
          <button onClick={() => onNavigate('settings')} className="flex flex-1 flex-col items-center gap-1 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Icon name="settings" className="text-2xl" />
            <span className="text-xs font-medium">{t('settings', l)}</span>
          </button>
        </div>
      </footer>
    </div>
  );
};