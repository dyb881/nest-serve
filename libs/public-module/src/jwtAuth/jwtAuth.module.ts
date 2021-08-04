import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategyOptions, LocalStrategy } from './local.strategy';
import { JwtStrategyOptions, JwtStrategy } from './jwt.strategy';

export interface JwtAuthModuleAsyncOptions extends LocalStrategyOptions, JwtStrategyOptions {}

/**
 * 鉴权模块
 */
@Module({})
export class JwtAuthModule {
  static forRoot({ token, pattern, picks }: JwtAuthModuleAsyncOptions): DynamicModule {
    return {
      module: JwtAuthModule,
      imports: [
        PassportModule,
        {
          ...JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
              const { secret, expiresIn } = configService.get('jwt');
              return { secret, signOptions: { expiresIn } };
            },
            inject: [ConfigService],
          }),
          global: true,
        },
      ],
      providers: [LocalStrategy({ token, pattern }), JwtStrategy({ picks })],
      exports: [],
    };
  }
}
