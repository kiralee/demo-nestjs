import { Test, TestingModule } from '@nestjs/testing';
import { UserPermissionService } from './userpermission.service';

describe('UserpermissionService', () => {
  let service: UserPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPermissionService],
    }).compile();

    service = module.get<UserPermissionService>(UserPermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
