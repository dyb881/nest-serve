import { Entity } from 'typeorm';
import { CommonEntity, Column, ColumnEnum, fileType, createTransformer } from '../../common';
import filesize from 'filesize';

/**
 * 文件
 */
@Entity()
export class UploadFile extends CommonEntity {
  @Column('文件名')
  name: string;

  @Column('文件地址')
  url: string;

  @ColumnEnum('文件类型', fileType)
  type: number;

  @Column('文件大小', { transformer: createTransformer({ to: filesize }) })
  size: string;

  @Column('上传帐号', 32)
  username: string;
}
