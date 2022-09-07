import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersWDto } from './create-users-w.dto';

export class UpdateUsersWDto extends PartialType(CreateUsersWDto) {
  id: number;
}
