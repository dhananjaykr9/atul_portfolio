'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  clearAdminSession,
  isAdminConfigured,
  requireAdmin,
  signInWithSupabase,
} from '@/lib/admin-auth';

function getString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value.length > 0 ? value : null;
}

function getNumber(formData: FormData, key: string, fallback = 0) {
  const value = Number(getString(formData, key));
  return Number.isFinite(value) ? value : fallback;
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === 'on';
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function buildFallbackSlug(title: string) {
  const slug = slugify(title);
  return slug || `post-${Date.now()}`;
}

function revalidatePublicSite() {
  revalidatePath('/');
  revalidatePath('/research');
  revalidatePath('/blog');
  revalidatePath('/students');
}

const featuredResearchPublications = [
  {
    title: "The Role of Autobiography in Dalit Literature: A Study of Bama's Karukku and Meena Kandasamy's When I Hit You",
    journal: 'Research Directions International Peer Reviewed Journal',
    year: '2024',
    type: 'Journal Article',
    link: 'https://www.researchdirections.org/Management/pdfreadpage.php?filename=article1350.pdf',
    abstract:
      "A comparative study of Bama's Karukku and Meena Kandasamy's When I Hit You, examining how Dalit women's autobiographical narratives critique caste and gender oppression in contemporary India.",
  },
  {
    title: 'Artificial Intelligence and Communication: Bridging the Gap Between Human and Machine Dialogue',
    journal: 'Nanotechnology Perceptions',
    year: '2024',
    type: 'Journal Article',
    link: 'https://www.researchgate.net/publication/386496606_Artificial_Intelligence_and_Communication_Bridging_the_Gap_Between_Human_and_Machine_Dialogue',
    abstract:
      'An exploration of AI-driven communication systems, focusing on natural language processing, machine learning, and conversational agents to evaluate how they improve human-machine dialogue.',
  },
  {
    title:
      "Feministic Rebellious Streaks in Meena Kandasamy's Novels When I Hit You: Or, A Portrait of the Writer as a Young Wife and The Gypsy Goddess",
    journal: 'Research Paper',
    year: '2022',
    type: 'Journal Article',
    link: null,
    abstract:
      "A critical study of feminist themes in Meena Kandasamy's novels, with emphasis on patriarchy, technology-fuelled injustice, and the evolving constraints placed on women's autonomy.",
  },
] as const;

export async function loginAction(formData: FormData) {
  const email = getString(formData, 'email');
  const password = getString(formData, 'password');

  if (!isAdminConfigured()) {
    redirect('/admin/login?error=not-configured');
  }

  const result = await signInWithSupabase(email, password);

  if (!result.ok) {
    redirect(`/admin/login?error=${result.reason}`);
  }

  redirect('/admin');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

export async function createPublicationAction(formData: FormData) {
  await requireAdmin();

  await prisma.publication.create({
    data: {
      title: getString(formData, 'title'),
      journal: getString(formData, 'journal'),
      year: getString(formData, 'year'),
      type: getString(formData, 'type') || 'Journal Article',
      link: getOptionalString(formData, 'link'),
      abstract: getOptionalString(formData, 'abstract'),
    },
  });

  revalidatePublicSite();
  revalidatePath('/admin/research');
}

export async function importFeaturedResearchAction() {
  await requireAdmin();

  for (const publication of featuredResearchPublications) {
    const existing = await prisma.publication.findFirst({
      where: {
        title: publication.title,
      },
    });

    if (!existing) {
      await prisma.publication.create({
        data: publication,
      });
    }
  }

  revalidatePublicSite();
  revalidatePath('/admin/research');
}

export async function deletePublicationAction(formData: FormData) {
  await requireAdmin();

  await prisma.publication.delete({
    where: {
      id: getString(formData, 'id'),
    },
  });

  revalidatePublicSite();
  revalidatePath('/admin/research');
}

export async function updatePublicationAction(formData: FormData) {
  await requireAdmin();

  await prisma.publication.update({
    where: {
      id: getString(formData, 'id'),
    },
    data: {
      title: getString(formData, 'title'),
      journal: getString(formData, 'journal'),
      year: getString(formData, 'year'),
      type: getString(formData, 'type') || 'Journal Article',
      link: getOptionalString(formData, 'link'),
      abstract: getOptionalString(formData, 'abstract'),
    },
  });

  revalidatePublicSite();
  revalidatePath('/admin/research');
}

export async function createScholarAction(formData: FormData) {
  await requireAdmin();

  await prisma.scholar.create({
    data: {
      name: getString(formData, 'name'),
      topic: getString(formData, 'topic'),
      status: getString(formData, 'status') || 'Ongoing',
      year: getString(formData, 'year'),
    },
  });

  revalidatePath('/research');
  revalidatePath('/admin/research');
}

export async function deleteScholarAction(formData: FormData) {
  await requireAdmin();

  await prisma.scholar.delete({
    where: {
      id: getString(formData, 'id'),
    },
  });

  revalidatePath('/research');
  revalidatePath('/admin/research');
}

export async function updateScholarAction(formData: FormData) {
  await requireAdmin();

  await prisma.scholar.update({
    where: {
      id: getString(formData, 'id'),
    },
    data: {
      name: getString(formData, 'name'),
      topic: getString(formData, 'topic'),
      status: getString(formData, 'status') || 'Ongoing',
      year: getString(formData, 'year'),
    },
  });

  revalidatePath('/research');
  revalidatePath('/admin/research');
}

export async function createConferenceAction(formData: FormData) {
  await requireAdmin();

  await prisma.conference.create({
    data: {
      title: getString(formData, 'title'),
      event: getString(formData, 'event'),
      location: getString(formData, 'location'),
      year: getString(formData, 'year'),
    },
  });

  revalidatePath('/research');
  revalidatePath('/admin/research');
}

export async function deleteConferenceAction(formData: FormData) {
  await requireAdmin();

  await prisma.conference.delete({
    where: {
      id: getString(formData, 'id'),
    },
  });

  revalidatePath('/research');
  revalidatePath('/admin/research');
}

export async function updateConferenceAction(formData: FormData) {
  await requireAdmin();

  await prisma.conference.update({
    where: {
      id: getString(formData, 'id'),
    },
    data: {
      title: getString(formData, 'title'),
      event: getString(formData, 'event'),
      location: getString(formData, 'location'),
      year: getString(formData, 'year'),
    },
  });

  revalidatePath('/research');
  revalidatePath('/admin/research');
}

export async function createBlogPostAction(formData: FormData) {
  await requireAdmin();

  const title = getString(formData, 'title');
  const requestedSlug = getString(formData, 'slug');
  const slug = requestedSlug || buildFallbackSlug(title);

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      excerpt: getString(formData, 'excerpt'),
      content: getString(formData, 'content'),
      category: getString(formData, 'category') || 'Theory',
      author: getString(formData, 'author') || 'Dr. Atul M. Gavaskar',
      readTime: getString(formData, 'readTime') || '5 min read',
      language: getString(formData, 'language') || 'English',
      published: getBoolean(formData, 'published'),
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}

export async function toggleBlogPostPublishedAction(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, 'id');
  const published = getString(formData, 'published') === 'true';

  await prisma.blogPost.update({
    where: { id },
    data: {
      published: !published,
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();

  await prisma.blogPost.delete({
    where: {
      id: getString(formData, 'id'),
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}

export async function createStudentCategoryAction(formData: FormData) {
  await requireAdmin();

  await prisma.studentCategory.create({
    data: {
      title: getString(formData, 'title'),
      description: getString(formData, 'description'),
      order: getNumber(formData, 'order'),
    },
  });

  revalidatePath('/students');
  revalidatePath('/admin/students');
}

export async function deleteStudentCategoryAction(formData: FormData) {
  await requireAdmin();

  await prisma.studentCategory.delete({
    where: {
      id: getString(formData, 'id'),
    },
  });

  revalidatePath('/students');
  revalidatePath('/admin/students');
}

export async function createStudentResourceAction(formData: FormData) {
  await requireAdmin();

  await prisma.studentResource.create({
    data: {
      title: getString(formData, 'title'),
      type: getString(formData, 'type'),
      size: getString(formData, 'size'),
      url: getString(formData, 'url'),
      categoryId: getString(formData, 'categoryId'),
    },
  });

  revalidatePath('/students');
  revalidatePath('/admin/students');
}

export async function deleteStudentResourceAction(formData: FormData) {
  await requireAdmin();

  await prisma.studentResource.delete({
    where: {
      id: getString(formData, 'id'),
    },
  });

  revalidatePath('/students');
  revalidatePath('/admin/students');
}

export async function createExtensionActivityAction(formData: FormData) {
  await requireAdmin();

  await prisma.extensionActivity.create({
    data: {
      title: getString(formData, 'title'),
      type: getString(formData, 'type'),
      location: getString(formData, 'location'),
      date: getString(formData, 'date'),
      description: getOptionalString(formData, 'description'),
      order: getNumber(formData, 'order'),
    },
  });

  revalidatePath('/students');
  revalidatePath('/admin/students');
}

export async function deleteExtensionActivityAction(formData: FormData) {
  await requireAdmin();

  await prisma.extensionActivity.delete({
    where: {
      id: getString(formData, 'id'),
    },
  });

  revalidatePath('/students');
  revalidatePath('/admin/students');
}
