def print_mvp_scores(list_name, players, position_averages):
	for player in players:
		player['mvpscore'] = player['score'] - position_averages[player['position']]*player['starts']
	players_sorted = sorted(players, key = lambda i: i['mvpscore'], reverse=True)
	print '{} MVP scores:'.format(list_name)
	for player in players_sorted:
		if player['mvpscore'] != 0:
			print '{},{},{},{}'.format(int(player['mvpscore']), player['name'], player['nflteam'], player['position'])

stats = [line.strip() for line in open('data/results-midpoint.csv')][1:]

teams_dict = {
	'1': 'Kupp Runneth Over',
	'2': 'Keenan & Bell',
	'3': 'Mantis Toboggan MD',
	'4': 'Dave\'s Team',
	'5': 'Birds of War',
	'6': 'dicktugga.com',
	'7': 'Primetime Players',
	'8': 'The Art of Edging',
	'9': 'Vance Refrigeration',
	'10': 'Mark'
}

team_stats_dict = {}
player_stats_dict = {}
position_scores = {}
position_averages = {}

for row in stats:
	cols = row.split(',')
	team = cols[0]
	week = cols[1]
	name = cols[2]
	nflteam = cols[3]
	position = cols[4]
	score = float(cols[5])
	started = cols[6] == 'true'
	key = name + nflteam

	if team not in team_stats_dict:
		team_stats_dict[team] = {}

	if key not in team_stats_dict[team]:
		player_dict = {}
		player_dict['score'] = 0
		player_dict['starts'] = 0
		player_dict['name'] = name
		player_dict['nflteam'] = nflteam
		player_dict['position'] = position
		team_stats_dict[team][key] = player_dict

	if key not in player_stats_dict:
		player_dict = {}
		player_dict['score'] = 0
		player_dict['starts'] = 0
		player_dict['name'] = name
		player_dict['nflteam'] = nflteam
		player_dict['position'] = position
		player_stats_dict[key] = player_dict

	if started:
		team_stats_dict[team][key]['score'] += score
		team_stats_dict[team][key]['starts'] += 1

		player_stats_dict[key]['score'] += score
		player_stats_dict[key]['starts'] += 1

		if position not in position_scores:
			position_scores[position] = []
		position_scores[position].append(score)

print 'Position averages'
for position, scores in position_scores.items():
	position_averages[position] = reduce(lambda x, y: x + y, scores) / len(scores)
	print '{} = {}'.format(position, position_averages[position])
flex_average = (position_averages['WR']+position_averages['RB'])/2
position_averages['WR'] = flex_average
position_averages['RB'] = flex_average
print '{} = {}'.format('WR/RB', position_averages['WR'])

for team, players_dict in team_stats_dict.items():
	print_mvp_scores(teams_dict[team], players_dict.values(), position_averages)
print_mvp_scores('Overall', player_stats_dict.values(), position_averages)

