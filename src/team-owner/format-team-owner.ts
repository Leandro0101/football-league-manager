export const formatTeamOwner = (teamOwner: any) => {
  const { _id, __v, ...rest } = teamOwner._doc;
  const { name, email } = rest;
  return {
    id: _id,
    email,
    name,
  };
};
