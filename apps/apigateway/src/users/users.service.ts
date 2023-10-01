import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  PaginationDto,
  USERS_SERVICE_NAME,
  UpdateUserDto,
  UsersServiceClient,
} from '@app/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import {ReplaySubject } from 'rxjs';
import {  MyService, RequestMessage, ResponseMessage } from '@app/common/types/proto/hello';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;
  private gspService:MyService

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc ) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
      this.gspService=this.client.getService<MyService>('MyService');
  }

  create(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAll() {
    return this.usersService.findAllUsers({});
  }

  findOne(id: string) {
    return this.usersService.findOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({ id, ...updateUserDto });
  }

  remove(id: string) {
    return this.usersService.removeUser({ id });
  }

  emailUsers() {
    const users$ = new ReplaySubject<PaginationDto>();

    users$.next({ page: 0, skip: 25 });
    users$.next({ page: 1, skip: 25 });
    users$.next({ page: 2, skip: 25 });
    users$.next({ page: 3, skip: 25 });

    users$.complete();

    let chunkNumber = 1;

    this.usersService.queryUsers(users$).subscribe((users) => {
      console.log('Chunk', chunkNumber, users);
      chunkNumber += 1;
    });
  }

  sendStream(data: string) {
    try {
      const helloRequest$ = new ReplaySubject<RequestMessage>();
      helloRequest$.next({ data: `Hello (${data})!` });
      helloRequest$.complete();
      this.gspService.sendStream(helloRequest$).subscribe((res) => {
        console.log(res);
      })
    } catch (err) {
      console.log(err);
    }
  }
}
