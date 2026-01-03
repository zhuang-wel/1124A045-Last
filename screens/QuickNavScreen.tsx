import React from 'react';
import { NavProps } from '../types';
import { Icon } from '../components/Icon';
import { t } from '../translations';

export const QuickNavScreen: React.FC<NavProps> = ({ onNavigate, state, setState }) => {
  const l = state.language;
  
  const items = [
    { key: 'registration', icon: 'assignment_ind', color: 'text-primary' },
    { key: 'cashier', icon: 'payments', color: 'text-primary' },
    { key: 'pharmacy', icon: 'medication', color: 'text-primary' },
    { key: 'restroom', icon: 'wc', color: 'text-primary' },
    { key: 'emergency', icon: 'emergency_home', color: 'text-accent' },
    { key: 'info_desk', icon: 'info', color: 'text-primary' },
    { key: 'exit', icon: 'exit_to_app', color: 'text-primary' },
    { key: 'water', icon: 'local_drink', color: 'text-primary' },
    { key: 'elevator', icon: 'elevator', color: 'text-primary' },
  ];

  const handleSOS = () => {
    setState(prev => ({ ...prev, showSOSModal: true }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark p-4 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => onNavigate('home')}
          className="flex size-12 shrink-0 items-center justify-start text-gray-800 dark:text-gray-200"
        >
          <Icon name="arrow_back" style={{ fontSize: '28px' }} />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-900 dark:text-white">{t('quick_nav', l)}</h1>
        <div className="flex w-auto items-center justify-end gap-2">
          <p className="hidden sm:block text-xs text-danger dark:text-danger/90 font-medium">{t('sos', l)}</p>
          <button 
            onClick={handleSOS}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-danger text-white shadow-md active:scale-95 transition-transform animate-sos"
          >
            <Icon name="sos" className="text-white" style={{ fontSize: '24px' }} />
          </button>
        </div>
      </div>

      <main className="flex-grow p-4 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <button 
              key={idx}
              onClick={() => setState(prev => ({ ...prev, currentScreen: 'map', destinationKey: item.key, destination: t(item.key, l) }))}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 active:scale-[0.98] text-left"
            >
              <div className={`${item.color} p-2 bg-gray-50 dark:bg-gray-700 rounded-lg w-fit`}>
                <Icon name={item.icon} style={{ fontSize: '28px' }} />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{t(item.key, l)}</h2>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Sticky Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-10 w-full bg-background-light dark:bg-background-dark p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 text-center max-w-lg mx-auto">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">已選擇：{t('clinic_302', l)}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('est_dist', l)}</p>
          </div>
          <button 
            onClick={() => setState(prev => ({ ...prev, currentScreen: 'map', destinationKey: 'clinic_heart', destination: t('clinic_heart', l) }))}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent hover:bg-orange-600 active:scale-95 px-5 text-base font-bold text-white shadow-lg shadow-accent/30 transition-all"
          >
            <Icon name="directions_walk" style={{ fontSize: '20px' }} />
            <span>{t('start_nav', l)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};