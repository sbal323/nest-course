import { Controller, Get } from "@nestjs/common";

@Controller("/api")
export class AppController{

  @Get()
  getRootRoute(){
    return "<h1>Hi from nest application!</h1>";
  }

  @Get("/info")
  getInfoRoute(){
    return "<h1>Information</h1><h3>Some information here...</h3>";
  }

}
