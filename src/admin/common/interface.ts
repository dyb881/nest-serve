import { QueryAdminDto, CreateAdminDto, UpdateAdminDto } from './dto';

export type QueryAdminData = QueryAdminDto;

export type CreateAdminData = CreateAdminDto & {
  readonly reg_ip: string;
};

export type UpdateAdminData = UpdateAdminDto;
