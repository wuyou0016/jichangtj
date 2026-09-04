// 数据可信度标签的展示文案——统一在这里维护，服务商卡片、Top3、详情页共用同一套。
// 标签只描述"资料是怎么来的"，是中性分类，不是评分，也不用来暗示风险或冲突。
export type DataConfidence = 'own-test' | 'cross-verified' | 'third-party-only' | 'incomplete';

export const DATA_CONFIDENCE_LABEL: Record<DataConfidence, string> = {
  'own-test': '已有本站实测',
  'cross-verified': '多来源资料参考',
  'third-party-only': '仅第三方资料',
  incomplete: '信息待补充',
};

// 用于标签的视觉分组：偏积极 / 中性。纯样式用途，不额外传递事实。
export const DATA_CONFIDENCE_TONE: Record<DataConfidence, 'positive' | 'neutral'> = {
  'own-test': 'positive',
  'cross-verified': 'positive',
  'third-party-only': 'neutral',
  incomplete: 'neutral',
};
