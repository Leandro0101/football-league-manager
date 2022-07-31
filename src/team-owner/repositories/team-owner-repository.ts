import { TeamOwnerPersistence } from '../entities';
import { TeamOwnerApplication } from '../entities/team-owner.application';
import { MongoHelper } from 'src/common/mongodb/mongo-helper';

export abstract class TeamOwnerRepository {
  toApplication(data: TeamOwnerPersistence): TeamOwnerApplication {
    if (data) {
      const mappedData = MongoHelper.map(data);
      return new TeamOwnerApplication(mappedData);
    }
  }
}
