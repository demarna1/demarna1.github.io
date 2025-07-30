# Fantasy Football League Dashboard

A beautiful, responsive static dashboard for tracking your fantasy football league's championship and playoff history.

## Features

- 📊 **League Statistics**: Total members, championships, and playoff appearances
- 🏆 **Member Rankings**: Sortable table with member names, team names, and achievements
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 📈 **Win Rate Tracking**: Calculate and display success rates
- 💾 **Data Management**: Easy data import/export functionality

## Table Structure

The dashboard displays the following information for each league member:

| Column | Description |
|--------|-------------|
| Rank | Current ranking position |
| Member Name | League member's name |
| Team Name | Fantasy team name |
| Championships | Number of league championships won |
| Playoff Appearances | Number of times made playoffs |
| Win Rate | Success rate percentage |

## How to Add Your League Data

### Option 1: Using the Browser Console

1. Open your browser's developer tools (F12)
2. Go to the Console tab
3. Use the following format to add your data:

```javascript
fantasyDashboard.addLeagueData([
    {
        rank: 1,
        memberName: "John Doe",
        teamName: "Touchdown Titans",
        championships: 3,
        playoffAppearances: 8,
        winRate: "37.5%"
    },
    {
        rank: 2,
        memberName: "Jane Smith",
        teamName: "Gridiron Giants",
        championships: 2,
        playoffAppearances: 6,
        winRate: "33.3%"
    }
    // Add more members as needed
]);
```

### Option 2: Edit the JavaScript File

1. Open `script.js`
2. Find the commented example data
3. Uncomment and modify the data array
4. Save the file and refresh the page

### Option 3: Add Individual Members

```javascript
fantasyDashboard.addMember({
    rank: 3,
    memberName: "Mike Johnson",
    teamName: "End Zone Eagles",
    championships: 1,
    playoffAppearances: 4,
    winRate: "25%"
});
```

## Available Functions

- `fantasyDashboard.addLeagueData(data)` - Replace all data
- `fantasyDashboard.addMember(member)` - Add a single member
- `fantasyDashboard.clearData()` - Remove all data
- `fantasyDashboard.sortByChampionships()` - Sort by championships
- `fantasyDashboard.sortByPlayoffAppearances()` - Sort by playoff appearances
- `fantasyDashboard.exportData()` - Download data as JSON
- `fantasyDashboard.importData(jsonString)` - Import data from JSON

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Colors
The dashboard uses a purple gradient theme. You can customize colors by editing the CSS variables in `styles.css`.

### Fonts
The dashboard uses Inter font from Google Fonts. You can change this by modifying the font-family in the CSS.

### Icons
The dashboard uses Font Awesome icons. You can change icons by modifying the HTML or adding new icon classes.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Deployment

This is a static website that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any web hosting service

Simply upload all files to your web server or hosting platform.

## License

This project is open source and available under the MIT License. 