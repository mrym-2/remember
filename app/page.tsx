'use client';
import { useState } from 'react';

const mockScenarios = [
  {
    keywords: ["نورة", "سعر", "عرض", "اجتماع", "ملف", "xyz"],
    file_name: "عرض_سعر_شركة_XYZ.pdf",
    sender: "نورة",
    channel: "WhatsApp",
    message_date: "14 أغسطس",
    message_text: "هذا العرض بعد التعديل لشركة XYZ، بانتظار ملاحظاتكم قبل الاجتماع.",
    related_meeting: "اجتماع مناقشة مشروع XYZ - 15 أغسطس",
    amount: "12,500 ريال"
  },
  {
    keywords: ["سارة", "تقرير", "أداء", "نمو"],
    file_name: "تقرير_الأداء_الشهري.xlsx",
    sender: "سارة",
    channel: "Email",
    message_date: "1 أغسطس",
    message_text: "مرفق تقرير النمو الشهري للقسم.",
    related_meeting: "اجتماع الإدارة العامة",
    amount: "غير مذكور"
  }
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    const text = query.trim().toLowerCase();
    
    if (!text) {
      setResult(null);
      return;
    }

    const matched = mockScenarios.find(s => 
      s.keywords.some(k => text.includes(k.toLowerCase())) || text.includes(s.sender.toLowerCase())
    );

    setResult(matched || null);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center justify-center font-sans" dir="rtl">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-indigo-400 mb-2">
            🧠 ما الذي تحاول تذكره؟
          </h1>
          <p className="text-slate-400 text-lg">
            ابحث بسياق الموقف بدلاً من الكلمات الحرفية
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="مثال: ملف أرسلته نورة قبل اجتماع وكان فيه عرض سعر..."
            className="flex-1 p-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-right"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-xl font-semibold transition cursor-pointer"
          >
            ابحث في الذاكرة
          </button>
        </div>

        {searched && result && (
          <div className="bg-slate-900 border border-indigo-500/30 p-6 rounded-2xl text-right space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full font-medium">🎯 تم العثور على التطابق</span>
              <span className="text-slate-400 text-sm">📅 {result.message_date}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-emerald-400">📄 {result.file_name}</h3>
              <p className="text-slate-300 text-sm">💬 <span className="text-slate-400">الرسالة:</span> "{result.message_text}"</p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl text-sm border border-slate-800/80">
              <div>
                <span className="text-slate-500 block">👤 أرسل بواسطة:</span>
                <span className="font-semibold">{result.sender} ({result.channel})</span>
              </div>
              <div>
                <span className="text-slate-500 block">💰 المبلغ المذكور:</span>
                <span className="font-semibold text-amber-400">{result.amount}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block">📅 الاجتماع المرتبط:</span>
                <span className="font-semibold text-indigo-300">{result.related_meeting}</span>
              </div>
            </div>
          </div>
        )}
        {searched && !result && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center text-slate-400">
            لم نجد موقفاً يطابق هذا السياق في الذاكرة الوهمية، جربي كتابة جملة تحتوي على "نورة" أو "عرض سعر".
          </div>
        )}
      </div>
    </main>
  );
}