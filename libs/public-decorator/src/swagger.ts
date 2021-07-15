import {
  ApiProperty as ApiPropertySource,
  ApiOperation as ApiOperationSource,
  ApiPropertyOptions,
  ApiOperationOptions,
} from '@nestjs/swagger';
import { getKeys, getEnumRemark } from '@app/public-tool';

/**
 * swagger 标注
 */
export const ApiProperty = (description: string, options?: ApiPropertyOptions) => {
  return ApiPropertySource({ description, ...options });
};

/**
 * swagger 枚举标注
 */
export const ApiPropertyEnum = (description: string, object: object, options?: ApiPropertyOptions) => {
  return ApiPropertySource({
    enum: getKeys(object),
    description: `${description}，${getEnumRemark(object)}`,
    ...options,
  });
};

/**
 * swagger 数组标注
 */
export const ApiPropertyArray = (description: string, object: object, options?: ApiPropertyOptions) => {
  return ApiPropertySource({
    description: `${description}，${getEnumRemark(object)}`,
    type: [String],
    ...options,
  });
};

/**
 * swagger 路由标注
 */
export const ApiOperation = (summary: string, options?: ApiOperationOptions) => {
  return ApiOperationSource({ summary, ...options });
};
