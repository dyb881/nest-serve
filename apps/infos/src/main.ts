import { AppModule } from './app.module';
import { bootstrap } from '@app/public-tool';

// 启动服务
bootstrap(AppModule, { microservice: true });
