import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Briefcase,
  Wallet,
  Activity,
  Users,
  Dice5,
  Save,
  RefreshCw,
  CloudSun,
  MapPin,
  ThermometerSun,
  Shirt,
  Umbrella,
  Eye,
  EyeOff,
  ShieldCheck,
  Star,
  Triangle,
} from "lucide-react";

function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", variant = "default", children, ...props }) {
  const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-bold transition active:scale-[0.98] disabled:opacity-50";
  const variants = {
    default: "bg-white text-slate-950 hover:bg-white/90",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    outline: "border border-white/25 bg-white/10 text-white hover:bg-white/20",
  };
  return (
    <button className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  );
}

const USER_SIGNATURE = {
  fullName: "Huỳnh Nghĩa Nhơn",
  birthDateText: "13/09/2001",
  birthDate: "2001-09-13",
  birthTime: "11:40",
  canChi: "Tân Tỵ",
  lifePath: 7,
  zodiac: "Xử Nữ",
  city: "Ho Chi Minh City",
  fallbackLatitude: 10.8231,
  fallbackLongitude: 106.6297,
};

const ZODIAC_SIGNS = [
  { sign: "Ma Kết", from: [12, 22], to: [1, 19], trait: "kỷ luật, bền bỉ, thực tế" },
  { sign: "Bảo Bình", from: [1, 20], to: [2, 18], trait: "độc lập, khác biệt, sáng tạo" },
  { sign: "Song Ngư", from: [2, 19], to: [3, 20], trait: "cảm xúc, trực giác, giàu tưởng tượng" },
  { sign: "Bạch Dương", from: [3, 21], to: [4, 19], trait: "tiên phong, máu lửa, quyết đoán" },
  { sign: "Kim Ngưu", from: [4, 20], to: [5, 20], trait: "ổn định, kiên nhẫn, thích sự chắc chắn" },
  { sign: "Song Tử", from: [5, 21], to: [6, 20], trait: "linh hoạt, lanh lợi, giao tiếp tốt" },
  { sign: "Cự Giải", from: [6, 21], to: [7, 22], trait: "tình cảm, bảo vệ, tinh tế" },
  { sign: "Sư Tử", from: [7, 23], to: [8, 22], trait: "tự tin, nổi bật, có sức hút" },
  { sign: "Xử Nữ", from: [8, 23], to: [9, 22], trait: "tỉ mỉ, phân tích, cầu toàn" },
  { sign: "Thiên Bình", from: [9, 23], to: [10, 22], trait: "cân bằng, duyên dáng, yêu cái đẹp" },
  { sign: "Bọ Cạp", from: [10, 23], to: [11, 21], trait: "sâu sắc, quyết liệt, bí ẩn" },
  { sign: "Nhân Mã", from: [11, 22], to: [12, 21], trait: "tự do, lạc quan, thích khám phá" },
];

const CHINESE_ZODIAC = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
const HEAVENLY_STEMS = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
const EARTHLY_BRANCHES = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];

const LIFE_PATH = {
  1: { title: "Người Khởi Xướng", vibe: "độc lập, chủ động, hợp việc cần quyết định nhanh", advice: "Tự mở đường, nhưng đừng biến sự thẳng thắn thành áp lực." },
  2: { title: "Người Kết Nối", vibe: "hợp tác, tinh tế, nhạy với cảm xúc xung quanh", advice: "Một cuộc nói chuyện mềm có thể gỡ nút thắt tốt hơn tranh luận." },
  3: { title: "Người Sáng Tạo", vibe: "biểu đạt, vui vẻ, có duyên truyền cảm hứng", advice: "Đưa ý tưởng ra ngoài sớm, đừng chỉnh đến mức mất nhiệt." },
  4: { title: "Người Xây Nền", vibe: "kỷ luật, chắc chắn, hợp việc cần hệ thống", advice: "Dọn lại lịch, file, tiền bạc hoặc quy trình để bớt rối." },
  5: { title: "Người Thích Tự Do", vibe: "linh hoạt, nhanh nhạy, thích trải nghiệm mới", advice: "Thử nghiệm được, nhưng phải có giới hạn để khỏi lan man." },
  6: { title: "Người Chăm Sóc", vibe: "trách nhiệm, yêu sự hài hòa, quan tâm người khác", advice: "Giúp người khác là tốt, nhưng đừng nhận thêm việc vì ngại từ chối." },
  7: { title: "Người Chiêm Nghiệm", vibe: "phân tích, trực giác mạnh, cần không gian riêng để ra quyết định đúng", advice: "Đừng ép mình phản hồi quá nhanh. Khoảng lặng hôm nay là lợi thế của bạn." },
  8: { title: "Người Điều Hành", vibe: "tham vọng, thực tế, mạnh về mục tiêu và tài chính", advice: "Tập trung vào thứ tạo kết quả đo được." },
  9: { title: "Người Truyền Cảm Hứng", vibe: "bao dung, lý tưởng, nhìn được bức tranh lớn", advice: "Giữ bài học, không giữ cảm giác nặng nề." },
  11: { title: "Kênh Trực Giác", vibe: "nhạy cảm, truyền cảm hứng, dễ bắt tín hiệu tinh tế", advice: "Ghi linh cảm đầu tiên, nhưng kiểm chứng bằng dữ kiện." },
  22: { title: "Kiến Trúc Sư Lớn", vibe: "tầm nhìn lớn, thực thi mạnh, hợp xây dự án dài hạn", advice: "Chọn một bước cụ thể cho kế hoạch lớn." },
  33: { title: "Người Chữa Lành", vibe: "nâng đỡ, truyền cảm, có sức ảnh hưởng tích cực", advice: "Cho đi có chọn lọc, đừng phát năng lượng miễn phí cho drama." },
};

const LUCK_TIERS = [
  { name: "Vận khí thấp", min: 0, icon: "☁️", color: "from-slate-500 to-zinc-700", line: "Đi chậm, kiểm tra kỹ, đừng all-in cảm xúc." },
  { name: "Vận khí trung lập", min: 25, icon: "🌤️", color: "from-sky-400 to-blue-600", line: "Ổn để xử lý việc tồn đọng và giữ nhịp bình thường." },
  { name: "May mắn đang mở", min: 50, icon: "✨", color: "from-amber-300 to-orange-500", line: "Có tín hiệu tốt. Chủ động một chút là dễ mở cơ hội." },
  { name: "Rất may mắn", min: 75, icon: "🌈", color: "from-fuchsia-400 to-violet-600", line: "Ngày có lực đẩy tốt để mở lời, chốt việc hoặc bắt đầu một nhánh mới." },
];

const CATEGORY_BASE = [
  { key: "work", label: "Công việc", icon: Briefcase },
  { key: "money", label: "Tài chính", icon: Wallet },
  { key: "love", label: "Tình cảm", icon: Heart },
  { key: "health", label: "Sức khỏe", icon: Activity },
  { key: "social", label: "Quan hệ", icon: Users },
];

const DAILY_MESSAGES = [
  "Trực giác hôm nay không nói lớn, nó chỉ gõ nhẹ vào một chi tiết bạn suýt bỏ qua.",
  "Một câu trả lời chậm nhưng đúng sẽ cứu bạn khỏi một quyết định nhanh mà mệt.",
  "Đừng cố chứng minh quá nhiều. Kết quả rõ ràng sẽ tự nói phần của nó.",
  "Hôm nay bạn hợp đóng vai người quan sát hơn là người lao vào giữa bàn cờ.",
  "Việc nhỏ được chỉnh đúng chỗ sẽ mở ra cảm giác nhẹ người rất rõ.",
  "Không phải im lặng nào cũng là yếu thế. Có lúc im là đang đọc vị tình hình.",
  "Một lựa chọn ít ồn ào hơn sẽ giúp bạn giữ năng lượng sạch hơn.",
  "Bạn không cần xử lý hết mọi thứ. Bạn cần xử lý đúng thứ đang kéo mình xuống.",
  "Cơ hội hôm nay không mang bảng hiệu lớn. Nó nằm trong một chi tiết rất đời thường.",
  "Đừng để sự cầu toàn của Xử Nữ biến một việc 80 điểm thành áp lực 120 điểm.",
  "Số 7 của bạn hôm nay mạnh ở khả năng thấy điều người khác chưa kịp thấy.",
  "Tân Tỵ không cần vội lột xác. Chỉ cần đổi một thói quen nhỏ là vận đã chuyển hướng.",
];

const WEATHER_CODES = {
  0: { text: "Trời quang", rainy: false, sunny: true },
  1: { text: "Ít mây", rainy: false, sunny: true },
  2: { text: "Mây rải rác", rainy: false, sunny: false },
  3: { text: "Nhiều mây", rainy: false, sunny: false },
  45: { text: "Sương mù", rainy: false, sunny: false },
  48: { text: "Sương mù đóng băng", rainy: false, sunny: false },
  51: { text: "Mưa phùn nhẹ", rainy: true, sunny: false },
  53: { text: "Mưa phùn vừa", rainy: true, sunny: false },
  55: { text: "Mưa phùn dày", rainy: true, sunny: false },
  61: { text: "Mưa nhẹ", rainy: true, sunny: false },
  63: { text: "Mưa vừa", rainy: true, sunny: false },
  65: { text: "Mưa lớn", rainy: true, sunny: false },
  80: { text: "Mưa rào nhẹ", rainy: true, sunny: false },
  81: { text: "Mưa rào vừa", rainy: true, sunny: false },
  82: { text: "Mưa rào mạnh", rainy: true, sunny: false },
  95: { text: "Dông", rainy: true, sunny: false },
  96: { text: "Dông kèm mưa đá nhẹ", rainy: true, sunny: false },
  99: { text: "Dông kèm mưa đá mạnh", rainy: true, sunny: false },
};

const ZODIAC_API_SIGNS = {
  "Báº¡ch DÆ°Æ¡ng": "aries",
  "Kim NgÆ°u": "taurus",
  "Song Tá»­": "gemini",
  "Cá»± Giáº£i": "cancer",
  "SÆ° Tá»­": "leo",
  "Xá»­ Ná»¯": "virgo",
  "ThiÃªn BÃ¬nh": "libra",
  "Bá» Cáº¡p": "scorpio",
  "NhÃ¢n MÃ£": "sagittarius",
  "Ma Káº¿t": "capricorn",
  "Báº£o BÃ¬nh": "aquarius",
  "Song NgÆ°": "pisces",
};

const ASTRO_API_SOURCE = "freehoroscopeapi.com";

function reduceNumber(num, keepMaster = true) {
  let n = Math.abs(Number(num));
  if (!Number.isFinite(n)) return 0;
  while (n > 9) {
    if (keepMaster && [11, 22, 33].includes(n)) return n;
    n = String(n).split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n;
}

function getLifePath(dateString) {
  if (!dateString) return null;
  const digits = dateString.replace(/-/g, "").split("").map(Number);
  const total = digits.reduce((sum, n) => sum + n, 0);
  return reduceNumber(total, true);
}

function getPersonalYear(dateString, targetDate = new Date()) {
  if (!dateString) return null;
  const [, month, day] = dateString.split("-").map(Number);
  const year = targetDate.getFullYear();
  return reduceNumber(month + day + year, false);
}

function isBetween(month, day, from, to) {
  const value = month * 100 + day;
  const start = from[0] * 100 + from[1];
  const end = to[0] * 100 + to[1];
  if (start <= end) return value >= start && value <= end;
  return value >= start || value <= end;
}

function getZodiac(dateString) {
  if (!dateString) return null;
  const [, month, day] = dateString.split("-").map(Number);
  return ZODIAC_SIGNS.find((z) => isBetween(month, day, z.from, z.to));
}

function getChineseZodiac(dateString) {
  if (!dateString) return null;
  const year = Number(dateString.slice(0, 4));
  return CHINESE_ZODIAC[(year - 2020 + 1200) % 12];
}

function getCanChiYear(dateString) {
  if (!dateString) return null;
  const year = Number(dateString.slice(0, 4));
  return `${HEAVENLY_STEMS[(year - 1980 + 1000) % 10]} ${EARTHLY_BRANCHES[(year - 1980 + 1200) % 12]}`;
}

function getApiZodiacSign(profile) {
  const localZodiac = profile.zodiac || getZodiac(profile.birthDate)?.sign;
  return ZODIAC_API_SIGNS[localZodiac] || "virgo";
}

function normalizeAstroApi(data, sign) {
  const payload = data?.data || data;
  const horoscope = payload?.horoscope || payload?.prediction || payload?.description || payload?.text;
  if (!horoscope) return null;
  return {
    status: "ready",
    source: ASTRO_API_SOURCE,
    sign: payload?.sign || sign,
    date: payload?.date || todayKey(0),
    horoscope,
  };
}

function hashString(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash >>> 0);
}

function seededPercent(seed, salt = "") {
  return hashString(`${seed}|${salt}`) % 101;
}

function pick(seed, salt, list) {
  return list[seededPercent(seed, salt) % list.length];
}

function todayKey(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLuckTier(score) {
  return [...LUCK_TIERS].reverse().find((tier) => score >= tier.min) || LUCK_TIERS[0];
}

function getWeatherMeta(code) {
  return WEATHER_CODES[code] || { text: "Thời tiết biến động", rainy: false, sunny: false };
}

function maskName(name) {
  if (!name) return "Hồ sơ riêng tư";
  return name
    .split(" ")
    .map((part) => (part ? `${part[0]}${"•".repeat(Math.max(1, part.length - 1))}` : ""))
    .join(" ");
}

function maskBirthDate(dateString) {
  if (!dateString) return "**/**/****";
  const [year] = dateString.split("-");
  return `**/**/${year}`;
}

function getLuckyItems(seed, profile) {
  const colorsForVirgoSevenSnake = ["xanh navy", "trắng ngà", "xanh rêu", "xám bạc", "be sáng", "đen than", "nâu cà phê", "xanh olive", "kem"];
  const foods = ["nước lọc lạnh", "cà phê sữa ít đá", "trà đào", "cơm nhà", "sữa chua", "trái cây mát", "bánh mì nhẹ", "nước điện giải"];
  const actions = [
    "rà lại một chi tiết quan trọng",
    "dọn bàn làm việc 7 phút",
    "tắt thông báo 40 phút",
    "ghi lại linh cảm đầu tiên",
    "kiểm tra lại lịch hẹn",
    "đi bộ ngắn sau bữa trưa",
    "nói không với một việc gây nhiễu",
    "chốt một việc nhỏ trước 15h",
  ];
  const luckyPool = [7, 1, 4, 9, 2, 5, 8, 3, 6, 7, 7];

  return {
    color: pick(seed, "color", colorsForVirgoSevenSnake),
    number: pick(seed, `${profile.lifePath || 7}-number`, luckyPool),
    food: pick(seed, "food", foods),
    action: pick(seed, "action", actions),
  };
}

function buildOutfit(weather, luckyColor, seed) {
  if (!weather?.current) {
    return {
      title: "Outfit đang chờ thời tiết",
      detail: `Chọn đồ thoáng, gọn, ưu tiên ${luckyColor}. Khi có nhiệt độ thực tế app sẽ gợi ý sát hơn.`,
      icon: Shirt,
    };
  }

  const temp = Math.round(weather.current.temperature);
  const feels = Math.round(weather.current.apparentTemperature ?? weather.current.temperature);
  const meta = weather.current.meta;
  const rainy = meta.rainy || weather.current.precipitation > 0;
  const sunny = meta.sunny;
  const topLight = pick(seed, "outfit-top", ["áo thun cotton", "sơ mi linen", "áo polo mỏng", "áo thun oversize thoáng"]);
  const bottomLight = pick(seed, "outfit-bottom", ["quần jeans mỏng", "quần kaki sáng màu", "quần short lịch sự", "quần vải nhẹ"]);
  const shoes = pick(seed, "outfit-shoes", ["sneaker dễ đi", "giày slip-on", "sandal sạch gọn", "sneaker trắng"]);

  if (rainy) {
    return {
      title: "Có dấu hiệu mưa — mặc gọn, dễ di chuyển",
      detail: `${topLight} màu ${luckyColor}, ${bottomLight}, ${shoes}. Mang dù nhỏ hoặc áo khoác chống nước mỏng. Nhiệt độ khoảng ${temp}°C, cảm giác như ${feels}°C nên đừng mặc đồ dày.`,
      icon: Umbrella,
    };
  }

  if (temp >= 34 || feels >= 36) {
    return {
      title: "Trời nóng mạnh — ưu tiên mát và nhẹ",
      detail: `${topLight} màu ${luckyColor}, ${bottomLight}, ${shoes}. Né đồ đen dày. Nhiệt độ ngoài trời khoảng ${temp}°C, cảm giác như ${feels}°C nên cần nước và vải thoáng.`,
      icon: ThermometerSun,
    };
  }

  if (sunny) {
    return {
      title: "Có nắng — outfit sáng, sạch, ít lớp",
      detail: `${topLight} màu ${luckyColor}, ${bottomLight}, ${shoes}. Thêm nón/kính nếu ra ngoài lâu. Nhiệt độ khoảng ${temp}°C, cảm giác như ${feels}°C.`,
      icon: Shirt,
    };
  }

  return {
    title: "Thời tiết dễ chịu hơn — mặc chỉn chu vừa đủ",
    detail: `Sơ mi hoặc áo thun màu ${luckyColor}, quần gọn form, ${shoes}. Nhiệt độ khoảng ${temp}°C, cảm giác như ${feels}°C.`,
    icon: Shirt,
  };
}

function buildPersonalProphecy({ seed, reading, weather, profile }) {
  const temp = weather?.current?.temperature;
  const tempText = typeof temp === "number" ? `${Math.round(temp)}°C` : "nhiệt độ ngoài trời";
  const weatherText = weather?.current?.meta?.text || "thời tiết hiện tại";
  const strongest = [...reading.categories].sort((a, b) => b.value - a.value)[0];
  const weakest = [...reading.categories].sort((a, b) => a.value - b.value)[0];
  const timeWindows = ["trước 11h40", "sau bữa trưa", "khoảng đầu giờ chiều", "từ 15h đến 17h", "khi trời đổi nắng/mưa", "sau một tin nhắn ngắn"];
  const objects = ["một câu chữ", "một con số", "một thái độ im lặng", "một lỗi nhỏ", "một lời hẹn", "một thay đổi trong lịch", "một phản ứng rất nhanh của ai đó"];
  const actions = ["nên quan sát thêm", "đừng trả lời ngay", "hãy kiểm tra lại dữ kiện", "nên chọn phương án ít ồn hơn", "hãy giữ ranh giới", "nên chốt phần bạn chắc nhất"];
  const outcomes = [
    "vì nó sẽ cho bạn thấy ai đang thật sự nghiêm túc",
    "vì đây là chỗ trực giác số 7 của bạn hoạt động rõ nhất",
    "vì Xử Nữ của bạn sẽ bắt được điểm sai trước người khác",
    "vì năng lượng Tân Tỵ hôm nay hợp lột xác nhẹ, không hợp bốc đồng",
    "vì quyết định đúng hôm nay đến từ chi tiết, không đến từ cảm xúc lớn",
  ];

  const chosenWindow = pick(seed, "prophecy-window", timeWindows);
  const chosenObject = pick(seed, "prophecy-object", objects);
  const chosenAction = pick(seed, "prophecy-action", actions);
  const chosenOutcome = pick(seed, "prophecy-outcome", outcomes);

  const templates = [
    `${chosenWindow}, ${chosenObject} sẽ kéo sự chú ý của Nhơn. ${chosenAction}, ${chosenOutcome}.`,
    `Trong nền ${weatherText.toLowerCase()} khoảng ${tempText}, vận của Nhơn không nằm ở việc làm nhiều hơn, mà nằm ở việc nhận ra ${chosenObject} đúng lúc.`,
    `Hôm nay ${profile.zodiac} + số ${profile.lifePath} nhắc Nhơn: nếu thấy lấn cấn ở ${weakest.label.toLowerCase()}, đừng bỏ qua; đó là tín hiệu cần chỉnh trước khi nó lớn lên.`,
    `Điểm sáng nằm ở ${strongest.label.toLowerCase()}. Nhưng chìa khóa không phải lao nhanh, mà là dùng kiểu quan sát Tân Tỵ: im một nhịp, nhìn toàn cục, rồi mới ra tay.`,
    `Một người hoặc một việc sẽ để lộ nhịp thật qua ${chosenObject}. Nhơn chỉ cần bình tĩnh, vì hôm nay càng ít hấp tấp thì càng dễ thắng.`,
    `Nếu trời làm bạn khó chịu vì ${tempText}, hãy xem đó là lời nhắc giữ thân thể nhẹ trước đã. Khi cơ thể bớt nặng, trực giác số 7 của bạn sẽ rõ hơn.`,
  ];

  return pick(seed, "prophecy-template", templates);
}

function buildActionPlan({ seed, reading, weather }) {
  const temp = weather?.current?.temperature;
  const rainy = weather?.current?.meta?.rainy || weather?.current?.precipitation > 0;
  const hot = typeof temp === "number" && temp >= 34;
  const strongest = [...reading.categories].sort((a, b) => b.value - a.value)[0];
  const weakest = [...reading.categories].sort((a, b) => a.value - b.value)[0];
  const doPool = [
    `Ưu tiên ${strongest.label.toLowerCase()} trước, vì đây là vùng dễ có kết quả nhất trong ngày.`,
    "Dành 30–40 phút rà lại chi tiết quan trọng; Xử Nữ của bạn hôm nay thắng bằng độ chính xác.",
    "Ghi nhanh 3 điều đang làm bạn lấn cấn, rồi xử lý điều có bằng chứng rõ nhất trước.",
    "Chọn một việc nhỏ có thể hoàn tất trong ngày để tạo cảm giác thông suốt.",
    "Nếu cần nhắn tin hoặc trao đổi, hãy viết ngắn, rõ ý, không vòng vo cảm xúc.",
    hot ? "Uống nước đều và giảm việc ngoài trời; thân thể nhẹ thì trực giác số 7 mới sắc." : "Giữ nhịp làm việc yên tĩnh; số 7 của bạn hợp tập trung sâu hơn là chạy nhiều đầu việc.",
    rainy ? "Mang dù/áo mưa và đi sớm hơn dự kiến; đừng để thời tiết phá nhịp." : "Ra ngoài với lịch rõ ràng; đừng đi chỉ vì cảm hứng nhất thời.",
  ];
  const avoidPool = [
    "Tránh quyết định khi đang khó chịu, đói, nóng hoặc bị thúc ép.",
    "Tránh kể quá nhiều thông tin cá nhân cho người chưa đủ tin.",
    "Tránh mua món đắt tiền chỉ vì thấy nó giải tỏa mood trong vài phút.",
    "Tránh tranh luận để chứng minh mình đúng; hôm nay thắng bằng kết quả, không bằng lời.",
    "Tránh ôm việc của người khác nếu việc của mình chưa xong.",
    `Tránh bỏ qua ${weakest.label.toLowerCase()}, vì đây là điểm dễ làm ngày bị lệch nhịp.`,
    "Tránh phản hồi ngay với tin nhắn khiến bạn lấn cấn; chờ một nhịp rồi đọc lại.",
  ];
  const flowPool = [
    "Sáng: dọn đầu việc và chọn một mục tiêu chính.",
    "Trưa: ăn nhẹ, uống nước, đừng để nóng hoặc mệt làm bạn cáu.",
    "Chiều: xử lý việc cần kiểm tra, đối chiếu, xác nhận.",
    "Tối: giảm màn hình, ghi lại một tín hiệu đáng chú ý trong ngày.",
    "Trước khi chốt chuyện quan trọng: tự hỏi “mình có đang vội vì áp lực không?”.",
  ];

  return {
    do: Array.from(new Set([pick(seed, "do-1", doPool), pick(seed, "do-2", doPool), pick(seed, "do-3", doPool)])).slice(0, 3),
    avoid: Array.from(new Set([pick(seed, "avoid-1", avoidPool), pick(seed, "avoid-2", avoidPool), pick(seed, "avoid-3", avoidPool)])).slice(0, 3),
    flow: Array.from(new Set([pick(seed, "flow-1", flowPool), pick(seed, "flow-2", flowPool), pick(seed, "flow-3", flowPool)])).slice(0, 3),
  };
}

function buildReading(profile, dateOffset, weather, astroReport) {
  const day = todayKey(dateOffset);
  const name = profile.name?.trim() || USER_SIGNATURE.fullName;
  const seed = `${name}|${profile.birthDate}|${profile.birthTime}|${profile.canChi}|${profile.lifePath}|${profile.zodiac}|${day}`;
  const lifePath = Number(profile.lifePath) || getLifePath(profile.birthDate);
  const personalYear = getPersonalYear(profile.birthDate, new Date(day));
  const zodiac = getZodiac(profile.birthDate);
  const chinese = getChineseZodiac(profile.birthDate);
  const canChi = profile.canChi || getCanChiYear(profile.birthDate);
  const baseScore = seededPercent(seed, "overall");
  const lifeBoost = lifePath === 7 ? 17 : lifePath * 2;
  const virgoBoost = (profile.zodiac || zodiac?.sign) === "Xử Nữ" ? 9 : 0;
  const snakeBoost = canChi?.includes("Tỵ") ? 6 : 0;
  const weatherDrag = weather?.current?.temperature >= 35 ? -5 : 0;
  const score = Math.min(100, Math.max(0, Math.round(baseScore * 0.64 + lifeBoost + virgoBoost + snakeBoost + weatherDrag)));
  const tier = getLuckTier(score);
  const lucky = getLuckyItems(seed, { ...profile, lifePath });
  const apiMessage = dateOffset === 0 && astroReport?.status === "ready" ? astroReport.horoscope : "";
  const message = apiMessage || DAILY_MESSAGES[seededPercent(seed, "message") % DAILY_MESSAGES.length];
  const categories = CATEGORY_BASE.map((cat) => {
    const raw = seededPercent(seed, cat.key);
    const virgoWorkBoost = cat.key === "work" && (profile.zodiac || zodiac?.sign) === "Xử Nữ" ? 8 : 0;
    const sevenSocialPenalty = cat.key === "social" && lifePath === 7 ? -5 : 0;
    const heatHealthPenalty = cat.key === "health" && weather?.current?.temperature >= 35 ? -8 : 0;
    const value = Math.min(100, Math.max(0, Math.round(raw * 0.72 + score * 0.2 + virgoWorkBoost + sevenSocialPenalty + heatHealthPenalty)));
    const tone = value >= 75 ? "Rất thuận" : value >= 50 ? "Khá ổn" : value >= 25 ? "Cần tỉnh táo" : "Nên giữ nhịp thấp";
    return { ...cat, value, tone };
  });
  const outfit = buildOutfit(weather, lucky.color, seed);
  const prophecy = apiMessage || buildPersonalProphecy({ seed, reading: { categories }, weather, profile: { ...profile, lifePath, zodiac: profile.zodiac || zodiac?.sign } });
  const actionPlan = buildActionPlan({ seed, reading: { categories }, weather });
  return { day, lifePath, personalYear, zodiac, chinese, canChi, score, tier, lucky, message, categories, outfit, prophecy, actionPlan, astroReport };
}

const defaultProfile = {
  name: USER_SIGNATURE.fullName,
  birthDate: USER_SIGNATURE.birthDate,
  birthTime: USER_SIGNATURE.birthTime,
  city: USER_SIGNATURE.city,
  canChi: USER_SIGNATURE.canChi,
  lifePath: USER_SIGNATURE.lifePath,
  zodiac: USER_SIGNATURE.zodiac,
};

export default function FortuneChannelApp() {
  const [profile, setProfile] = useState(defaultProfile);
  const [dateOffset, setDateOffset] = useState(0);
  const [saved, setSaved] = useState(false);
  const [weather, setWeather] = useState({ status: "idle", current: null, locationLabel: "TP.HCM mặc định" });
  const [astroReport, setAstroReport] = useState({ status: "idle", source: ASTRO_API_SOURCE, horoscope: "" });
  const [privacyMode, setPrivacyMode] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("fortune-channel-profile");
    if (stored) {
      try {
        setProfile({ ...defaultProfile, ...JSON.parse(stored) });
      } catch {
        localStorage.removeItem("fortune-channel-profile");
      }
    }
  }, []);

  useEffect(() => {
    refreshWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refreshAstroReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.birthDate, profile.zodiac, dateOffset]);

  const reading = useMemo(() => buildReading(profile, dateOffset, weather, astroReport), [profile, dateOffset, weather, astroReport]);
  const lifeData = reading.lifePath ? LIFE_PATH[reading.lifePath] : null;
  const OutfitIcon = reading.outfit.icon;

  function updateProfile(key, value) {
    setSaved(false);
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function saveProfile() {
    localStorage.setItem("fortune-channel-profile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  async function fetchWeather(latitude, longitude, locationLabel) {
    setWeather((current) => ({ ...current, status: "loading" }));
    try {
      const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&forecast_days=1&timezone=auto&temperature_unit=celsius`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Không lấy được thời tiết");
      const data = await response.json();
      const code = data.current?.weather_code;
      const meta = getWeatherMeta(code);
      setWeather({
        status: "ready",
        locationLabel,
        current: {
          temperature: data.current?.temperature_2m,
          apparentTemperature: data.current?.apparent_temperature,
          humidity: data.current?.relative_humidity_2m,
          precipitation: data.current?.precipitation,
          wind: data.current?.wind_speed_10m,
          code,
          meta,
          time: data.current?.time,
        },
      });
    } catch {
      setWeather({ status: "error", current: null, locationLabel: "Không lấy được thời tiết" });
    }
  }

  async function refreshAstroReport() {
    if (dateOffset !== 0) {
      setAstroReport({ status: "idle", source: ASTRO_API_SOURCE, horoscope: "" });
      return;
    }

    const sign = getApiZodiacSign(profile);
    setAstroReport((current) => ({ ...current, status: "loading", sign }));

    try {
      const endpoint = `https://freehoroscopeapi.com/api/v1/get-horoscope/daily?sign=${encodeURIComponent(sign)}`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Horoscope API failed");
      const data = await response.json();
      const normalized = normalizeAstroApi(data, sign);
      if (!normalized) throw new Error("Horoscope API returned empty data");
      setAstroReport(normalized);
    } catch {
      setAstroReport({ status: "error", source: ASTRO_API_SOURCE, sign, horoscope: "" });
    }
  }

  function refreshWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude, "Vị trí hiện tại"),
        () => fetchWeather(USER_SIGNATURE.fallbackLatitude, USER_SIGNATURE.fallbackLongitude, "TP.HCM mặc định"),
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 10 * 60 * 1000 }
      );
    } else {
      fetchWeather(USER_SIGNATURE.fallbackLatitude, USER_SIGNATURE.fallbackLongitude, "TP.HCM mặc định");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#201833] via-[#31254a] to-[#4a3166] text-white p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-[1.25fr_0.75fr] items-stretch">
          <Card className="bg-white/15 border border-white/25 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden text-white">
            <CardContent className="p-6 md:p-8 text-white">
              <div className="flex items-center gap-3 text-amber-200 mb-4">
                <Sparkles className="h-6 w-6" />
                <span className="text-sm uppercase tracking-[0.28em]">Daily Fortune Channel</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight text-white drop-shadow-sm">Kênh tiên tri đời thực cho Nhơn.</h1>
              <p className="mt-4 text-white/80 max-w-2xl">Hồ sơ cá nhân đang được bảo vệ. App chỉ hiển thị kết quả, thời tiết theo °C, outfit, cảnh báo và lời tiên tri hằng ngày.</p>
            </CardContent>
          </Card>

          <Card className={`relative bg-gradient-to-br ${reading.tier.color} border border-white/25 rounded-2xl shadow-2xl overflow-hidden text-white`}>
            <FortuneAnimation score={reading.score} tierName={reading.tier.name} />
            <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
              <div>
                <div className="text-6xl mb-3">{reading.tier.icon}</div>
                <p className="text-white/85 text-sm uppercase tracking-[0.25em]">Mức may mắn hôm nay</p>
                <h2 className="text-3xl font-black mt-2 text-white">{reading.tier.name}</h2>
                <p className="text-white/90 mt-3">{reading.tier.line}</p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2 text-white">
                  <span>Chỉ số vận khí</span>
                  <strong>{reading.score}/100</strong>
                </div>
                <div className="h-3 rounded-full bg-black/20 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${reading.score}%` }} transition={{ duration: 0.8 }} className="h-full bg-white rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.header>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <Card className="bg-white/15 border border-white/25 backdrop-blur-xl rounded-2xl shadow-xl text-white">
            <CardContent className="p-5 space-y-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">Hồ sơ người xem</h2>
                  <p className="text-sm text-white/70">Mặc định bật riêng tư để tránh lộ dữ liệu sinh.</p>
                </div>
                <Button onClick={() => setPrivacyMode((value) => !value)} variant="outline" className="rounded-xl gap-2">
                  {privacyMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {privacyMode ? "Hiện" : "Ẩn"}
                </Button>
              </div>

              {privacyMode ? (
                <div className="rounded-2xl bg-black/20 border border-white/15 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-amber-200">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-bold">Chế độ riêng tư đang bật</span>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">App vẫn dùng hồ sơ gốc để tính, nhưng chỉ hiển thị dạng đã che để tránh người khác nhìn màn hình và lấy thông tin nhạy cảm.</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <PrivateBox label="Tên" value={maskName(profile.name)} />
                    <PrivateBox label="Ngày sinh" value={maskBirthDate(profile.birthDate)} />
                    <PrivateBox label="Giờ sinh" value="**:**" />
                    <PrivateBox label="Hồ sơ" value="Đã khóa" />
                  </div>
                </div>
              ) : (
                <>
                  <label className="block space-y-2">
                    <span className="text-sm text-white/75">Tên đầy đủ</span>
                    <input value={profile.name} onChange={(e) => updateProfile("name", e.target.value)} className="w-full rounded-xl bg-black/25 border border-white/15 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-amber-300" />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-sm text-white/75">Ngày sinh</span>
                    <input type="date" value={profile.birthDate} onChange={(e) => updateProfile("birthDate", e.target.value)} className="w-full rounded-xl bg-black/25 border border-white/15 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-amber-300" />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block space-y-2">
                      <span className="text-sm text-white/75">Giờ sinh</span>
                      <input type="time" value={profile.birthTime} onChange={(e) => updateProfile("birthTime", e.target.value)} className="w-full rounded-xl bg-black/25 border border-white/15 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-amber-300" />
                    </label>
                    <label className="block space-y-2">
                      <span className="text-sm text-white/75">Nơi sinh</span>
                      <input value={profile.city} onChange={(e) => updateProfile("city", e.target.value)} className="w-full rounded-xl bg-black/25 border border-white/15 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-amber-300" />
                    </label>
                  </div>
                </>
              )}

              <div className="grid grid-cols-3 gap-2">
                <Button variant={dateOffset === -1 ? "default" : "secondary"} onClick={() => setDateOffset(-1)} className="rounded-xl">Hôm qua</Button>
                <Button variant={dateOffset === 0 ? "default" : "secondary"} onClick={() => setDateOffset(0)} className="rounded-xl">Hôm nay</Button>
                <Button variant={dateOffset === 1 ? "default" : "secondary"} onClick={() => setDateOffset(1)} className="rounded-xl">Mai</Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={saveProfile} className="rounded-xl gap-2 bg-amber-300 text-black hover:bg-amber-200"><Save className="h-4 w-4" /> {saved ? "Đã lưu" : "Lưu"}</Button>
                <Button variant="outline" onClick={() => setProfile(defaultProfile)} className="rounded-xl gap-2"><RefreshCw className="h-4 w-4" /> Reset</Button>
              </div>

              <p className="text-xs text-white/55 leading-relaxed">Đây là app giải trí/tự phản chiếu. Không dùng để thay thế quyết định tài chính, sức khỏe, pháp lý hoặc y tế.</p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
              <InfoCard title="Thần số học" headline={`Số ${reading.lifePath || "?"}`} body={`${lifeData?.title || "Chưa đủ dữ liệu"} — ${lifeData?.vibe || ""}`} />
              <InfoCard title="Tử vi Tây phương" headline={profile.zodiac || reading.zodiac?.sign || "?"} body={reading.zodiac?.trait || "Nhập ngày sinh để xác định cung."} />
              <InfoCard title="Can Chi / năm cá nhân" headline={privacyMode ? "Đã khóa" : reading.canChi || "?"} body={`Năm cá nhân: ${reading.personalYear || "?"}`} />
            </section>

            <Card className="bg-white/15 border border-white/25 backdrop-blur-xl rounded-2xl shadow-xl text-white">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-sm text-amber-200 uppercase tracking-[0.25em]">Bản tin ngày {reading.day}</p>
                    <h2 className="text-2xl md:text-3xl font-black mt-2 text-white">Fortune Channel của Nhơn hôm nay.</h2>
                    <p className="text-xs text-white/60 mt-2">
                      {astroReport.status === "ready"
                        ? `API horoscope: ${astroReport.source} (${astroReport.sign}, ${astroReport.date})`
                        : astroReport.status === "loading"
                          ? "Đang gọi API horoscope..."
                          : "Horoscope API chưa sẵn sàng, app đang dùng fallback nội bộ."}
                    </p>
                  </div>
                  <motion.div animate={{ y: [0, -4, 0], rotate: [0, 4, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                    <Dice5 className="h-10 w-10 text-amber-200" />
                  </motion.div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr]">
                  <div className="p-5 rounded-2xl bg-black/25 border border-white/10 text-white">
                    <div className="flex items-center gap-2 text-amber-200 mb-2">
                      <Eye className="h-5 w-5" />
                      <span className="text-sm uppercase tracking-[0.18em]">Tiên tri cá nhân — đây là phần dành cho bạn</span>
                    </div>
                    <motion.p className="text-lg md:text-xl leading-relaxed text-white" animate={{ opacity: [0.92, 1, 0.92] }} transition={{ duration: 2.6, repeat: Infinity }}>“{reading.prophecy}”</motion.p>
                    {lifeData && <p className="text-white/75 mt-3">Gợi ý theo số chủ đạo 7: {lifeData.advice}</p>}
                  </div>

                  <div className="p-5 rounded-2xl bg-black/25 border border-white/10 text-white">
                    <div className="flex items-center gap-2 text-amber-200 mb-2">
                      <Sparkles className="h-5 w-5" />
                      <span className="text-sm uppercase tracking-[0.18em]">Lời nhắc phụ trong ngày</span>
                    </div>
                    <p className="text-lg md:text-xl leading-relaxed text-white">“{reading.message}”</p>
                    <p className="text-white/75 mt-3">Đây là câu nhắc chung để lấy mood; phần tiên tri chính nằm ở ô bên trái.</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-5">
                  <MiniStat label="Màu may mắn" value={reading.lucky.color} />
                  <MiniStat label="Số may mắn" value={reading.lucky.number} />
                  <MiniStat label="Nạp năng lượng" value={reading.lucky.food} />
                  <MiniStat label="Nhiệm vụ phụ" value={reading.lucky.action} />
                </div>

                <div className="grid gap-4 lg:grid-cols-3 mt-5">
                  <ActionList title="Nên làm" items={reading.actionPlan.do} />
                  <ActionList title="Nên tránh" items={reading.actionPlan.avoid} />
                  <ActionList title="Đi cho suôn sẻ" items={reading.actionPlan.flow} />
                </div>
              </CardContent>
            </Card>

            <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <Card className="bg-white/15 border border-white/25 rounded-2xl shadow-xl text-white">
                <CardContent className="p-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-white/65 flex items-center gap-2"><MapPin className="h-4 w-4" /> {weather.locationLabel}</p>
                      <h3 className="text-2xl font-black mt-1 flex items-center gap-2 text-white"><CloudSun className="h-7 w-7 text-amber-200" /> Thời tiết ngoài trời</h3>
                    </div>
                    <Button onClick={refreshWeather} variant="outline" className="rounded-xl">Cập nhật</Button>
                  </div>
                  {weather.status === "loading" && <p className="text-white/75 mt-4">Đang lấy thời tiết thực tế...</p>}
                  {weather.status === "error" && <p className="text-red-200 mt-4">Không lấy được thời tiết. Hãy bật quyền vị trí hoặc thử lại.</p>}
                  {weather.current && (
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <WeatherStat label="Nhiệt độ" value={`${Math.round(weather.current.temperature)}°C`} />
                      <WeatherStat label="Cảm giác như" value={`${Math.round(weather.current.apparentTemperature)}°C`} />
                      <WeatherStat label="Tình trạng" value={weather.current.meta.text} />
                      <WeatherStat label="Độ ẩm" value={`${weather.current.humidity}%`} />
                      <WeatherStat label="Mưa hiện tại" value={`${weather.current.precipitation ?? 0} mm`} />
                      <WeatherStat label="Gió" value={`${Math.round(weather.current.wind ?? 0)} km/h`} />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/15 border border-white/25 rounded-2xl shadow-xl text-white">
                <CardContent className="p-5 text-white">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center"><OutfitIcon className="h-6 w-6 text-amber-200" /></div>
                    <div>
                      <p className="text-sm text-white/65">Gợi ý mặc hôm nay</p>
                      <h3 className="text-2xl font-black text-white">{reading.outfit.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-white/80 leading-relaxed">{reading.outfit.detail}</p>
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {reading.categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Card key={cat.key} className="bg-white/15 border border-white/25 rounded-2xl shadow-xl overflow-hidden text-white">
                    <CardContent className="p-5 text-white">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center"><Icon className="h-5 w-5 text-amber-200" /></div>
                        <div>
                          <h3 className="font-bold text-white">{cat.label}</h3>
                          <p className="text-sm text-white/65">{cat.tone}</p>
                        </div>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-black/25 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${cat.value}%` }} transition={{ duration: 0.7 }} className="h-full bg-amber-300 rounded-full" />
                      </div>
                      <p className="text-2xl font-black mt-3 text-white">{cat.value}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function FortuneAnimation({ score, tierName }) {
  const isVeryLucky = score >= 75 || tierName === "Rất may mắn";
  const isNormalLucky = !isVeryLucky && ((score >= 45 && score < 75) || tierName === "May mắn đang mở" || tierName === "Vận khí trung lập");

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {isVeryLucky && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_62%)]" />
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`purple-star-${i}`}
              className="absolute"
              initial={{ opacity: 0, y: 30 + i * 4, x: `${8 + i * 7}%`, scale: 0.55 }}
              animate={{ opacity: [0, 1, 0.9, 0], y: [-8, -34, -62], scale: [0.55, 1.05, 0.82], rotate: [0, 12, -12, 0] }}
              transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
              style={{ top: `${52 + (i % 3) * 9}%` }}
            >
              <Star className="h-4 w-4 text-violet-200 fill-violet-400 drop-shadow-[0_0_10px_rgba(196,181,253,0.95)]" />
            </motion.div>
          ))}
          <motion.div className="absolute right-6 top-5 text-violet-100/90 font-black tracking-[0.22em] text-xs" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity }}>
            RẤT MAY MẮN
          </motion.div>
        </>
      )}

      {isNormalLucky && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.16),transparent_65%)]" />
          <motion.div className="absolute right-8 top-8" animate={{ y: [0, -4, 0], scale: [1, 1.04, 1], rotate: [0, 1.5, -1.5, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
            <div className="relative flex items-center justify-center">
              <Triangle className="h-16 w-16 text-yellow-300 fill-yellow-400 drop-shadow-[0_0_18px_rgba(251,191,36,0.75)]" />
              <motion.div className="absolute h-20 w-20 rounded-full border border-yellow-200/30" animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.25, 0.55, 0.25] }} transition={{ duration: 2.5, repeat: Infinity }} />
              <motion.div className="absolute h-24 w-24 rounded-full border border-yellow-100/20" animate={{ scale: [1, 1.25, 1], opacity: [0.18, 0.35, 0.18] }} transition={{ duration: 3.1, repeat: Infinity }} />
            </div>
          </motion.div>
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={`gold-spark-${i}`}
              className="absolute"
              initial={{ opacity: 0, scale: 0.5, x: `${62 + (i % 4) * 7}%`, y: `${18 + i * 8}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.1, 0.6], rotate: [0, 25, -20, 0] }}
              transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.18 }}
            >
              <Sparkles className="h-4 w-4 text-amber-100 drop-shadow-[0_0_8px_rgba(253,230,138,0.8)]" />
            </motion.div>
          ))}
          <motion.div className="absolute right-6 bottom-6 text-yellow-100/90 font-black tracking-[0.22em] text-xs" animate={{ opacity: [0.65, 1, 0.65] }} transition={{ duration: 2.4, repeat: Infinity }}>
            MAY MẮN
          </motion.div>
        </>
      )}

      {!isVeryLucky && !isNormalLucky && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div key={`soft-particle-${i}`} className="absolute h-2 w-2 rounded-full bg-white/25" initial={{ opacity: 0.15, x: `${10 + i * 18}%`, y: `${20 + i * 10}%` }} animate={{ opacity: [0.15, 0.35, 0.15], y: [`${20 + i * 10}%`, `${16 + i * 10}%`, `${20 + i * 10}%`] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }} />
          ))}
        </>
      )}
    </div>
  );
}

function InfoCard({ title, headline, body }) {
  return (
    <Card className="bg-white/15 border border-white/25 rounded-2xl shadow-xl text-white">
      <CardContent className="p-5 text-white">
        <p className="text-sm text-white/65">{title}</p>
        <h3 className="text-3xl font-black mt-1 text-white">{headline}</h3>
        <p className="text-sm text-white/75 mt-2">{body}</p>
      </CardContent>
    </Card>
  );
}

function PrivateBox({ label, value }) {
  return (
    <div className="rounded-xl bg-white/10 p-3">
      <span className="text-white/55">{label}</span>
      <br />
      <strong>{value}</strong>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/10 p-4 text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-white/55">{label}</p>
      <p className="font-black text-lg mt-1 capitalize text-white">{value}</p>
    </div>
  );
}

function WeatherStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/10 p-4 text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-white/55">{label}</p>
      <p className="font-black text-lg mt-1 text-white">{value}</p>
    </div>
  );
}

function ActionList({ title, items }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/10 p-4 text-white">
      <h4 className="font-black text-amber-200 mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-white/85 leading-relaxed">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="flex gap-2">
            <span className="text-amber-200">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
