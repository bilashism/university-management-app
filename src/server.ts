import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { infoLogger } from './shared/logger';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    infoLogger.info(`🛢 Database is connected successfully`);

    const server = app.listen(config.port, () => {
      const host = server.address();
      const protocol = 'http';
      let address = '';
      if (host && typeof host !== 'string') {
        address = host.address === '::' ? 'localhost' : host.address;
      }

      infoLogger.info(
        `🌐 Server is running at: ${protocol}://${address}:${config.port}`
      );
    });
  } catch (err) {
    infoLogger.info('Failed to connect to the database', err);
  }
}

bootstrap();
