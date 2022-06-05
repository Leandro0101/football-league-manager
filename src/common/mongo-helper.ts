export const MongoHelper = {
  map: (data: any) => {
    const { _id, __v, ...rest } = data._doc;
    return {
      ...rest,
      id: _id,
    };
  },
};
