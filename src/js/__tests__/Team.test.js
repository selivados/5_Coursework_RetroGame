import Team from '../Team';

test('create new Team with correct properties', () => {
  const team = new Team();

  expect(team).toHaveProperty('characters');
  expect(team.characters).toEqual([]);
});
