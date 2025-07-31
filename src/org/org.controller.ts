import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators';

@Auth()
@ApiTags('org')
@Controller('org')
export class OrgController {}
