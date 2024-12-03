import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, Matches, IsInt, IsNotEmpty, IsDate, IsOptional } from 'class-validator';
import { getKeys, getEnumRemark } from './data';

export type DtoParamOptions = ApiPropertyOptions & {
  isInt?: boolean; // 自动转换并限制为数字类型
  isDate?: boolean; // 自动转换并限制为时间类型
  matches?: [RegExp, string]; // 【正则匹配，提示文案】
};

/**
 * 数据传输对象参数装饰器
 */
export const DtoParam = (name: string, _options?: DtoParamOptions) => {
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [];

  let { isInt, isDate, matches, required = true, enum: _enum, ...options } = _options || {};

  Object.assign(options, { required });
  if (required) {
    // 必填校验
    decorators.push(IsNotEmpty({ message: `请输入${name}` }));
  } else {
    // 非必填的参数，空值的时候跳过验证
    decorators.push(
      Transform(({ value }) => (value === '' ? undefined : value)), // 空字符串转为 undefined
      IsOptional(), // null 和 undefined 的时候跳过所有验证
    );
  }

  // 数字校验
  if (isInt) {
    decorators.push(
      Type(() => Number), // 转为数字
      IsInt({ message: `${name}只能为数字` }), // 校验只能为数字
    );
  }

  // 时间类型校验
  if (isDate) {
    decorators.push(
      Type(() => Date), // 转为时间对象
      IsDate({ message: `${name}只能为时间类型` }), // 校验只能为时间类型
    );
  }

  // 正则验证
  if (matches) {
    const [pattern, message] = matches;
    decorators.push(Matches(pattern, { message })); // 正则匹配
  }

  // 枚举类型限制
  if (_enum) {
    decorators.push(IsIn(getKeys(_enum), { message: `请选择正确的${name}，${getEnumRemark(_enum)}` })); // 校验只能在范围内的值
    Object.assign(options, { enum: getKeys(_enum) }); // 追加文档枚举设置
    name += `，${getEnumRemark(_enum)}`; // 追加文档描述
  }

  decorators.push(ApiProperty({ description: name, ...options })); // 文档

  return applyDecorators(...decorators);
};
