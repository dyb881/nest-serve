import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicModule } from './basic/basic.module';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    // 静态资源
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
      exclude: ['/api/:path*'], // 排除 api 开头的地址，无对应静态文件的地址指向 index.html
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
    BasicModule,
    AdminModule,
  ],
})
export class AppModule {}
