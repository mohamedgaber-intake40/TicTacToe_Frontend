import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../Auth/Models/user';

@Pipe({
  name: 'filterOnline'
})
export class FilterOnlinePipe implements PipeTransform {

  transform(users: User[], id: any): unknown {
    if(users){
      return users.filter(user=>{
        return user.id != id;
      })
    }
  }

}
