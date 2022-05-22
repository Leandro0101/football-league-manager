import { formatTeamOwner } from 'src/team-owner/format-team-owner';

type Entity = 'TeamOwner';
export const MongoHelper = {
  map: (data: any, entity: Entity) => {
    switch (entity) {
      case 'TeamOwner':
        return formatTeamOwner(data);
    }
  },
};
