import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema';
import { asc, desc } from 'drizzle-orm';
import type { I18n } from '@/drizzle/schema';
import Link from 'next/link';
import { deleteProject, toggleProjectPublished } from '@/app/actions/projects';

const card: React.CSSProperties = {
  background: 'rgba(6,12,40,0.7)',
  border: '1px solid rgba(255,255,255,0.06)',
  backdropFilter: 'blur(16px)',
  borderRadius: 14,
  padding: 24,
};

export default async function ProjectsAdmin() {
  let allProjects: (typeof projects.$inferSelect)[] = [];
  try {
    allProjects = await db.select().from(projects).orderBy(asc(projects.order), desc(projects.createdAt));
  } catch { /* DB not yet available */ }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 800, margin: 0, marginBottom: 4 }}>پروژه‌ها</h1>
          <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>{allProjects.length} پروژه در پایگاه داده</p>
        </div>
        <Link href="/admin/projects/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '10px 20px', borderRadius: 10,
          background: '#00f3ff', color: '#020617',
          fontWeight: 700, fontSize: 13, textDecoration: 'none',
        }}>
          + پروژه جدید
        </Link>
      </div>

      {allProjects.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', padding: 48 }}>
          <p style={{ color: '#475569', fontSize: 14, marginBottom: 16 }}>هیچ پروژه‌ای ثبت نشده است.</p>
          <Link href="/admin/projects/new" style={{
            padding: '8px 20px', borderRadius: 8,
            background: 'rgba(0,243,255,0.1)', border: '1px solid rgba(0,243,255,0.2)',
            color: '#00f3ff', textDecoration: 'none', fontSize: 13, fontWeight: 600,
          }}>اولین پروژه را اضافه کنید</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {allProjects.map(p => {
            const title = (p.title as I18n)?.fa || (p.title as I18n)?.en || 'بدون عنوان';
            const desc  = (p.description as I18n)?.fa || (p.description as I18n)?.en || '';
            return (
              <div key={p.id} style={{
                ...card,
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 20px',
              }}>
                {/* Order badge */}
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(0,243,255,0.08)', border: '1px solid rgba(0,243,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#00f3ff', fontWeight: 700, fontSize: 12, fontFamily: 'monospace',
                }}>{p.order}</div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{title}</span>
                    {p.featured && (
                      <span style={{ fontSize: 10, color: '#9d00ff', background: 'rgba(157,0,255,0.1)', border: '1px solid rgba(157,0,255,0.2)', borderRadius: 4, padding: '1px 6px' }}>
                        ویژه
                      </span>
                    )}
                    {p.category && (
                      <span style={{ fontSize: 10, color: '#64748b', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, padding: '1px 6px' }}>
                        {p.category}
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#475569', fontSize: 12, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 400 }}>
                    {desc}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {(p.tags as string[]).slice(0, 3).map(tag => (
                    <span key={tag} style={{ fontSize: 10, color: '#64748b', background: 'rgba(255,255,255,0.04)', borderRadius: 4, padding: '2px 6px' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Status toggle */}
                <form action={toggleProjectPublished.bind(null, p.id, p.published)}>
                  <button type="submit" style={{
                    padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    background: p.published ? 'rgba(0,243,255,0.1)' : 'rgba(255,255,255,0.04)',
                    color: p.published ? '#00f3ff' : '#64748b',
                    border: `1px solid ${p.published ? 'rgba(0,243,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  }}>
                    {p.published ? 'منتشر' : 'پیش‌نویس'}
                  </button>
                </form>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <Link href={`/admin/projects/${p.id}/edit`} style={{
                    padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                    background: 'rgba(157,0,255,0.1)', border: '1px solid rgba(157,0,255,0.2)',
                    color: '#9d00ff', textDecoration: 'none',
                  }}>ویرایش</Link>
                  <form action={deleteProject.bind(null, p.id)}>
                    <button
                      type="submit"
                      onClick={e => { if (!confirm(`پروژه "${title}" حذف شود؟`)) e.preventDefault(); }}
                      style={{
                        padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                        background: 'rgba(255,59,59,0.08)', border: '1px solid rgba(255,59,59,0.15)',
                        color: '#f87171', cursor: 'pointer',
                      }}
                    >حذف</button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
