import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, TrendingUp, Lightbulb } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  PageHeader, Card, Badge, Callout,
} from "../components/ui.jsx";
import { aiAssistant, models, finishedStock, rolls, lines, fmtMoney, forecast, suggestedProduction } from "../data/mock.js";

const TOOLTIP = ({ active, payload, label }) =>
  active && payload?.length ? (
    <div className="card tight" style={{ padding: "8px 12px", fontSize: 12 }}>
      <strong>{label}</strong>
      {payload.map((p, i) => <div key={i} className="muted">{p.name}: {p.value.toLocaleString("en-US")}</div>)}
    </div>
  ) : null;

function answer(q, setTyping) {
  setTyping && setTyping(true);
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalAvailable = finishedStock.reduce((a, s) => a + s.available, 0);
      const value = 4200000;
      const blackFabric = rolls.filter((r) => r.color === "أسود").reduce((a, r) => a + r.remaining, 0);
      const bestLine = [...lines].sort((a, b) => b.efficiency - a.efficiency)[0];
      let text;
      if (q.includes("مبيع")) {
        text = `أفضل الموديلات مبيعًا هذا الشهر: تيشيرت أوفرسايز (1,280 قطعة)، بلوزة صيفية بياقة V (915 قطعة)، فستان سهرة بحمالات (634 قطعة)، جاكيت رجالي (210 قطع). الإجمالي يُشكّل 84% من مبيعات المصنع.`;
      } else if (q.includes("المخزون الحالي")) {
        text = `قيمة المخزون الحالي ≈ ${fmtMoney(value)}: ${(totalAvailable).toLocaleString("en-US")} قطعة متاحة، إضافة إلى ${finishedStock.reduce((a, s) => a + s.returnable, 0)} قطعة مرتجعات صالحة للبيع، و ${finishedStock.reduce((a, s) => a + s.inProduction, 0)} قطعة تحت الإنتاج.`;
      } else if (q.includes("الأسود المتوفرة")) {
        text = `كمية القماش الأسود المتوفرة في المخازن ≈ ${blackFabric} متر موزعة على رولات الشيفون. تنبيه: رول الدانتيل الأسود متبقٍّ منه 5 أمتار فقط — تم تضمين أمر الشراء PO-2452 لتعويضه.`;
      } else if (q.includes("خط إنتاج")) {
        text = `أكثر خط إنتاج كفاءة هو ${bestLine.id} (${bestLine.efficiency}%) بتخصص ${bestLine.focus} بانتاج يومي ${bestLine.outputToday} قطعة. الخط الأقل هو خط 4 (بسبب صيانة ماكينة MC-03).`;
      } else if (q.includes("الهالك")) {
        text = `نسبة الهالك الشهر الحالي 4.9% في القص (المستهدف ≤ 5%)، وأعلى هالك مسجل في فستان السهرة (7.4%) بسبب بقع من رول RL-8822 — يُنصح بمراجعة جودة دفعة القطن.`;
      } else if (q.includes("زيادة إنتاجها")) {
        text = `الموديلات التي يجب زيادة إنتاجها: بلوزة صيفية مقاس M (+20% نمو متوقع)، فستان سهرة أسود مقاس M (عجز متوقع خلال 3 أسابيع)، تيشيرت أوفرسايز أسود مقاس XL (+40% من تقرير المدارس).`;
      } else {
        text = "يمكنني الإجابة عن المبيعات، المخزون، القماش، الإنتاج، الهالك، والتكلفة. جرّب أحد الأسئلة المقترحة.";
      }
      setTyping && setTyping(false);
      resolve(text);
    }, 800);
  });
}

export default function Ai() {
  const [msgs, setMsgs] = useState([{ from: "bot", text: aiAssistant.greeting }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const ask = async (qtext) => {
    if (!qtext.trim()) return;
    setMsgs((m) => [...m, { from: "user", text: qtext }]);
    setInput("");
    const a = await answer(qtext, setTyping);
    setMsgs((m) => [...m, { from: "bot", text: a }]);
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageHeader
        title="المساعد الذكي للإدارة"
        subtitle="اطرح سؤالًا باللغة الطبيعية ويقوم النظام بتحليل بيانات المصنع لحظيًا"
      />

      <div className="grid cols-2" style={{ alignItems: "start" }}>
        <Card title="محادثة مع النظام" subtitle="الذكاء الاصطناعي — نموذج تجريبي متصل بالبيانات">
          <div className="chat">
            {msgs.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                {m.from === "bot" && <span className="flex" style={{ fontSize: 11, marginBottom: 4, gap: 4 }}><Sparkles size={12} color="var(--brand)" /> ثيتا AI</span>}
                {m.text}
              </div>
            ))}
            {typing && <div className="msg bot" style={{ color: "var(--text-3)" }}>جارٍ تحليل البيانات…</div>}
            <div ref={endRef} />
          </div>
          <div className="filter-bar" style={{ marginTop: 12 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask(input)}
              placeholder="اكتب سؤالك هنا..."
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={() => ask(input)}><Send size={14} /> أرسل</button>
          </div>
        </Card>

        <div style={{ display: "grid", gap: 14 }}>
          <Card title="الأسئلة المقترحة">
            <div className="stack">
              {aiAssistant.questions.map((q) => (
                <button key={q} className="btn btn-ghost" style={{ justifyContent: "flex-start", textAlign: "right" }} onClick={() => ask(q)}>
                  <Lightbulb size={14} color="var(--warn)" /> {q}
                </button>
              ))}
            </div>
          </Card>

          <Card title="توقع الطلب للربع القادم" subtitle="أوامر فعلية مقابل توقع AI">
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={forecast} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<TOOLTIP />} />
                <Bar dataKey="orders" name="أوامر" fill="#cbd5e1" radius={[5, 5, 0, 0]} />
                <Bar dataKey="forecast" name="توقع AI" fill="#0e7a62" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Callout type="info" title="ماذا يستطيع أن يسأل المدير؟">
            «كم القماش الأسود المتوفر؟» · «ما نسبة الهالك؟» · «ما الخط الأكثر إنتاجية؟» · «ما الذي يجب زيادته؟»
          </Callout>
        </div>
      </div>
    </div>
  );
}