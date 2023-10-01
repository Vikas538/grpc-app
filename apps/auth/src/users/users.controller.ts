import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UsersServiceController,
  CreateUserDto,
  UpdateUserDto,
  UsersServiceControllerMethods,
  FindOneUserDto,
  PaginationDto,
} from '@app/common';
import { Observable, Subject } from 'rxjs';
import {GrpcStreamMethod } from '@nestjs/microservices';
import { MyService, RequestMessage, ResponseMessage } from '@app/common/types/proto/hello';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController, MyService {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers() {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  removeUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
  }

  @GrpcStreamMethod('MyService', 'sendStream')
  sendStream(request: Observable<RequestMessage>): Observable<ResponseMessage> {
    const rsponse$ = new Subject<ResponseMessage>();

    const onNext = (requestdata: RequestMessage) => {
      const { data } = requestdata;
      console.log('ReceivedData', data); //do your thing
      rsponse$.next({ responseData: `${data}` });
    };
    const onComplete = () => rsponse$.complete();

    request.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return rsponse$.asObservable();
  }
}
