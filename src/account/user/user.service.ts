import { Injectable } from '@nestjs/common';
import { AccountService, AccountLoginDto } from '../../common';
import { User } from './user.entity';
import { UserCreateDto, UserUpdateDto, UserQueryDto, UserPaginationQueryDto } from './user.dto';

@Injectable()
export class UserService extends AccountService(
  User,
  UserCreateDto,
  UserUpdateDto,
  UserQueryDto,
  UserPaginationQueryDto,
) {}
