import { join } from 'path';

/**
 * 根目录
 */
export const rootPath = join(__dirname, '../../../');

export * from './data';
export * from './typeorm';
export * from './http.exception.filter';
export * from './transform.interceptor';
