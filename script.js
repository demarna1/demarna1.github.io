// Fantasy Football League Dashboard JavaScript

class FantasyLeagueDashboard {
    constructor() {
        this.leagueData = [];
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add any event listeners here if needed
        document.addEventListener('DOMContentLoaded', () => {
            this.renderDashboard();
        });
    }

    loadData() {
        // Combined 2021-2022 Fantasy Football League Data
        this.leagueData = [
            {
                teamName: "Fresh Prince Helaire",
                totalWins: 19,
                totalLosses: 11,
                totalTies: 0,
                totalPointsFor: 3891.36,
                totalPointsAgainst: 3552.26,
                playoffAppearances: 2,
                bestFinish: 1,
                avgPointsPerGame: 1945.68
            },
            {
                teamName: "Hazed and Confused",
                totalWins: 20,
                totalLosses: 10,
                totalTies: 0,
                totalPointsFor: 4242.37,
                totalPointsAgainst: 3658.89,
                playoffAppearances: 2,
                bestFinish: 1,
                avgPointsPerGame: 2121.19
            },
            {
                teamName: "Spider 2 Y Banana",
                totalWins: 15,
                totalLosses: 15,
                totalTies: 0,
                totalPointsFor: 3489.03,
                totalPointsAgainst: 3625.16,
                playoffAppearances: 2,
                bestFinish: 2,
                avgPointsPerGame: 1744.52
            },
            {
                teamName: "Ciroc Boys",
                totalWins: 12,
                totalLosses: 18,
                totalTies: 0,
                totalPointsFor: 3479.50,
                totalPointsAgainst: 3589.03,
                playoffAppearances: 1,
                bestFinish: 4,
                avgPointsPerGame: 1739.75
            },
            {
                teamName: "Mr. Big Chest",
                totalWins: 12,
                totalLosses: 18,
                totalTies: 0,
                totalPointsFor: 3463.02,
                totalPointsAgainst: 3768.41,
                playoffAppearances: 0,
                bestFinish: 5,
                avgPointsPerGame: 1731.51
            },
            {
                teamName: "The CeeDee Players",
                totalWins: 12,
                totalLosses: 16,
                totalTies: 0,
                totalPointsFor: 3242.48,
                totalPointsAgainst: 3474.65,
                playoffAppearances: 0,
                bestFinish: 5,
                avgPointsPerGame: 1621.24
            },
            {
                teamName: "Team IR",
                totalWins: 15,
                totalLosses: 15,
                totalTies: 0,
                totalPointsFor: 3611.70,
                totalPointsAgainst: 3634.45,
                playoffAppearances: 1,
                bestFinish: 4,
                avgPointsPerGame: 1805.85
            },
            {
                teamName: "Cooper Troopers",
                totalWins: 11,
                totalLosses: 19,
                totalTies: 0,
                totalPointsFor: 3184.47,
                totalPointsAgainst: 3556.06,
                playoffAppearances: 0,
                bestFinish: 7,
                avgPointsPerGame: 1592.24
            },
            {
                teamName: "Suk 4 Saquan",
                totalWins: 10,
                totalLosses: 5,
                totalTies: 0,
                totalPointsFor: 1861.80,
                totalPointsAgainst: 1666.34,
                playoffAppearances: 1,
                bestFinish: 2,
                avgPointsPerGame: 1861.80
            },
            {
                teamName: "PlayBoys",
                totalWins: 14,
                totalLosses: 1,
                totalTies: 0,
                totalPointsFor: 2016.20,
                totalPointsAgainst: 1569.41,
                playoffAppearances: 1,
                bestFinish: 2,
                avgPointsPerGame: 2016.20
            },
            {
                teamName: "Outta Luck",
                totalWins: 4,
                totalLosses: 11,
                totalTies: 0,
                totalPointsFor: 1562.31,
                totalPointsAgainst: 1781.34,
                playoffAppearances: 0,
                bestFinish: 10,
                avgPointsPerGame: 1562.31
            }
        ];
        
        // Sort by total wins (descending)
        this.leagueData.sort((a, b) => b.totalWins - a.totalWins);
        
        // Add rank after sorting
        this.leagueData.forEach((team, index) => {
            team.rank = index + 1;
        });
    }

    renderDashboard() {
        this.updateStats();
        this.renderTable();
        this.toggleEmptyState();
    }

    updateStats() {
        const totalMembers = this.leagueData.length;
        const totalPlayoffAppearances = this.leagueData.reduce((sum, team) => sum + team.playoffAppearances, 0);
        const avgPoints = this.leagueData.reduce((sum, team) => sum + team.totalPointsFor, 0) / totalMembers;

        document.getElementById('total-members').textContent = totalMembers;
        document.getElementById('total-playoffs').textContent = totalPlayoffAppearances;
        document.getElementById('avg-points').textContent = avgPoints.toFixed(1);
    }

    renderTable() {
        const tableBody = document.getElementById('league-table-body');
        tableBody.innerHTML = '';

        if (this.leagueData.length === 0) {
            return;
        }

        this.leagueData.forEach((team, index) => {
            const row = document.createElement('tr');
            const hasPlayoffAppearances = team.playoffAppearances > 0;
            row.innerHTML = `
                <td>${team.rank}</td>
                <td>${team.teamName}${hasPlayoffAppearances ? ' <i class="fas fa-star playoff-icon"></i>' : ''}</td>
                <td>${team.totalWins}-${team.totalLosses}-${team.totalTies}</td>
                <td>${team.totalPointsFor.toFixed(2)}</td>
                <td>${team.playoffAppearances}</td>
                <td>${team.bestFinish}</td>
            `;
            if (hasPlayoffAppearances) {
                row.classList.add('playoff-team');
            }
            tableBody.appendChild(row);
        });
    }

    toggleEmptyState() {
        const emptyState = document.getElementById('empty-state');
        const tableContainer = document.querySelector('.table-container');
        
        if (this.leagueData.length === 0) {
            emptyState.style.display = 'block';
            tableContainer.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            tableContainer.style.display = 'block';
        }
    }

    // Method to add league data (will be used when you provide the data)
    addLeagueData(data) {
        this.leagueData = data;
        this.renderDashboard();
    }

    // Method to add a single member
    addMember(member) {
        this.leagueData.push(member);
        this.renderDashboard();
    }

    // Method to clear all data
    clearData() {
        this.leagueData = [];
        this.renderDashboard();
    }

    // Method to sort data by different criteria
    sortByChampionships() {
        this.leagueData.sort((a, b) => b.championships - a.championships);
        this.updateRanks();
        this.renderDashboard();
    }

    sortByPlayoffAppearances() {
        this.leagueData.sort((a, b) => b.playoffAppearances - a.playoffAppearances);
        this.updateRanks();
        this.renderDashboard();
    }

    updateRanks() {
        this.leagueData.forEach((member, index) => {
            member.rank = index + 1;
        });
    }

    // Export data as JSON (useful for backup)
    exportData() {
        const dataStr = JSON.stringify(this.leagueData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'fantasy-league-data.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    // Import data from JSON
    importData(jsonData) {
        try {
            this.leagueData = JSON.parse(jsonData);
            this.renderDashboard();
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
}

// Initialize the dashboard
const dashboard = new FantasyLeagueDashboard();

// Example of how to add data (you can use this format when you provide the data)
// dashboard.addLeagueData([
//     {
//         rank: 1,
//         memberName: "John Doe",
//         teamName: "Touchdown Titans",
//         championships: 3,
//         playoffAppearances: 8,
//         winRate: "37.5%"
//     },
//     {
//         rank: 2,
//         memberName: "Jane Smith",
//         teamName: "Gridiron Giants",
//         championships: 2,
//         playoffAppearances: 6,
//         winRate: "33.3%"
//     }
// ]);

// Make dashboard available globally for easy access
window.fantasyDashboard = dashboard; 