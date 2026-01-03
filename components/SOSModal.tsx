import React from 'react';
import { Icon } from './Icon';
import { t } from '../translations';
import { Language } from '../types';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[320px] overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl transition-all animate-in zoom-in-95 duration-200 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
          <Icon name="support_agent" className="text-4xl text-danger" fill />
        </div>
        
        <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
          {t('sos_modal_title', language)}
        </h2>
        
        <p className="mb-6 text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
          {t('sos_modal_body', language)}
        </p>
        
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-danger py-3 text-base font-bold text-white shadow-lg shadow-danger/30 transition-transform active:scale-[0.98] hover:bg-red-700"
        >
          {t('sos_modal_btn', language)}
        </button>
      </div>
    </div>
  );
};