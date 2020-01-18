const photos = [
  {
    id: '0',
    name: 'Dropping the Heart Chute',
    description: 'The heart chute is one of my favorite chutes',
    category: 'ACTION',
    githubUser: 'gPlake',
    created: '3-28-1977',
  },
  {
    id: '1',
    name: 'Enjoying the subshine',
    category: 'SELFIE',
    githubUser: 'sSchmidt',
    created: '1-2-1985',
  },
  {
    id: '2',
    name: 'Gunbarrel 25',
    description: '25 laps on gunbarrel today',
    category: 'LANDSCAPE',
    githubUser: 'sSchmidt',
    created: '2018-04-15T19:09:57.308Z',
  },
]

const users = [
  {
    githubLogin: 'mHattrup',
    name: 'Mike Hattrup',
  },
  {
    githubLogin: 'gPlake',
    name: 'Glen Plake',
  },
  {
    githubLogin: 'sSchmidt',
    name: 'Scot Schmidt',
  },
]

const tags = [
  { photoID: '1', userID: 'gPlake' },
  { photoID: '2', userID: 'sSchmidt' },
  { photoID: '2', userID: 'mHattrup' },
  { photoID: '2', userID: 'gPlake' },
]

module.exports = {
  photos,
  users,
  tags,
}
