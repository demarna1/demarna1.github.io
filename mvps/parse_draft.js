var cheerio = require('cheerio');
var fs = require('fs');

console.log('pick,name,nflteam,position');
var $ = cheerio.load(fs.readFileSync('./html/draft_results.html'));

$rounds = $('.Table tbody');
$rounds.each(function(round_index) {
    $picks = $(this).find('tr');
    $picks.each(function(pick_index) {
        var pick = round_index*10 + pick_index + 1;
        var name = $(this).find('.name').text();
        var fields = $(this).find('.Block').text().split(' ');
        var pos = fields.pop();
        pos = pos.substr(0, pos.length-1);
        fields.pop();
        var nflteam = fields.pop();
        nflteam = nflteam.substr(1, nflteam.length);
        console.log([pick, name, nflteam, pos].join());
    });
});
