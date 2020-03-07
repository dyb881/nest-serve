/**
 * 密钥
 */
export const jwtConstants = { secret: 'nestservedyb881' };

/**
 * 文件类型
 */
export const fileType = { image: '图片', video: '视频', audio: '音频', other: '其他' };

/**
 * 文件类型数组
 */
export const fileTypeList = Object.keys(fileType);

/**
 * 文件类型对应的后缀名
 */
export const fileTypeSuffix = {
  image: ['jpg', 'png', 'git', 'webp', 'ico'],
  audio: ['mp3', 'wav'],
  video: ['mp4', 'webm'],
  other: ['doc', 'md'],
};

// 1M
const size1M = 1024 * 1024;

/**
 * 文件类型对应的尺寸
 */
export const fileTypeSize = { image: size1M * 2, audio: size1M * 30, video: size1M * 100, other: size1M * 2 };

/**
 * 帐号类型
 */
export const accountType = { admin: '管理员', user: '用户' };

/**
 * 帐号类型数组
 */
export const accountTypeList = Object.keys(accountType);

/**
 * 帐号状态
 */
export const accountStatus = ['未审核', '已审核', '冻结'];

/**
 * 栏目分类状态
 */
export const menuStatus = ['隐藏', '显示', '置顶'];
