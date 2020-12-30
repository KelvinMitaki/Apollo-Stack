const users = [
  {
    _id: Math.random(),
    fullName: "Kate Chopin",
    email: "kate@gmail.com",
    password: "kevinmitaki"
  },
  {
    _id: Math.random(),
    fullName: "Paul Auster",
    email: "paul@gmail.com",
    password: "kevinmitaki"
  }
];

export const resolvers = {
  Query: {
    users: () => users
  }
};
