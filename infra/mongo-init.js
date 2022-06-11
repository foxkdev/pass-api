db.createUser({
  user: 'pass-api',
  pwd: 'securepass',
  roles: [
    {
      role: 'dbOwner',
      db: '__pass-api',
    },
  ],
});
