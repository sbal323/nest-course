import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {

  static readonly appName: string = "My Cars";

  constructor(context: string){
    if(context){
      super(AppLogger.appName + " - " + context);
    }
    else{
      super(AppLogger.appName);
    }
  }

  setContext(context: string): void{
    super.setContext(AppLogger.appName + " - " + context);
  }
}
