import {useMemo, useState} from "react";

export default function Calendar({events=[], highlight="#FF7A00"}) {
  const today = new Date();
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const monthLabel = view.toLocaleString(undefined,{month:"long", year:"numeric"});
  const monthStart = new Date(view.getFullYear(), view.getMonth(), 1);
  const monthEnd   = new Date(view.getFullYear(), view.getMonth()+1, 0);

  const cells = useMemo(() => {
    const lead = (monthStart.getDay()+6)%7;
    const arr = Array.from({length: lead}, () => ({muted:true}));
    for(let d=1; d<=monthEnd.getDate(); d++) arr.push({day:d});
    const tail = (7 - (arr.length % 7)) % 7;
    for(let i=0;i<tail;i++) arr.push({muted:true});
    return arr;
  }, [view]);

  const byDate = new Map(events.map(e=>[e.date,e]));

  return (
    <div className="mini-cal__wrap">
      <div className="mini-cal__header">
        <span>{monthLabel}</span>
      </div>
      <div className="mini-cal__dow">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=><span key={d}>{d}</span>)}
      </div>
      <div className="mini-cal__grid">
        {cells.map((c,i)=>{
          if (c.muted) return <div key={i} className="mini-cal__cell mini-cal__cell--muted"/>;
          const y=view.getFullYear(), m=String(view.getMonth()+1).padStart(2,"0"), d=String(c.day).padStart(2,"0");
          const iso=`${y}-${m}-${d}`;
          const ev=byDate.get(iso);
          return (
            <div key={i} className={`mini-cal__cell ${ev?"mini-cal__cell--event":""}`} style={ev?{"--event-orange": ev.color||highlight}:undefined} title={ev?.title||""}>
              <div className="mini-cal__day">{c.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
