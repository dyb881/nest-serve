import bootstrap from '@app/bootstrap';
import { AppModule } from './app.module';
import helmet from 'helmet';

bootstrap(AppModule, { cors: true }, (app) => {
  app.use(helmet({ contentSecurityPolicy: false }));
});
