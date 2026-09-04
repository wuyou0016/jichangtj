import { defineCollection, reference, z } from 'astro:content';
import { file } from 'astro/loaders';

// ---------------------------------------------------------------------------
// providers（服务商真实资料 —— 官方信息 + 第三方资料，来源分组标注，不混淆）
// ---------------------------------------------------------------------------

const thirdPartyNoteSchema = z.object({
  source: z.string(),
  sourceUrl: z.url().optional(),
  claim: z.string(),
  date: z.coerce.date(),
});

const providerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  aliases: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'discontinued', 'watch']),
  vendor: z.object({
    officialWebsite: z.url(),
    description: z.string(),
  }),
  thirdPartyNotes: z.array(thirdPartyNoteSchema).optional(),
  // 场景适配说明：只描述"适合/不适合什么场景"，不产出客观评分——
  // 评分需要可比较的结构化数据，本站目前没有，写了就是编。
  scenarioFit: z.object({
    goodFor: z.array(z.string()),
    notIdealFor: z.array(z.string()),
  }),
  lastVerified: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const providers = defineCollection({
  loader: file('src/data/providers/providers.json'),
  schema: providerSchema,
});

// ---------------------------------------------------------------------------
// scenarios（本站核心内容类型：按使用场景整理的选择建议）
// ---------------------------------------------------------------------------

const scenarioPickSchema = z.object({
  providerId: reference('providers'),
  reason: z.string(),
});

const scenarioSchema = z.object({
  slug: z.string(),
  title: z.string(),
  emoji: z.string(),
  description: z.string(),
  // 这个场景实际该关注哪些维度——不是泛泛的"稳定性好"，
  // 是具体到这个场景为什么重要（比如游戏场景关注延迟不是带宽）。
  whatMatters: z.array(
    z.object({
      point: z.string(),
      explanation: z.string(),
    }),
  ),
  picks: z.array(scenarioPickSchema),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const scenarios = defineCollection({
  loader: file('src/data/scenarios/scenarios.json'),
  schema: scenarioSchema,
});

// ---------------------------------------------------------------------------
// rankings（综合推荐顺序 —— 站长人工指定，不是客观计算，reason 逐条公开）
// ---------------------------------------------------------------------------

const rankingEntrySchema = z.object({
  providerId: reference('providers'),
  reason: z.string(),
});

const rankingSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  scoringVersion: z.string(),
  updatedAt: z.coerce.date(),
  entries: z.array(rankingEntrySchema),
});

const rankings = defineCollection({
  loader: file('src/data/rankings/rankings.json'),
  schema: rankingSchema,
});

export const collections = { providers, scenarios, rankings };
