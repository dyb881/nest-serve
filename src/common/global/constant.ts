import { serveConfig } from './config';

const { file } = serveConfig;

/**
 * 文件类型
 */
export const fileType = file.reduce((o, i) => ((o[i.key] = i.label), o), {});

/**
 * 文件储存类型
 */
export const fileStore = { local: '本地储存', oss: 'OSS' };

/**
 * 帐号类型
 */
export const accountType = { admin: '管理员', user: '用户' };

/**
 * 通用显示隐藏状态
 */
const hideShow = ['隐藏', '显示'];

/**
 * 数据状态
 */
export const dataStatus = {
  /**
   * 账号状态
   */
  account: ['未审核', '已审核', '冻结'],

  /**
   * 菜单分类状态
   */
  menu: hideShow,

  /**
   * 信息状态
   */
  info: hideShow,
};
