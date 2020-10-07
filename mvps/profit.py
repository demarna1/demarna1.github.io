import math

# Values derived from median of top 10 highest average free agents
# (minimum of 4 games played) (use higher of RB/WR value for both)
replacement = {
	'QB': 17.03,
	'RB': 6.70,
	'WR': 7.20,
	'TE': 5.96,
	'K': 9.00,
	'DEF': 5.63
}

def auction_value(pick):
	return 304 * math.exp(-0.029 * pick)

def vor_value(player):
	stub = replacement[player['position']]
	return player['score'] - stub*player['starts']

def dollar_value(player):
	return player['vor']*3

stats = [line.strip() for line in open('data/results-week4.csv')][1:]
stats_dict = {}

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

	if key not in stats_dict:
		player_dict = {}
		player_dict['score'] = 0
		player_dict['starts'] = 0
		player_dict['name'] = name
		player_dict['nflteam'] = nflteam
		player_dict['position'] = position
		stats_dict[key] = player_dict

	if started:
		stats_dict[key]['score'] += score
		stats_dict[key]['starts'] += 1

players = stats_dict.values()
for player in players:
	player['vor'] = vor_value(player)
	player['dollar'] = dollar_value(player)
players_sorted = sorted(players, key = lambda i: i['dollar'], reverse=True)
print 'value-over-replacement:'
for player in players_sorted:
	print '${},{},{},{}'.format(int(player['dollar']), player['name'], player['nflteam'], player['position'])

draft = [line.strip() for line in open('data/results-draft.csv')][1:]
draft_players = []
for row in draft:
	cols = row.split(',')
	pick = int(cols[0])
	name = cols[1]
	nflteam = cols[2]
	position = cols[3]
	key = name + nflteam
	draft_price = auction_value(pick)
	if key in stats_dict:
		real_price = stats_dict[key]['dollar']
	else:
		real_price = 0
	profit = real_price - draft_price
	if profit >= 0:
		print '{}. {} \033[92m${}\033[0m'.format(pick, name, int(profit))
	else:
		print '{}. {} \033[91m-${}\033[0m'.format(pick, name, int(profit*-1))
	player = {}
	player['name'] = name
	player['pick'] = pick
	player['nflteam'] = nflteam
	player['position'] = position
	player['profit'] = profit
	draft_players.append(player)

players_sorted = sorted(draft_players, key = lambda i: i['profit'], reverse=True)
for player in players_sorted:
	if player['profit'] >= 0:
		print '{},{},{} (pick {}) \033[92m${}\033[0m'.format(player['name'], player['nflteam'], player['position'], player['pick'], int(player['profit']))
	else:
		print '{},{},{} (pick {}) \033[91m-${}\033[0m'.format(player['name'], player['nflteam'], player['position'], player['pick'], int(player['profit']*-1))

