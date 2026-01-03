import { Language } from './types';

export const translations: Record<string, Record<Language, string>> = {
  "app.title": { "zh-TW": "診間指引", "en": "Clinic Guide", "ja": "診療所案内", "ko": "진료소 안내", "vi": "Hướng dẫn", "th": "คู่มือคลินิก" },
  "lang.btn": { "zh-TW": "語言", "en": "Language", "ja": "言語", "ko": "언어", "vi": "Ngôn ngữ", "th": "ภาษา" },
  "sos": { "zh-TW": "呼叫志工/醫護站", "en": "Call Help", "ja": "救急呼び出し", "ko": "도움 요청", "vi": "Gọi trợ giúp", "th": "ขอความช่วยเหลือ" },
  "sos_sent": { "zh-TW": "求助訊號已發送！志工或護理師即將到來。", "en": "Help signal sent! A volunteer or nurse is on the way.", "ja": "助けを呼びました！ボランティアや看護師がすぐに来ます。", "ko": "도움 요청이 전송되었습니다! 곧 직원이 도착합니다.", "vi": "Đã gửi tín hiệu! Tình nguyện viên hoặc y tá đang đến.", "th": "ส่งสัญญาณขอความช่วยเหลือแล้ว! อาสาสมัครหรือพยาบาลกำลังมา" },
  "sos_modal_title": { "zh-TW": "求助訊號已發送", "en": "Help Signal Sent", "ja": "救助信号送信完了", "ko": "신호 전송됨", "vi": "Tín hiệu đã gửi", "th": "ส่งสัญญาณแล้ว" },
  "sos_modal_body": { "zh-TW": "請稍候，志工或護理師即將抵達協助您。", "en": "Please wait, assistance is on the way.", "ja": "お待ちください。まもなくスタッフが参ります。", "ko": "잠시만 기다려주세요. 곧 도움을 드립니다.", "vi": "Vui lòng chờ, nhân viên sẽ đến ngay.", "th": "โปรดรอสักครู่ เจ้าหน้าที่กำลังมา" },
  "sos_modal_btn": { "zh-TW": "我知道了", "en": "I Understand", "ja": "了解", "ko": "확인", "vi": "Đã hiểu", "th": "ตกลง" },
  "family_mode": { "zh-TW": "家屬模式已開啟", "en": "Family Mode On", "ja": "家族モード", "ko": "보호자 모드", "vi": "Chế độ gia đình", "th": "โหมดครอบครัว" },
  "doctor": { "zh-TW": "主治醫師", "en": "Doctor", "ja": "担当医", "ko": "담당 의사", "vi": "Bác sĩ", "th": "แพทย์" },
  "wait_time": { "zh-TW": "預計等候時間", "en": "Est. Wait", "ja": "待ち時間", "ko": "대기 시간", "vi": "Thời gian chờ", "th": "เวลารอ" },
  "start_nav": { "zh-TW": "開始導引至診間", "en": "Start Navigation", "ja": "案内開始", "ko": "길찾기 시작", "vi": "Bắt đầu", "th": "เริ่มนำทาง" },
  "quick_nav": { "zh-TW": "快速導航", "en": "Quick Nav", "ja": "クイックナビ", "ko": "빠른 탐색", "vi": "Điều hướng nhanh", "th": "นำทางด่วน" },
  "more": { "zh-TW": "更多選項", "en": "More", "ja": "もっと", "ko": "더보기", "vi": "Thêm", "th": "เพิ่มเติม" },
  "home": { "zh-TW": "首頁", "en": "Home", "ja": "ホーム", "ko": "홈", "vi": "Trang chủ", "th": "หน้าแรก" },
  "settings": { "zh-TW": "設定", "en": "Settings", "ja": "設定", "ko": "설정", "vi": "Cài đặt", "th": "การตั้งค่า" },
  "general": { "zh-TW": "一般設定", "en": "General", "ja": "一般", "ko": "일반", "vi": "Chung", "th": "ทั่วไป" },
  "voice_hint": { "zh-TW": "語音導航提示", "en": "Voice Hints", "ja": "音声案内", "ko": "음성 안내", "vi": "Gợi ý giọng nói", "th": "คำแนะนำด้วยเสียง" },
  "voice_language": { "zh-TW": "語音語言", "en": "Voice Language", "ja": "音声言語", "ko": "음성 언어", "vi": "Ngôn ngữ giọng nói", "th": "ภาษาเสียง" },
  "accessibility": { "zh-TW": "輔助功能", "en": "Accessibility", "ja": "アクセシビリティ", "ko": "접근성", "vi": "Trợ năng", "th": "การเข้าถึง" },
  "color_blind_mode": { "zh-TW": "友善色盲模式", "en": "Color Blind Mode", "ja": "色覚サポート", "ko": "색맹 모드", "vi": "Chế độ mù màu", "th": "โหมดตาบอดสี" },
  "font_size": { "zh-TW": "調整字體大小", "en": "Font Size", "ja": "フォントサイズ", "ko": "글자 크기", "vi": "Cỡ chữ", "th": "ขนาดตัวอักษร" },
  "go_to": { "zh-TW": "前往", "en": "Go to", "ja": "へ行く", "ko": "이동", "vi": "Đi đến", "th": "ไปที่" },
  "est_dist": { "zh-TW": "預計 2 分鐘 • 剩餘 150 公尺", "en": "2 min • 150m left", "ja": "2分 • 残り150m", "ko": "2분 • 150m 남음", "vi": "2 phút • còn 150m", "th": "2 นาที • เหลือ 150 ม." },
  "ar_mode": { "zh-TW": "AR模式", "en": "AR Mode", "ja": "ARモード", "ko": "AR 모드", "vi": "Chế độ AR", "th": "โหมด AR" },
  "map_mode": { "zh-TW": "地圖模式", "en": "Map Mode", "ja": "地図モード", "ko": "지도 모드", "vi": "Chế độ bản đồ", "th": "โหมดแผนที่" },
  "mute": { "zh-TW": "靜音", "en": "Mute", "ja": "ミュート", "ko": "음소거", "vi": "Tắt tiếng", "th": "ปิดเสียง" },
  
  // Locations
  "restroom": { "zh-TW": "洗手間", "en": "Restroom", "ja": "トイレ", "ko": "화장실", "vi": "Nhà vệ sinh", "th": "ห้องน้ำ" },
  "pharmacy": { "zh-TW": "藥局", "en": "Pharmacy", "ja": "薬局", "ko": "약국", "vi": "Nhà thuốc", "th": "ร้านขายยา" },
  "cashier": { "zh-TW": "批價掛號", "en": "Cashier", "ja": "会計", "ko": "수납/접수", "vi": "Thu ngân", "th": "ชำระเงิน" },
  "exit": { "zh-TW": "出口", "en": "Exit", "ja": "出口", "ko": "출구", "vi": "Lối ra", "th": "ทางออก" },
  "registration": { "zh-TW": "掛號櫃台", "en": "Registration", "ja": "受付", "ko": "접수처", "vi": "Đăng ký", "th": "ลงทะเบียน" },
  "emergency": { "zh-TW": "急診", "en": "Emergency", "ja": "救急", "ko": "응급실", "vi": "Cấp cứu", "th": "ฉุกเฉิน" },
  "info_desk": { "zh-TW": "服務台", "en": "Info Desk", "ja": "案内所", "ko": "안내 데스크", "vi": "Quầy thông tin", "th": "จุดประชาสัมพันธ์" },
  "water": { "zh-TW": "飲水機", "en": "Water", "ja": "給水機", "ko": "정수기", "vi": "Nước uống", "th": "น้ำดื่ม" },
  "elevator": { "zh-TW": "電梯 / 樓梯", "en": "Elevator", "ja": "エレベーター", "ko": "엘리베이터", "vi": "Thang máy", "th": "ลิฟต์" },
  "clinic_heart": { "zh-TW": "放射科", "en": "Radiology", "ja": "放射線科", "ko": "방사선과", "vi": "Khoa X-quang", "th": "รังสีวิทยา" },
  "clinic_302": { "zh-TW": "X光室 報到處", "en": "X-Ray Reception", "ja": "X線受付", "ko": "X-레이 접수", "vi": "X-quang Tiếp tân", "th": "แผนกเอกซเรย์" },
  "radiology": { "zh-TW": "放射科", "en": "Radiology", "ja": "放射線科", "ko": "방사선과", "vi": "X-quang", "th": "รังสีวิทยา" },
  "lab": { "zh-TW": "檢驗室", "en": "Lab", "ja": "検査室", "ko": "검사실", "vi": "Phòng thí nghiệm", "th": "ห้องปฏิบัติการ" }
};

export const t = (key: string, lang: Language): string => {
  return translations[key]?.[lang] || translations[key]?.['zh-TW'] || key;
};

export const languageNames: Record<Language, string> = {
  'zh-TW': '中文',
  'en': 'English',
  'ja': '日文',
  'ko': '韓文',
  'vi': 'Tiếng Việt',
  'th': 'ภาษาไทย'
};