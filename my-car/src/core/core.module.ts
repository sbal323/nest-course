import { Module } from '@nestjs/common';
import { AppHasher } from './app-hasher';
import { AppLogger } from './app-logger';

@Module({providers: [AppLogger, AppHasher],
  exports: [AppLogger, AppHasher]})
export class CoreModule {}
