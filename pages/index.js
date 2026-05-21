import { useState } from "react";

const S_HOUR = 8, E_HOUR = 23, PPH = 58;
const TOTAL_H = E_HOUR - S_HOUR;

const DAYS = [
  { name:"ראשון", date:"25/5", tag:"" },
  { name:"שני",   date:"26/5", tag:"" },
  { name:"שלישי", date:"27/5", tag:"" },
  { name:"רביעי", date:"28/5", tag:"" },
  { name:"חמישי", date:"29/5", tag:"" },
  { name:"שישי",  date:"30/5", tag:"" },
];
const HOURS = Array.from({ length: TOTAL_H+1 }, (_,i) => S_HOUR+i);

const CAT = {
  blocked: { label:"מחויבות",   c:"#F43F5E", bg:"rgba(244,63,94,0.13)",   icon:"🔒" },
  workout: { label:"אימון",     c:"#10B981", bg:"rgba(16,185,129,0.13)",   icon:"🧘" },
  meal:    { label:"ארוחות",    c:"#D97706", bg:"rgba(217,119,6,0.11)",    icon:"🍽️" },
  admin:   { label:"אדמין",     c:"#2563EB", bg:"rgba(37,99,235,0.11)",    icon:"📧" },
  content: { label:"תוכן",     c:"#0891B2", bg:"rgba(8,145,178,0.11)",    icon:"📱" },
  edit:    { label:"עריכה",    c:"#6366F1", bg:"rgba(99,102,241,0.11)",   icon:"✂️" },
  study:   { label:"קורס קארין",c:"#65A30D", bg:"rgba(101,163,13,0.13)",   icon:"📚" },
  client:  { label:"לקוח",     c:"#7C3AED", bg:"rgba(124,58,237,0.12)",   icon:"💼" },
  psos:    { label:"PSOS",     c:"#EC4899", bg:"rgba(236,72,153,0.11)",   icon:"🩺" },
  personal:{ label:"אישי",     c:"#F59E0B", bg:"rgba(245,158,11,0.11)",   icon:"🌸" },
  proposal:{ label:"הצעה דיגיטלית",c:"#0EA5E9",bg:"rgba(14,165,233,0.11)",icon:"💡" },
  nophone: { label:"ללא טלפון", c:"#64748B", bg:"rgba(100,116,139,0.09)",  icon:"📵" },
};

const RAW = [
  // ── ראשון 25/5 ──
  {id:101,day:0,s:"09:00",e:"10:00",t:"קורס קארין",    n:"לימוד עצמי",             type:"study"},
  {id:102,day:0,s:"10:00",e:"12:00",t:"הצעה דיגיטלית",n:"בניית ההצעה",            type:"proposal"},
  {id:103,day:0,s:"12:00",e:"12:45",t:"ארוחת צהריים",  n:"",                       type:"meal"},
  {id:104,day:0,s:"13:00",e:"14:30",t:"צילום תוכן",    n:"",                       type:"content"},
  {id:105,day:0,s:"15:00",e:"17:00",t:"עומר",          n:"פגישה אישית",            type:"personal"},
  {id:106,day:0,s:"17:00",e:"17:30",t:"PSOS",          n:"תרגילים גב תחתון",       type:"psos"},
  {id:107,day:0,s:"18:00",e:"19:30",t:"עריכת תוכן",   n:"",                       type:"edit"},
  {id:108,day:0,s:"22:00",e:"23:00",t:"ללא טלפון",     n:"",                       type:"nophone"},
  // ── שני 26/5 ──
  {id:201,day:1,s:"09:00",e:"10:00",t:"קורס קארין",    n:"לימוד עצמי",             type:"study"},
  {id:202,day:1,s:"10:00",e:"11:30",t:"הצעה דיגיטלית",n:"המשך בנייה",             type:"proposal"},
  {id:203,day:1,s:"11:30",e:"12:00",t:"אדמין",         n:"פולואו-אפ עלא באלי",    type:"admin"},
  {id:204,day:1,s:"12:00",e:"13:00",t:"קארין",         n:"פגישה",                  type:"client"},
  {id:205,day:1,s:"13:00",e:"14:00",t:"ארוחת צהריים",  n:"",                       type:"meal"},
  {id:206,day:1,s:"14:30",e:"15:30",t:"אושר",          n:"לקוח",                   type:"client"},
  {id:207,day:1,s:"16:00",e:"17:00",t:"עטרה",          n:"לקוח",                   type:"client"},
  {id:208,day:1,s:"17:00",e:"17:30",t:"PSOS",          n:"תרגילים גב תחתון",       type:"psos"},
  {id:209,day:1,s:"18:45",e:"19:45",t:"Vinyasa יוגה",  n:"מרים פרי · בת גלים",    type:"workout"},
  {id:210,day:1,s:"22:00",e:"23:00",t:"ללא טלפון",     n:"",                       type:"nophone"},
  // ── שלישי 27/5 ──
  {id:301,day:2,s:"08:00",e:"10:00",t:"חומרים ליודן",  n:"הכנת חומרים",           type:"study"},
  {id:302,day:2,s:"10:00",e:"11:00",t:"יודן",          n:"פגישה",                  type:"client"},
  {id:303,day:2,s:"11:00",e:"12:30",t:"קורס קארין",    n:"לימוד עצמי",             type:"study"},
  {id:304,day:2,s:"12:30",e:"13:15",t:"ארוחת צהריים",  n:"",                       type:"meal"},
  {id:305,day:2,s:"13:15",e:"15:30",t:"הצעה דיגיטלית",n:"",                       type:"proposal"},
  {id:306,day:2,s:"16:00",e:"18:30",t:"צילום תוכן",    n:"לפני שקיעה",             type:"content"},
  {id:307,day:2,s:"18:30",e:"19:00",t:"PSOS",          n:"תרגילים גב תחתון",       type:"psos"},
  {id:308,day:2,s:"19:00",e:"20:30",t:"עריכת תוכן",   n:"",                       type:"edit"},
  {id:309,day:2,s:"22:00",e:"23:00",t:"ללא טלפון",     n:"",                       type:"nophone"},
  // ── רביעי 28/5 ──
  {id:401,day:3,s:"09:00",e:"10:30",t:"קורס קארין",    n:"לימוד עצמי",             type:"study"},
  {id:402,day:3,s:"10:30",e:"12:30",t:"הצעה דיגיטלית",n:"",                       type:"proposal"},
  {id:403,day:3,s:"13:00",e:"15:30",t:"מפגש עצמאיות", n:"עצמאיות חיפאיות",        type:"personal"},
  {id:404,day:3,s:"16:00",e:"18:30",t:"צילום תוכן",    n:"לפני שקיעה",             type:"content"},
  {id:405,day:3,s:"18:30",e:"19:00",t:"PSOS",          n:"תרגילים גב תחתון",       type:"psos"},
  {id:406,day:3,s:"19:00",e:"20:00",t:"עריכת תוכן",   n:"",                       type:"edit"},
  {id:407,day:3,s:"22:00",e:"23:00",t:"ללא טלפון",     n:"",                       type:"nophone"},
  // ── חמישי 29/5 ──
  {id:501,day:4,s:"09:15",e:"10:15",t:"Vinyasa יוגה",  n:"כינרת אוחיון · בת גלים",type:"workout"},
  {id:502,day:4,s:"10:30",e:"12:00",t:"הצעה דיגיטלית",n:"סיום וליטוש",            type:"proposal"},
  {id:503,day:4,s:"12:00",e:"12:45",t:"ארוחת צהריים",  n:"",                       type:"meal"},
  {id:504,day:4,s:"13:00",e:"15:00",t:"עריכת תוכן",   n:"",                       type:"edit"},
  {id:505,day:4,s:"15:00",e:"16:00",t:"אדמין",         n:"מיילים והודעות",         type:"admin"},
  {id:506,day:4,s:"16:00",e:"18:30",t:"צילום תוכן",    n:"לפני שקיעה",             type:"content"},
  {id:507,day:4,s:"22:00",e:"23:00",t:"ללא טלפון",     n:"",                       type:"nophone"},
  // ── שישי 30/5 ──
  {id:601,day:5,s:"09:00",e:"10:30",t:"קורס קארין",    n:"לימוד עצמי",             type:"study"},
  {id:602,day:5,s:"10:30",e:"12:00",t:"עריכת תוכן",   n:"",                       type:"edit"},
  {id:603,day:5,s:"12:00",e:"14:00",t:"זמן חופשי",     n:"מנוחה ואישי",            type:"personal"},
];

function toY(t) {
  const [h, m] = t.split(":").map(Number);
  return (h + m / 60 - S_HOUR) * PPH;
}

function Block({ ev, onToggle }) {
  const cat = CAT[ev.type];
  const top = toY(ev.s);
  const height = Math.max(toY(ev.e) - top, 20);
  const tiny = height < 34, small = height < 54;
  return (
    <div onClick={() => onToggle(ev.id)}
      title={ev.t + (ev.n ? " · " + ev.n : "") + " | " + ev.s + "-" + ev.e}
      style={{ position:"absolute", top, left:2, right:2, height,
        background: ev.done ? "rgba(241,245,249,0.9)" : cat.bg,
        border: "1px solid " + (ev.done ? "#E2E8F0" : cat.c),
        borderRight: "3.5px solid " + (ev.done ? "#CBD5E1" : cat.c),
        borderRadius:7, padding: tiny ? "1px 4px" : "3px 6px",
        cursor:"pointer", overflow:"hidden", userSelect:"none", zIndex:1,
        opacity: ev.done ? 0.45 : 1 }}>
      <div style={{ fontSize: tiny?7.5:9, fontWeight:700, color: ev.done?"#94A3B8":cat.c,
        textDecoration: ev.done?"line-through":"none",
        whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", lineHeight:1.2 }}>
        {ev.done ? "✓ " : tiny ? "" : cat.icon + " "}{ev.t}
      </div>
      {!tiny && !small && ev.n && !ev.done && (
        <div style={{ fontSize:7.5, color:cat.c, opacity:0.7,
          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{ev.n}</div>
      )}
      {!tiny && (
        <div style={{ fontSize:7.5, color: ev.done?"#CBD5E1":cat.c, opacity:0.6 }}>{ev.s}-{ev.e}</div>
      )}
    </div>
  );
}

export default function Home() {
  const [events, setEvents] = useState(RAW.map(e => ({ ...e, done: false })));
  const [hidden, setHidden] = useState(new Set(["nophone"]));
  const [tab, setTab] = useState("cal");

  const toggle = id => setEvents(p => p.map(e => e.id === id ? { ...e, done: !e.done } : e));
  const toggleHide = k => setHidden(p => { const s = new Set(p); s.has(k) ? s.delete(k) : s.add(k); return s; });

  const wDone    = events.filter(e => e.type==="workout"  && e.done).length;
  const stDone   = events.filter(e => e.type==="study"    && e.done).length;
  const prDone   = events.filter(e => e.type==="proposal" && e.done).length;
  const visible  = events.filter(e => !hidden.has(e.type));
  const studyTotal    = events.filter(e => e.type==="study").length;
  const proposalTotal = events.filter(e => e.type==="proposal").length;

  return (
    <div style={{ direction:"rtl", fontFamily:"'Rubik',Tahoma,sans-serif",
      background:"#F7F6F3", minHeight:"100svh", paddingBottom:80 }}>
      <div style={{ background:"white", padding:"14px 16px 10px",
        boxShadow:"0 1px 8px rgba(0,0,0,0.07)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div>
            <div style={{ fontSize:9, letterSpacing:2, color:"#E8510A", fontWeight:700 }}>25-30 מאי 2026 🤰</div>
            <div style={{ fontSize:18, fontWeight:800, color:"#1E293B", marginTop:1 }}>תכנון שבועי</div>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {[{l:"📊",k:"cal"},{l:"📋",k:"list"},{l:"ℹ️",k:"info"}].map(({l,k}) => (
              <button key={k} onClick={() => setTab(k)} style={{ width:34, height:34, borderRadius:9,
                border:"none", background: tab===k ? "#E8510A" : "#F1F5F9", fontSize:15, cursor:"pointer" }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:5 }}>
          {[
            {label:"אימונים",        done:wDone,  total:2,             c:"#10B981"},
            {label:"קורס קארין",    done:stDone, total:studyTotal,    c:"#65A30D"},
            {label:"הצעה דיגיטלית", done:prDone, total:proposalTotal, c:"#0EA5E9"},
          ].map(({label,done,total,c}) => (
            <div key={label} style={{ flex:1, background:"#F8FAFC", borderRadius:10, padding:"6px 7px", textAlign:"center" }}>
              <div style={{ fontSize:8, color:"#94A3B8", marginBottom:1 }}>{label}</div>
              <div style={{ fontSize:13, fontWeight:700, color:c }}>
                {done}<span style={{ fontSize:9, color:"#CBD5E1" }}>/{total}</span>
              </div>
              <div style={{ height:3, background:"#E2E8F0", borderRadius:4, marginTop:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width: Math.min((done/total)*100,100)+"%",
                  background:c, borderRadius:4, transition:"width 0.4s" }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {tab==="cal" && (
        <div style={{ padding:"10px 8px 0" }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:8, justifyContent:"center" }}>
            {Object.entries(CAT).map(([k,cat]) => {
              const off = hidden.has(k);
              return (
                <button key={k} onClick={() => toggleHide(k)} style={{
                  border: "1.5px solid " + (off?"#E2E8F0":cat.c), background: off?"#F8FAFC":cat.bg,
                  color: off?"#94A3B8":cat.c, borderRadius:20, padding:"2px 8px",
                  fontSize:8.5, fontWeight:600, cursor:"pointer", opacity: off?0.5:1 }}>
                  {cat.icon} {cat.label}
                </button>
              );
            })}
          </div>
          <div style={{ background:"white", borderRadius:14, boxShadow:"0 2px 16px rgba(0,0,0,0.07)",
            overflow:"hidden", overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
            <div style={{ minWidth:500 }}>
              <div style={{ display:"flex", borderBottom:"1.5px solid #F1F5F9",
                position:"sticky", top:0, background:"white", zIndex:10 }}>
                <div style={{ width:34, flexShrink:0 }}/>
                {DAYS.map((d,i) => {
                  const hasW = events.some(e => e.day===i && e.type==="workout");
                  return (
                    <div key={i} style={{ flex:1, textAlign:"center", padding:"6px 2px",
                      borderRight: i<5?"1px solid #F1F5F9":"none",
                      background: hasW?"#FAFFF8":"white" }}>
                      <div style={{ fontSize:10, fontWeight:700, color:"#1E293B" }}>{d.name}</div>
                      <div style={{ fontSize:8, color:"#94A3B8" }}>{d.date}</div>
                      {d.tag && <div style={{ fontSize:7.5, color:"#F59E0B", fontWeight:600, marginTop:1 }}>{d.tag}</div>}
                    </div>
                  );
                })}
              </div>
              <div style={{ display:"flex" }}>
                <div style={{ width:34, flexShrink:0, position:"relative", height:TOTAL_H*PPH }}>
                  {HOURS.map(h => (
                    <div key={h} style={{ position:"absolute", top:(h-S_HOUR)*PPH-7,
                      width:"100%", textAlign:"center", fontSize:8, color:"#CBD5E1", fontWeight:500 }}>
                      {String(h).padStart(2,"0")}:00
                    </div>
                  ))}
                </div>
                {DAYS.map((_,di) => (
                  <div key={di} style={{ flex:1, position:"relative", height:TOTAL_H*PPH,
                    borderRight: di<5?"1px solid #F8FAFC":"none" }}>
                    {HOURS.map(h => (
                      <div key={h} style={{ position:"absolute", top:(h-S_HOUR)*PPH,
                        width:"100%", borderTop: h%2===0?"1px solid #F1F5F9":"1px dashed #F9FAFB" }}/>
                    ))}
                    {visible.filter(e => e.day===di).map(ev => (
                      <Block key={ev.id} ev={ev} onToggle={toggle}/>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p style={{ textAlign:"center", color:"#CBD5E1", fontSize:9, marginTop:6 }}>לחצי על אייטם לסימון ✓</p>
        </div>
      )}

      {tab==="list" && (
        <div style={{ padding:"12px 14px 0" }}>
          {DAYS.map((d,di) => {
            const dayEvs = events.filter(e => e.day===di).sort((a,b) => a.s.localeCompare(b.s));
            return (
              <div key={di} style={{ marginBottom:14 }}>
                <div style={{ fontWeight:700, fontSize:13, color:"#1E293B", marginBottom:5,
                  display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:28, height:28, borderRadius:8, background:"#E8510A",
                    color:"white", display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:11, fontWeight:800 }}>{d.date.split("/")[0]}</div>
                  {d.name} {d.tag && <span style={{ fontSize:10, color:"#F59E0B" }}>· {d.tag}</span>}
                </div>
                {dayEvs.map(ev => {
                  const cat = CAT[ev.type];
                  return (
                    <div key={ev.id} onClick={() => toggle(ev.id)} style={{
                      display:"flex", alignItems:"center", gap:10, background:"white",
                      borderRadius:10, padding:"9px 12px", marginBottom:4, cursor:"pointer",
                      borderRight: "3px solid " + (ev.done?"#CBD5E1":cat.c),
                      opacity: ev.done?0.5:1, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
                      <div style={{ fontSize:13 }}>{ev.done ? "✅" : cat.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:11, fontWeight:600, color: ev.done?"#94A3B8":"#1E293B",
                          textDecoration: ev.done?"line-through":"none" }}>{ev.t}</div>
                        {ev.n && <div style={{ fontSize:9, color:"#94A3B8", marginTop:1 }}>{ev.n}</div>}
                      </div>
                      <div style={{ fontSize:9, color:"#94A3B8", fontWeight:500 }}>{ev.s}-{ev.e}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {tab==="info" && (
        <div style={{ padding:"14px" }}>
          {[
            {e:"🧘", t:"2 אימונים בבת גלים",         d:"שני 18:45 Vinyasa מרים פרי · חמישי 09:15 Vinyasa כינרת אוחיון"},
            {e:"💼", t:"לקוחות השבוע",                d:"שני: קארין 12:00 · אושר 14:30 · עטרה 16:00 | שלישי: יודן 10:00"},
            {e:"🌸", t:"אישי",                        d:"ראשון 15:00 עומר · רביעי 13:00 מפגש עצמאיות חיפאיות"},
            {e:"💡", t:"הצעה דיגיטלית",               d:"ראשון עד חמישי - בניה הדרגתית"},
            {e:"📱", t:"תוכן + עריכה",                d:"צילום שלישי + רביעי + חמישי 16:00-18:30 לפני שקיעה"},
            {e:"🩺", t:"PSOS x3",                     d:"ראשון + שני + שלישי · 30 דקות כל פעם"},
            {e:"📚", t:"קורס קארין",                  d:"ראשון + שני + שלישי + רביעי + שישי"},
            {e:"📧", t:"אדמין",                       d:"שני בוקר: פולואו-אפ עלא באלי"},
          ].map(({e,t,d}) => (
            <div key={t} style={{ background:"white", borderRadius:13, padding:"13px 15px",
              marginBottom:9, boxShadow:"0 1px 6px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize:18, marginBottom:3 }}>{e}</div>
              <div style={{ fontWeight:700, fontSize:13, color:"#1E293B", marginBottom:2 }}>{t}</div>
              <div style={{ fontSize:11, color:"#64748B", lineHeight:1.5 }}>{d}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"white",
        borderTop:"1px solid #F1F5F9", display:"flex", padding:"8px 0 20px",
        boxShadow:"0 -4px 16px rgba(0,0,0,0.06)", zIndex:100 }}>
        {[{label:"לוח",icon:"📊",key:"cal"},{label:"רשימה",icon:"📋",key:"list"},{label:"סיכום",icon:"ℹ️",key:"info"}].map(({label,icon,key}) => (
          <button key={key} onClick={() => setTab(key)} style={{ flex:1, background:"none", border:"none",
            cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"4px 0" }}>
            <div style={{ fontSize:17 }}>{icon}</div>
            <div style={{ fontSize:9, fontWeight:600, color: tab===key?"#E8510A":"#94A3B8" }}>{label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
