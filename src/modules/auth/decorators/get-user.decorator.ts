import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (propertyFilter: string | string[] | undefined, ctx: ExecutionContext): User | { [key: string] : any } => {
    const request = ctx.switchToHttp().getRequest();
    let userProperties: User | { [key: string] : string};

    if(!propertyFilter){
      userProperties = request.user;
    } else if(Array.isArray(propertyFilter)) {
      userProperties = {};
      propertyFilter.forEach(x => {
        userProperties[x] = request.user[x];
      });
    } else{
      userProperties = { 
        [propertyFilter]: request.user[propertyFilter]
      };
    }
   
    return userProperties;
  }
)