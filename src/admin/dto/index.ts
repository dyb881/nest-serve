export class CreateDto {
  readonly username: string;
  readonly password: string;
  readonly nickname: string;
  readonly status: number;
}

export class UpdateDto {
  readonly password: string;
  readonly nickname: string;
  readonly status: number;
}

// regIp: string;
// loginIp: string;
// regTime: number;
// loginTime: number;
// updateTime: number;

export class QueryDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
