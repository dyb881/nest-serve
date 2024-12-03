import { ApiPathAuth, CommonController } from '../../common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserCreateDto, UserUpdateDto, UserQueryDto, UserPaginationQueryDto, UserPaginationDto } from './user.dto';

@ApiPathAuth('user', '用户帐号管理')
export class UserController extends CommonController(
  User,
  UserCreateDto,
  UserUpdateDto,
  UserQueryDto,
  UserPaginationQueryDto,
  UserPaginationDto,
  UserService,
) {}
