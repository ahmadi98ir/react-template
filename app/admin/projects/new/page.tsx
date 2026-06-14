import { redirect } from 'next/navigation';
import { createProject } from '@/app/actions/projects';
import ProjectForm from '@/components/admin/ProjectForm';

async function handleCreate(fd: FormData) {
  'use server';
  await createProject(fd);
  redirect('/admin/projects');
}

export default function NewProjectPage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#e2e8f0', fontSize: 22, fontWeight: 800, margin: 0, marginBottom: 4 }}>پروژه جدید</h1>
        <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>پروژه‌ای جدید به پورتفولیو اضافه کنید.</p>
      </div>
      <ProjectForm action={handleCreate} submitLabel="ایجاد پروژه" />
    </div>
  );
}
