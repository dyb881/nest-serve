import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BasedModule } from './based/based.module';

@Module({
  imports: [
    // 静态资源
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
      exclude: ['/api/:path*'],
    }),
    // 数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_db',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
      // logging: true,
    }),
    BasedModule,
  ],
})
export class AppModule {}

