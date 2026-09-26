// Bing / Yandex / Seznam 共用的 IndexNow 协议 key。
// key 文件必须放在站点根目录且内容与文件名（去掉 .txt）一致：
//   public/<INDEXNOW_KEY>.txt   内容为 INDEXNOW_KEY 本身
// 提交脚本见 scripts/submit-indexnow.mjs。
// 如果需要更换 key：重新生成一个 32 位十六进制字符串，同时改这里和 public/ 下的文件名+内容。
export const INDEXNOW_KEY = 'a458a17a167fb6d5d912b457cbcdf676';
