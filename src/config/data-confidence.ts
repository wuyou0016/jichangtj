// 数据可信度标签的展示文案——统一在这里维护，服务商卡片、Top3、详情页共用同一套。
// 标签只描述"资料是怎么来的"，不是评分，不能暗示没发生过的测试。
export type DataConfidence = 'own-test' | 'cross-verified' | 'third-party-only' | 'incomplete' | 'conflicting';

export const DATA_CONFIDENCE_LABEL: Record<DataConfidence, string> = {
  'own-test': '已有本站实测',
  'cross-verified': '多来源交叉核验',
  'third-party-only': '仅第三方资料',
  incomplete: '信息待补充',
  conflicting: '信息存在冲突',
};

// 用于标签的视觉分组：偏积极 / 中性 / 需要留意。纯样式用途，不额外传递事实。
export const DATA_CONFIDENCE_TONE: Record<DataConfidence, 'positive' | 'neutral' | 'caution'> = {
  'own-test': 'positive',
  'cross-verified': 'positive',
  'third-party-only': 'neutral',
  incomplete: 'neutral',
  conflicting: 'caution',
};
