var cheerio = require('cheerio');
var fs = require('fs');

console.log('team,week,name,nflteam,position,score,started');
for (var team=1; team<=10; team++) {
    for (var week=1; week<=4; week++) {
        var $ = cheerio.load(fs.readFileSync('./html/team' + team + '_week' + week + '.html'));

        $rows = $('.Datatable tr');
        $rows.each(function(index) {
            $pos = $(this).find('.pos-label');
            if ($pos.length > 0) {
                var started = $pos.text() != 'BN' && $pos.text() != 'IR';

                $name = $(this).find('.ysf-player-name');
                var fields = $name.text().trim().split(' ');
                var position = fields.pop();
                fields.pop();
                var nflteam = fields.pop();
                var name = fields.join(' ');

                $score = $(this).find('.pps');
                var score = $score.text();
                if ($score.length == 0) {
                    score = '0.00';
                }

                console.log([team, week, name, nflteam, position, score, started].join());
            }
        });
    }
}
