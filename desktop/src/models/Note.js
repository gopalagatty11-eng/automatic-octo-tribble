/**
 * Note — Core data model for AURUM NOTE v2 Desktop
 */

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function createNote(input) {
  const now = Date.now();
  return {
    id: generateId(),
    title: input.title,
    content: input.content,
    excerpt: input.content.slice(0, 120) + (input.content.length > 120 ? '...' : ''),
    date: input.date || new Date().toLocaleString(),
    tags: input.tags || [],
    hasPhoto: input.hasPhoto || false,
    hasCalc: input.hasCalc || false,
    createdAt: now,
    updatedAt: now,
  };
}

export function formatNoteDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now.getTime() - ts;

  if (diff < 86400000) {
    const hours = d.getHours();
    const mins = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `Today, ${h}:${mins} ${ampm}`;
  }
  if (diff < 604800000) {
    return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Seed data for first launch
export const SEED_NOTES = [
  {
    id: 'seed_1', title: 'Q3 Strategy Review',
    content: 'Key metrics from the quarterly review — revenue up 12%, churn down to 2.1%, NPS holding at 72. Need to focus on enterprise segment for Q4.',
    excerpt: 'Key metrics from the quarterly review — revenue up 12%, churn down to 2.1%, NPS holding at 72.',
    date: 'Today, 9:41 AM', tags: ['Strategy'], hasPhoto: false, hasCalc: true,
    createdAt: Date.now() - 3600000, updatedAt: Date.now() - 3600000,
  },
  {
    id: 'seed_2', title: 'Client Onboarding Notes',
    content: 'Meridian Corp kickoff — they want the premium tier, 50-seat license, SSO integration timeline. Decision maker is VP of Engineering.',
    excerpt: 'Meridian Corp kickoff — they want the premium tier, 50-seat license, SSO integration timeline.',
    date: 'Yesterday', tags: ['Clients', 'Sales'], hasPhoto: true, hasCalc: false,
    createdAt: Date.now() - 86400000, updatedAt: Date.now() - 86400000,
  },
  {
    id: 'seed_3', title: 'Product Roadmap v4',
    content: 'Phase 2 priorities: dark mode, offline sync, collaboration features. Deprioritize widget system. Target release mid-October.',
    excerpt: 'Phase 2 priorities: dark mode, offline sync, collaboration features. Deprioritize widget system.',
    date: 'Aug 19', tags: ['Product'], hasPhoto: false, hasCalc: false,
    createdAt: Date.now() - 172800000, updatedAt: Date.now() - 172800000,
  },
  {
    id: 'seed_4', title: 'Investor Deck Notes',
    content: 'Series B prep — key talking points: TAM expansion, unit economics improvement, team scaling plan. ARR at $4.2M, growing 8% MoM.',
    excerpt: 'Series B prep — key talking points: TAM expansion, unit economics improvement, team scaling plan.',
    date: 'Aug 18', tags: ['Finance'], hasPhoto: false, hasCalc: true,
    createdAt: Date.now() - 259200000, updatedAt: Date.now() - 259200000,
  },
  {
    id: 'seed_5', title: 'Design System Audit',
    content: 'Current component library has 47 components, 12 are unused. Suggest consolidation and token migration. Gold accent colors need standardization.',
    excerpt: 'Current component library has 47 components, 12 are unused. Suggest consolidation and token migration.',
    date: 'Aug 16', tags: ['Design'], hasPhoto: false, hasCalc: false,
    createdAt: Date.now() - 432000000, updatedAt: Date.now() - 432000000,
  },
  {
    id: 'seed_6', title: 'Weekly Standup Summary',
    content: 'Backend migration on track. Frontend blocked on API changes. Mobile team starting beta testing next week. Deployment pipeline needs attention.',
    excerpt: 'Backend migration on track. Frontend blocked on API changes. Mobile team starting beta testing next week.',
    date: 'Aug 15', tags: ['Engineering'], hasPhoto: false, hasCalc: false,
    createdAt: Date.now() - 518400000, updatedAt: Date.now() - 518400000,
  },
  {
    id: 'seed_7', title: 'Competitive Analysis',
    content: 'Notion, Obsidian, and Craft as primary competitors. Our advantage: offline-first, speed, and the premium aesthetic. Need to benchmark load times.',
    excerpt: 'Notion, Obsidian, and Craft as primary competitors. Our advantage: offline-first, speed, and the premium aesthetic.',
    date: 'Aug 14', tags: ['Strategy'], hasPhoto: false, hasCalc: false,
    createdAt: Date.now() - 604800000, updatedAt: Date.now() - 604800000,
  },
];
