import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: [join(__dirname, '../auth.proto'),join(__dirname, '../hello.proto')],
        package: [AUTH_PACKAGE_NAME],
        url: 'auth:3001'
      },
    },
  );
  await app.listen();
}
bootstrap();
