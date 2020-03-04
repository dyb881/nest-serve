import { Entity, Column } from 'typeorm';
import { CommonEntity, columnOptions } from '../../common';
import filesize from 'filesize';

const { createEnum } = columnOptions;

/**
 * 文件类型
 */
export const fileType = { image: '图片', video: '视频', audio: '音频', other: '其他' };

/**
 * 文件了类型对应的后缀名
 */
export const fileTypeSuffix = {
  image: ['jpg', 'png', 'git', 'webp', 'ico'],
  audio: ['mp3', 'wav'],
  video: ['mp4', 'webm'],
  other: [],
};

const typeOptions = createEnum('文件类型', fileType);
export const { enum: typeEnum, comment: typeComment } = typeOptions;

/**
 * 文件
 */
@Entity()
export class Files extends CommonEntity {
  @Column({ comment: '文件名', type: 'text' })
  name: string;

  @Column({ comment: '文件地址', type: 'text' })
  url: string;

  @Column('enum', typeOptions)
  type: number;

  @Column({ comment: '文件大小', transformer: { to: filesize, from: value => value } })
  size: string;

  @Column({ comment: '上传帐号', length: 32 })
  username: string;
}
