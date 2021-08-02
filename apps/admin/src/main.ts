import { AppModule } from './app.module';
import { bootstrap } from '@app/public-tool';
import helmet from 'helmet';

// 启动服务
bootstrap(AppModule, {
  cors: true,
  before: (app) => {
    app.use(helmet({ contentSecurityPolicy: false }));
  },
});
