import { db } from '@/drizzle/db';
import { skills } from '@/drizzle/schema';
import { asc } from 'drizzle-orm';
import { createSkill, deleteSkill } from '@/app/actions/skills';

const card: React.CSSProperties = {
  background: 'rgba(6,12,40,0.7)', border: '1px solid rgba(255,255,255,0.06)',
  backdropFilter: 'blur(16px)', borderRadius: 14, padding: 24,
};
const inputStyle: React.CSSProperties = {
  padding: '9px 12px', borderRadius: 8,
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  color: '#e2e8f0', fontSize: 13, outline: 'none',
};

export default async function SkillsPage() {
  let allSkills: (typeof skills.$inferSelect)[] = [];
  try {
    allSkills = await db.select().from(skills).orderBy(asc(skills.order));
  } catch { /* DB not yet available */ }

  const categories = [...new Set(allSkills.map(s => s.category))];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 800, margin: 0, marginBottom: 4 }}>مهارت‌ها</h1>
        <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>{allSkills.length} مهارت ثبت‌شده</p>
      </div>

      {/* Add skill form */}
      <div style={{ ...card, marginBottom: 24 }}>
        <h3 style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, marginTop: 0, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          افزودن مهارت جدید
        </h3>
        <form action={createSkill} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 140px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: 11, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>نام *</label>
            <input style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} name="name" placeholder="Next.js" required />
          </div>
          <div style={{ flex: '1 1 120px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: 11, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>دسته‌بندی *</label>
            <input style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} name="category" placeholder="Frontend" required />
          </div>
          <div style={{ flex: '0 0 100px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: 11, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>مهارت %</label>
            <input style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} name="proficiency" type="number" min={0} max={100} defaultValue={80} />
          </div>
          <div style={{ flex: '0 0 80px' }}>
            <label style={{ display: 'block', color: '#64748b', fontSize: 11, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>ترتیب</label>
            <input style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} name="order" type="number" defaultValue={allSkills.length} />
          </div>
          <button type="submit" style={{
            padding: '9px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: '#00f3ff', color: '#020617', fontWeight: 700, fontSize: 13,
          }}>+ افزودن</button>
        </form>
      </div>

      {/* Skills by category */}
      {categories.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', padding: 40 }}>
          <p style={{ color: '#475569', fontSize: 14 }}>مهارتی ثبت نشده. اولین مهارت را اضافه کنید.</p>
        </div>
      ) : (
        categories.map(cat => (
          <div key={cat} style={{ ...card, marginBottom: 16 }}>
            <h3 style={{ color: '#00f3ff', fontSize: 12, fontWeight: 700, marginTop: 0, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {cat}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {allSkills.filter(s => s.category === cat).map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ flex: 1, color: '#e2e8f0', fontSize: 13 }}>{s.name}</span>
                  {/* Progress bar */}
                  <div style={{ width: 140, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.proficiency}%`, background: 'linear-gradient(90deg,#00f3ff,#9d00ff)', borderRadius: 2 }} />
                  </div>
                  <span style={{ color: '#64748b', fontSize: 11, fontFamily: 'monospace', width: 32 }}>{s.proficiency}%</span>
                  <form action={deleteSkill.bind(null, s.id)}>
                    <button
                      type="submit"
                      onClick={e => { if (!confirm(`"${s.name}" حذف شود؟`)) e.preventDefault(); }}
                      style={{
                        padding: '3px 10px', borderRadius: 5, border: '1px solid rgba(255,59,59,0.15)',
                        background: 'rgba(255,59,59,0.06)', color: '#f87171', cursor: 'pointer', fontSize: 11,
                      }}
                    >حذف</button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
