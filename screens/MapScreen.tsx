import React, { useState, useRef, useEffect } from 'react';
import { NavProps } from '../types';
import { Icon } from '../components/Icon';
import { t } from '../translations';

export const MapScreen: React.FC<NavProps> = ({ onNavigate, state, setState }) => {
  const [zoom, setZoom] = useState(1);
  const [isAR, setIsAR] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSheetCollapsed, setIsSheetCollapsed] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const l = state.language;
  const destKey = state.destinationKey || 'clinic_heart';

  // Coordinate Mapping
  const coordMap: Record<string, { x: number, y: number }> = {
    'restroom': { x: 90, y: 450 },
    'pharmacy': { x: 90, y: 250 },
    'registration': { x: 90, y: 140 },
    'cashier': { x: 90, y: 140 },
    'info_desk': { x: 90, y: 72 }, 
    'clinic_heart': { x: 267, y: 135 }, 
    'clinic_302': { x: 267, y: 135 },
    'radiology': { x: 267, y: 135 }, // Top Room
    'exit': { x: 150, y: 50 },
    'emergency': { x: 267, y: 450 }, // Bottom Room
    
    // Moved from Top Right to Old Lab Position (y=190 area)
    'elevator': { x: 232, y: 240 },
    'water': { x: 302, y: 240 },
    
    'default': { x: 267, y: 135 }
  };

  const target = coordMap[destKey] || coordMap['default'];
  
  // Calculate dynamic path with specific routing logic
  const pathD = React.useMemo(() => {
    // Special routing for Elevator and Water to enter from the BOTTOM road (y=340)
    // 1. Start (150, 580) -> Go up to Horizontal Corridor (150, 340)
    // 2. Go right to target X -> Go up to target Y
    if (['elevator', 'water'].includes(destKey)) {
      return `M150 580 V340 H${target.x} V${target.y}`;
    }

    // Default Dogleg logic for other rooms
    return target.x === 150 
      ? `M150 580 V${target.y}` 
      : `M150 580 V${target.y} H${target.x}`;
  }, [destKey, target]);

  // Styles for active room
  const activeRoomClass = "fill-blue-100 dark:fill-blue-900/40 stroke-primary dark:stroke-blue-500 stroke-2 map-room-active";
  const inactiveRoomClass = "map-room-inactive";
  const textClass = "text-xs fill-slate-500 dark:fill-slate-400 font-medium map-text";
  const activeTextClass = "text-sm fill-primary dark:fill-blue-400 font-bold map-text map-text-active";

  // Handle Zoom
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 0.5));

  const handleSOS = () => {
    setState(prev => ({ ...prev, showSOSModal: true }));
  };

  // Handle Dragging / Panning
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAR) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isAR) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
  };

  // Handle Camera for AR
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    if (isAR) {
      const startCamera = async () => {
        setCameraError(null);
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setCameraError("Camera API not available on this device.");
          return;
        }

        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: 'environment'
            } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          setCameraError("Camera permission denied. Please allow camera access to use AR mode.");
        }
      };

      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isAR]);

  return (
    <div className="relative w-full h-full min-h-screen bg-[#eef2f6] dark:bg-[#0d141c] overflow-hidden flex flex-col">
      
      {/* Top Overlay: Destination Info & SOS */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none">
        <div className="mx-auto max-w-lg bg-white/90 backdrop-blur-md dark:bg-slate-800/90 rounded-2xl shadow-xl p-4 flex items-start justify-between border border-white/20 pointer-events-auto">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{t('go_to', l)}</p>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              {t(destKey, l)}
            </h2>
            <p className="text-sm font-bold text-green-500 flex items-center gap-1">
              {t('est_dist', l)}
            </p>
          </div>
          <div className="flex items-center gap-3">
             {/* Close Button */}
             <button 
               onClick={() => onNavigate('home')}
               className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
             >
               <Icon name="close" className="text-slate-700 dark:text-slate-300" />
             </button>
             {/* SOS Button */}
             <button 
               onClick={handleSOS}
               className="flex h-10 w-10 items-center justify-center rounded-full bg-danger text-white shadow-md active:scale-95 transition-transform animate-sos"
             >
               <Icon name="sos" />
             </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full h-full relative overflow-hidden touch-none bg-slate-100 dark:bg-slate-900">
        
        {/* AR View Layer */}
        {isAR && (
          <div className="absolute inset-0 z-10 bg-black">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Fallback image (shown behind video, or if video fails) */}
            <img 
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover -z-10 opacity-50" 
              alt="Hallway Reference"
            />
            
            {/* Error Message Overlay */}
            {cameraError && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-6 text-center">
                <div className="max-w-xs rounded-xl bg-white p-6 dark:bg-slate-800">
                  <Icon name="no_photography" className="text-4xl text-slate-400 mb-4" />
                  <p className="text-slate-900 dark:text-white font-bold mb-2">{l === 'en' ? 'Camera Error' : '相機無法使用'}</p>
                  <p className="text-slate-500 dark:text-slate-300 text-sm mb-4">{cameraError}</p>
                  <button 
                    onClick={() => setIsAR(false)}
                    className="w-full py-2 bg-primary text-white rounded-lg font-bold"
                  >
                    {l === 'en' ? 'Close AR' : '關閉 AR 模式'}
                  </button>
                </div>
              </div>
            )}
            
            {/* AR Specific Styles for Color Blind Override */}
            {state.isColorBlindMode && (
              <style>{`
                .ar-arrow-icon {
                  color: #FFEA00 !important;
                  filter: drop-shadow(0 0 4px #000) !important;
                }
                .ar-card {
                  background-color: rgba(0,0,0,0.85) !important;
                  border: 2px solid #FFEA00 !important;
                }
                .ar-card span, .ar-card .material-symbols-outlined {
                  color: #FFEA00 !important;
                }
                .ar-turn-icon-bg {
                  background-color: #FFEA00 !important;
                  color: #000 !important;
                }
                .ar-turn-icon-bg .material-symbols-outlined {
                  color: #000 !important;
                }
              `}</style>
            )}

            <style>{`
                @keyframes arrow-flow {
                  0% { transform: translateY(100px) scale(0.8); opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; }
                  100% { transform: translateY(-150px) scale(1.2); opacity: 0; }
                }
                .animate-arrow-flow {
                  animation: arrow-flow 2s infinite ease-out;
                }
                
                @keyframes path-pulse {
                  0%, 100% { opacity: 0.3; transform: scaleX(0.9); }
                  50% { opacity: 0.7; transform: scaleX(1.05); }
                }
                .animate-path-pulse {
                  animation: path-pulse 3s ease-in-out infinite;
                }

                @keyframes floor-grid-move {
                  0% { background-position: 0 0; }
                  100% { background-position: 0 40px; }
                }
                .animate-floor-grid {
                  background-image: linear-gradient(0deg, transparent 40%, ${state.isColorBlindMode ? 'rgba(255, 234, 0, 0.4)' : 'rgba(59, 130, 246, 0.4)'} 40%, ${state.isColorBlindMode ? 'rgba(255, 234, 0, 0.4)' : 'rgba(59, 130, 246, 0.4)'} 50%, transparent 50%);
                  background-size: 100% 40px;
                  animation: floor-grid-move 1.5s linear infinite reverse;
                }
            `}</style>
            
            {/* AR Overlays (Only show if no error) */}
            {!cameraError && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                
                {/* Floor Path Visualization */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
                  <div className="relative w-80 h-full max-h-[600px] transform-style-3d rotate-x-60" style={{ transform: 'rotateX(60deg)' }}>
                    
                    {/* Glowing Path Base (Subtle guide) */}
                    <div className={`absolute inset-x-24 top-0 bottom-0 blur-2xl rounded-full animate-path-pulse ${state.isColorBlindMode ? 'bg-yellow-400/20' : 'bg-blue-500/30'}`}></div>

                    {/* Moving Floor Grid (Pulsing visual cue) */}
                    <div className="absolute inset-x-20 top-0 bottom-0 opacity-40 animate-floor-grid [mask-image:linear-gradient(to_top,black,transparent)]"></div>

                    {/* Flowing Arrows */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-32">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div 
                          key={i} 
                          className="absolute animate-arrow-flow"
                          style={{ 
                            animationDelay: `${i * 0.4}s`,
                            bottom: '10%'
                          }}
                        >
                          <Icon 
                            name="keyboard_double_arrow_up" 
                            className={`text-[80px] md:text-[100px] font-bold ar-arrow-icon ${state.isColorBlindMode ? '' : 'text-[#137fec] drop-shadow-[0_0_15px_rgba(19,127,236,0.8)]'}`}
                            fill
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Turn Indicator */}
                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-auto min-w-[200px] flex justify-center">
                  <div className="ar-card bg-black/70 backdrop-blur-md text-white pl-4 pr-6 py-3 rounded-full flex items-center gap-4 border border-white/20 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="ar-turn-icon-bg w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-400/20 text-black">
                      <Icon name="turn_right" className="text-2xl font-bold" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold tracking-wider leading-tight">前方右轉</span>
                      <span className="text-xs text-gray-300 font-medium leading-tight">10 公尺後</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Map View Layer */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 
            ${isAR ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
           <div style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transformOrigin: 'center center'
           }}>
             <svg width="375" height="600" viewBox="0 0 375 600" className="drop-shadow-sm select-none">
               {/* Base Shadow */}
               <defs>
                 <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                   <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.05" />
                 </filter>
               </defs>
               
               {/* Background Rooms */}
               <g className="fill-slate-200 dark:fill-slate-800 transition-colors">
                 
                 {/* Info Desk (Left Top) */}
                 <rect x="40" y="55" width="100" height="35" rx="6" className={destKey === 'info_desk' ? activeRoomClass : inactiveRoomClass} />
                 <text x="90" y="77" textAnchor="middle" className={textClass}>{t('info_desk', l)}</text>

                 {/* Registration / Cashier */}
                 <rect x="40" y="100" width="100" height="80" rx="8" className={['registration', 'cashier'].includes(destKey) ? activeRoomClass : inactiveRoomClass} />
                 <text x="90" y="145" textAnchor="middle" className={textClass}>{t('registration', l)}</text>
                 
                 {/* Pharmacy */}
                 <rect x="40" y="200" width="100" height="100" rx="8" className={destKey === 'pharmacy' ? activeRoomClass : inactiveRoomClass} />
                 <text x="90" y="255" textAnchor="middle" className={textClass}>{t('pharmacy', l)}</text>

                 {/* Restroom */}
                 <rect x="40" y="380" width="100" height="140" rx="8" className={destKey === 'restroom' ? activeRoomClass : inactiveRoomClass} />
                 <text x="90" y="455" textAnchor="middle" className={textClass}>{t('restroom', l)}</text>

                 {/* Radiology (Top Room) */}
                 <rect x="200" y="100" width="135" height="70" rx="8" className={['radiology', 'clinic_heart', 'clinic_302'].includes(destKey) ? activeRoomClass : inactiveRoomClass} />
                 <text x="267" y="140" textAnchor="middle" className={textClass}>{t('radiology', l)}</text>

                 {/* NEW LOCATION: Elevator / Stairs (Left side of old Lab) */}
                 <rect x="200" y="190" width="65" height="100" rx="8" className={destKey === 'elevator' ? activeRoomClass : inactiveRoomClass} />
                 <text x="232" y="245" textAnchor="middle" className={textClass} style={{ fontSize: '10px' }}>{t('elevator', l)}</text>
                 
                 {/* NEW LOCATION: Water (Right side of old Lab) */}
                 <rect x="270" y="190" width="65" height="100" rx="8" className={destKey === 'water' ? activeRoomClass : inactiveRoomClass} />
                 <text x="302" y="245" textAnchor="middle" className={textClass}>{t('water', l)}</text>

                 {/* Emergency (Bottom Room) */}
                 <rect x="200" y="380" width="135" height="140" rx="8" className={destKey === 'emergency' ? activeRoomClass : inactiveRoomClass} />
                 <text x="267" y="445" textAnchor="middle" className={activeTextClass}>{t('emergency', l)}</text>
               </g>

               {/* Corridors (White overlay) - Removed top corridor (y=180), kept vertical and bottom (y=340) */}
               <path 
                 d="M150 50 V550 M40 340 H335" 
                 stroke="white" 
                 strokeWidth="40" 
                 strokeLinecap="round" 
                 className="stroke-white dark:stroke-[#0d141c] transition-colors map-corridor"
               />

               {/* Dynamic Navigation Path */}
               <path 
                 d={pathD} 
                 fill="none" 
                 stroke="#3b82f6" 
                 strokeWidth="6" 
                 strokeDasharray="12 8" 
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 className="animate-[dash_1s_linear_infinite] map-path"
               />
               <style>{`
                 @keyframes dash {
                   to { stroke-dashoffset: -20; }
                 }
               `}</style>

               {/* Start Point */}
               <g transform="translate(150, 560)">
                  <circle r="12" fill="#3b82f6" fillOpacity="0.2" className="animate-ping map-point-glow" />
                  <circle r="8" fill="#3b82f6" stroke="white" strokeWidth="3" className="map-point" />
               </g>

               {/* End Point (Dynamic) */}
               <g transform={`translate(${target.x}, ${target.y})`}>
                 <circle r="6" fill="#3b82f6" className="map-point" />
                 <circle r="8" fill="#3b82f6" fillOpacity="0.3" className="animate-pulse map-point-glow" />
               </g>
               
             </svg>
           </div>
        </div>

        {/* Floating Controls: Right Side (Hidden in AR) */}
        {!isAR && (
          <div className="absolute right-4 top-1/3 flex flex-col gap-4 z-20">
            {/* Zoom Controls */}
            <div className="flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700">
              <button 
                onClick={handleZoomIn}
                className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 dark:active:bg-slate-600 transition-colors border-b border-slate-100 dark:border-slate-700"
              >
                <Icon name="add" className="text-slate-700 dark:text-slate-200" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 active:bg-slate-100 dark:active:bg-slate-600 transition-colors"
              >
                <Icon name="remove" className="text-slate-700 dark:text-slate-200" />
              </button>
            </div>

            {/* Floor Selector */}
            <div className="flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700">
              <button className="p-3 text-sm font-bold text-slate-900 bg-slate-100 dark:bg-slate-700 dark:text-white">3F</button>
              <button className="p-3 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700 border-y border-slate-100 dark:border-slate-600">2F</button>
              <button className="p-3 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700">1F</button>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Sheet: Navigation Instructions */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-900 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out ${isSheetCollapsed ? 'translate-y-[calc(100%-90px)]' : 'translate-y-0'}`}
      >
        {/* Handle / Click Area */}
        <div 
          className="p-6 pb-2 cursor-pointer"
          onClick={() => setIsSheetCollapsed(!isSheetCollapsed)}
        >
          {/* Handle bar */}
          <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6"></div>
          
          <div className="text-center mb-4">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">前方 10 公尺右轉</h2>
             <p className="text-slate-500 dark:text-slate-400 text-lg">您目前在 A 棟 3 樓</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around px-4 pb-8">
           <button className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
             <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Icon name="volume_off" className="text-xl" />
             </div>
             <span className="text-xs font-bold">{t('mute', l)}</span>
           </button>

           <button className="flex items-center justify-center w-20 h-20 rounded-full bg-primary shadow-xl shadow-primary/40 active:scale-95 transition-transform">
             <Icon name="my_location" className="text-white text-4xl" />
           </button>

           <button 
             onClick={() => setIsAR(!isAR)}
             className={`flex flex-col items-center gap-2 transition-colors ${isAR ? 'text-primary dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'} hover:text-slate-800 dark:hover:text-slate-200`}
           >
             <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isAR ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-slate-100 dark:bg-slate-800'}`}>
                <Icon name={isAR ? "view_in_ar" : "view_in_ar"} fill={isAR} className="text-xl" />
             </div>
             <span className="text-xs font-bold">{isAR ? t('map_mode', l) : t('ar_mode', l)}</span>
           </button>
        </div>
      </div>

    </div>
  );
};