var cheerio = require('cheerio');
var fs = require('fs');

console.log('team,week,name,nflteam,position,score,started');
for (var team=1; team<=10; team++) {
    for (var week=1; week<=16; week++) {
        var $ = cheerio.load(fs.readFileSync('./html/2013/team' + team + '_week' + week + '.html'));

        $rows = $('.Datatable tr');
        $rows.each(function(index) {
            $pos = $(this).find('.pos-label');
            if ($pos.length > 0) {
                var position = $pos.text();
                var started = position != 'BN' && position != 'IR';
                var name = $(this).find('.ysf-player-name').text().trim();
                $score = $(this).find('.pps');
                var score = $score.text();
                if ($score.length == 0) {
                    score = '0.00';
                }

                console.log([team, week, name, position, score, started].join());
            }
        });
    }
}
