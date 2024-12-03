import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleSource } from '@nestjs/config';
import { rootPath } from '../../tools';
import yaml from 'js-yaml';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';

/**
 * 配置模块
 */
@Module({
  imports: [
    ConfigModuleSource.forRoot({
      cache: true,
      isGlobal: true,
      load: [
        () => {
          const configPath = path.join(rootPath, 'config'); // 配置文件目录
          const envNames = ['development.yaml', 'production.yaml']; // 环境配置
          let configFileNames = fs.readdirSync(configPath); // 获取所有配置文件名
          configFileNames = configFileNames.filter((fileName) => !envNames.includes(fileName)); // 过滤环境配置
          configFileNames.push(`${process.env.NODE_ENV || 'development'}.yaml`); // 插入当前环境配置

          // 合并配置
          let config: any = {};

          configFileNames.forEach((fileName) => {
            try {
              const filePath = path.join(configPath, fileName); // 配置文件路径
              const exists = fs.existsSync(filePath); // 文件存在
              if (exists) {
                const currentConfigText = fs.readFileSync(filePath, 'utf8'); // 配置文本
                const currentConfig = yaml.load(currentConfigText); // 配置对象
                config = _.merge(config, currentConfig); // 深合并配置
              }
            } catch {}
          });

          // 递归处理配置值
          config = _.cloneDeepWith(config, (value) => {
            if (value === null) return ''; // null 转为 空字符串
          });

          return config;
        },
      ],
    }),
  ],
})
export class ConfigModule {}
