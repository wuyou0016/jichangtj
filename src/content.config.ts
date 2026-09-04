import { defineCollection, reference, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// ---------------------------------------------------------------------------
// providers（服务商真实资料 —— 官方信息 + 第三方资料，来源分组标注，不混淆）
// ---------------------------------------------------------------------------

const thirdPartyNoteSchema = z.object({
  source: z.string(),
  sourceUrl: z.url().optional(),
  claim: z.string(),
  date: z.coerce.date(),
});

// 数据可信度标签：只描述"这份资料是怎么来的"，是中性分类，不是评分。
// - own-test：本站有真实测试数据（不管测的是丢包率还是完整测速）
// - cross-verified：没有本站实测，但 2 个以上独立第三方来源可以互相参照
// - third-party-only：只有单一或未互相印证的第三方资料
// - incomplete：资料明显不足（比如只有一个来源、刚收录）
const dataConfidenceEnum = z.enum(['own-test', 'cross-verified', 'third-party-only', 'incomplete']);

const providerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  aliases: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'discontinued', 'watch']),
  dataConfidence: dataConfidenceEnum,
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
  // 这个场景里最容易踩的坑，不是泛泛的"要小心"，要具体到会导致什么误判。
  commonMistakes: z.array(z.string()).optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const scenarios = defineCollection({
  loader: file('src/data/scenarios/scenarios.json'),
  schema: scenarioSchema,
});

// ---------------------------------------------------------------------------
// rankings（综合推荐顺序，reason 逐条公开）
// ---------------------------------------------------------------------------

const rankingEntrySchema = z.object({
  providerId: reference('providers'),
  reason: z.string(),
  // 一项最关键的依据——独立于长版 reason，专门给首页 Top 3 卡片用的
  // 一句话摘要，不是重新编一个理由，是从 reason 里提炼出的核心事实。
  keyFact: z.string().optional(),
  // 只有确实存在需要留意的情况才填，不是每条都要有。
  caution: z.string().optional(),
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

// ---------------------------------------------------------------------------
// tutorials（使用教程：新手先读 / 客户端入门 / 常见问题 / 进阶理解）
// ---------------------------------------------------------------------------

const tutorialSchema = z.object({
  title: z.string(),
  description: z.string(),
  // 分组决定在 /tutorials/ 聚合页里出现在哪个区块，不是难度评分。
  group: z.enum(['basics', 'clients', 'troubleshooting', 'advanced']),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  // 关联场景 slug，用于场景页反向链接到相关教程。
  relatedScenarios: z.array(z.string()).optional(),
});

const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/tutorials' }),
  schema: tutorialSchema,
});

export const collections = { providers, scenarios, rankings, tutorials };
