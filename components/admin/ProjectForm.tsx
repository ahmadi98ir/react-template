'use client';

import { useActionState } from 'react';
import type { I18n } from '@/drizzle/schema';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: 8,
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: 6, color: '#64748b', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
};
const sectionStyle: React.CSSProperties = {
  background: 'rgba(6,12,40,0.7)', border: '1px solid rgba(255,255,255,0.06)',
  backdropFilter: 'blur(16px)', borderRadius: 14, padding: 24, marginBottom: 16,
};

interface Props {
  action: (fd: FormData) => Promise<void>;
  initialData?: {
    id?: string;
    slug?: string;
    title?: I18n;
    description?: I18n;
    category?: string;
    tags?: string[];
    projectUrl?: string | null;
    githubUrl?: string | null;
    coverImageUrl?: string | null;
    featured?: boolean;
    published?: boolean;
    order?: number;
  };
  submitLabel?: string;
}

export default function ProjectForm({ action, initialData = {}, submitLabel = 'ذخیره' }: Props) {
  const [, formAction, pending] = useActionState(async (_: unknown, fd: FormData) => {
    await action(fd);
  }, null);

  return (
    <form action={formAction} style={{ maxWidth: 760 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Persian title */}
        <div style={sectionStyle}>
          <label style={labelStyle}>عنوان (فارسی) *</label>
          <input style={inputStyle} name="title_fa" required defaultValue={initialData.title?.fa || ''} placeholder="عنوان پروژه به فارسی" />
        </div>
        {/* English title */}
        <div style={sectionStyle}>
          <label style={labelStyle}>Title (English)</label>
          <input style={inputStyle} name="title_en" defaultValue={initialData.title?.en || ''} placeholder="Project title in English" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={sectionStyle}>
          <label style={labelStyle}>توضیحات (فارسی)</label>
          <textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} name="desc_fa" defaultValue={initialData.description?.fa || ''} placeholder="توضیح کوتاه پروژه" />
        </div>
        <div style={sectionStyle}>
          <label style={labelStyle}>Description (English)</label>
          <textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} name="desc_en" defaultValue={initialData.description?.en || ''} placeholder="Short project description" />
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Slug *</label>
            <input style={inputStyle} name="slug" required defaultValue={initialData.slug || ''} placeholder="my-project-slug" />
          </div>
          <div>
            <label style={labelStyle}>دسته‌بندی</label>
            <input style={inputStyle} name="category" defaultValue={initialData.category || ''} placeholder="E-commerce, AI, DevOps…" />
          </div>
          <div>
            <label style={labelStyle}>ترتیب نمایش</label>
            <input style={inputStyle} name="order" type="number" defaultValue={initialData.order ?? 0} min={0} />
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>تگ‌ها (با کاما جدا کنید)</label>
        <input style={inputStyle} name="tags" defaultValue={(initialData.tags || []).join(', ')} placeholder="Next.js, PostgreSQL, Tailwind…" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={sectionStyle}>
          <label style={labelStyle}>لینک پروژه</label>
          <input style={inputStyle} name="project_url" type="url" defaultValue={initialData.projectUrl || ''} placeholder="https://example.com" />
        </div>
        <div style={sectionStyle}>
          <label style={labelStyle}>لینک گیت‌هاب</label>
          <input style={inputStyle} name="github_url" type="url" defaultValue={initialData.githubUrl || ''} placeholder="https://github.com/..." />
        </div>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>URL تصویر کاور</label>
        <input style={inputStyle} name="cover_image_url" type="url" defaultValue={initialData.coverImageUrl || ''} placeholder="https://..." />
      </div>

      <div style={{ ...sectionStyle, display: 'flex', gap: 24, alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#94a3b8', fontSize: 13 }}>
          <input type="checkbox" name="published" defaultChecked={initialData.published ?? true} style={{ accentColor: '#00f3ff', width: 16, height: 16 }} />
          منتشر شده
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#94a3b8', fontSize: 13 }}>
          <input type="checkbox" name="featured" defaultChecked={initialData.featured ?? false} style={{ accentColor: '#9d00ff', width: 16, height: 16 }} />
          ویژه (Featured)
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: '11px 28px', borderRadius: 10,
            background: pending ? 'rgba(0,243,255,0.4)' : '#00f3ff',
            color: '#020617', fontWeight: 700, fontSize: 14,
            border: 'none', cursor: pending ? 'not-allowed' : 'pointer',
          }}
        >
          {pending ? 'در حال ذخیره…' : submitLabel}
        </button>
        <a href="/admin/projects" style={{
          padding: '11px 20px', borderRadius: 10,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          color: '#64748b', fontSize: 14, textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center',
        }}>انصراف</a>
      </div>
    </form>
  );
}
