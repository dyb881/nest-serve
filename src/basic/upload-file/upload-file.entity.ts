import { Entity } from 'typeorm';
import { CommonEntity, Column, ColumnEnum, fileType, createTransformer, ApiProperty, ApiPropertyEnum } from '../../common';
import filesize from 'filesize';

/**
 * 文件
 */
@Entity()
export class UploadFile extends CommonEntity {
  @ApiProperty('文件名')
  @Column('文件名')
  name: string;

  @ApiProperty('文件地址')
  @Column('文件地址')
  url: string;

  @ApiPropertyEnum('文件类型', fileType)
  @ColumnEnum('文件类型', fileType)
  type: number;

  @ApiProperty('文件大小')
  @Column('文件大小', { transformer: createTransformer({ to: filesize }) })
  size: string;

  @ApiProperty('上传帐号')
  @Column('上传帐号', 32)
  username: string;
}
