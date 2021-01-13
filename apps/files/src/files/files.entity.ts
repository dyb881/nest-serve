import { Entity } from 'typeorm';
import { Column, ColumnEnum, ApiProperty, ApiPropertyEnum } from '@app/decorator';
import { CommonEntity } from '@app/entity-tool';
import fs from 'fs';

/**
 * 实时读取配置文件
 */
const data = fs.readFileSync('config/files.config.json');
export const filesConfig = JSON.parse(data.toString()).map((i) => {
  i.maxSize = i.maxSizeMB * 1048576;
  return i;
});

/**
 * 文件类型
 */
export const fileType = filesConfig.reduce((o, i) => ((o[i.type] = i.name), o), {});

/**
 * 文件储存
 */
export const fileStore = { network: '网络图片', server: '服务器', oss: 'OSS' };

@Entity()
export class Files extends CommonEntity {
  @ApiProperty('文件名')
  @Column('文件名')
  name: string;

  @ApiProperty('文件地址')
  @Column('文件地址')
  url: string;

  @ApiPropertyEnum('文件类型', fileType)
  @ColumnEnum('文件类型', fileType)
  type: string;

  @ApiPropertyEnum('储存', fileStore)
  @ColumnEnum('储存', fileStore)
  store: string;

  @ApiProperty('文件大小')
  @Column('文件大小')
  size: number;
}
