import mongoose from 'mongoose';
import config from './config/index';
import app from './app';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢 Database is connected successfully`);

    const server = app.listen(config.port, () => {
      const host = server.address();
      const protocol = 'http';
      let address = '';
      if (host && typeof host !== 'string') {
        address = host.address === '::' ? 'localhost' : host.address;
      }

      console.log(
        `🌐 Server is running at: ${protocol}://${address}:${config.port}`
      );
    });
  } catch (err) {
    console.error('Failed to connect to the database', err);
  }
}

bootstrap();
