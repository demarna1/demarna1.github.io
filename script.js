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
        // Combined 2017-2022 Fantasy Football League Data
        this.leagueData = [
            {
                teamName: "Hazed and Confused",
                totalWins: 51,
                totalLosses: 35,
                totalTies: 0,
                totalPointsFor: 11579.22,
                totalPointsAgainst: 10385.91,
                playoffAppearances: 5,
                gold: 2,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1930.20
            },
            {
                teamName: "Spider 2 Y Banana",
                totalWins: 47,
                totalLosses: 39,
                totalTies: 0,
                totalPointsFor: 10121.87,
                totalPointsAgainst: 10146.25,
                playoffAppearances: 5,
                gold: 1,
                silver: 1,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1687.15
            },
            {
                teamName: "Suk 4 Saquan",
                totalWins: 45,
                totalLosses: 23,
                totalTies: 0,
                totalPointsFor: 8566.16,
                totalPointsAgainst: 7966.43,
                playoffAppearances: 4,
                gold: 2,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1713.23
            },
            {
                teamName: "Cooper Troopers",
                totalWins: 40,
                totalLosses: 46,
                totalTies: 0,
                totalPointsFor: 9871.56,
                totalPointsAgainst: 10621.97,
                playoffAppearances: 4,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 4,
                avgPointsPerGame: 1645.26
            },
            {
                teamName: "Ciroc Boys",
                totalWins: 37,
                totalLosses: 49,
                totalTies: 0,
                totalPointsFor: 10024.42,
                totalPointsAgainst: 10226.44,
                playoffAppearances: 3,
                gold: 0,
                silver: 1,
                bronze: 0,
                bestFinish: 2,
                avgPointsPerGame: 1670.74
            },
            {
                teamName: "Fresh Prince Helaire",
                totalWins: 29,
                totalLosses: 26,
                totalTies: 0,
                totalPointsFor: 7244.62,
                totalPointsAgainst: 6961.12,
                playoffAppearances: 2,
                gold: 1,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1811.16
            },
            {
                teamName: "skittles.",
                totalWins: 18,
                totalLosses: 10,
                totalTies: 0,
                totalPointsFor: 3698.07,
                totalPointsAgainst: 3275.90,
                playoffAppearances: 2,
                gold: 1,
                silver: 1,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1849.04
            },
            {
                teamName: "Failed to fail for27",
                totalWins: 22,
                totalLosses: 20,
                totalTies: 0,
                totalPointsFor: 4973.15,
                totalPointsAgainst: 4765.09,
                playoffAppearances: 1,
                gold: 0,
                silver: 1,
                bronze: 0,
                bestFinish: 2,
                avgPointsPerGame: 1657.72
            },
            {
                teamName: "Mr. Big Chest",
                totalWins: 24,
                totalLosses: 34,
                totalTies: 0,
                totalPointsFor: 6738.41,
                totalPointsAgainst: 7208.99,
                playoffAppearances: 1,
                gold: 0,
                silver: 0,
                bronze: 1,
                bestFinish: 3,
                avgPointsPerGame: 1684.60
            },
            {
                teamName: "Team IR",
                totalWins: 21,
                totalLosses: 23,
                totalTies: 0,
                totalPointsFor: 5319.64,
                totalPointsAgainst: 5435.73,
                playoffAppearances: 2,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 4,
                avgPointsPerGame: 1773.21
            },
            {
                teamName: "Mixon A Box",
                totalWins: 15,
                totalLosses: 13,
                totalTies: 0,
                totalPointsFor: 3691.45,
                totalPointsAgainst: 3370.21,
                playoffAppearances: 1,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 4,
                avgPointsPerGame: 1845.73
            },
            {
                teamName: "Call Me The Brees",
                totalWins: 12,
                totalLosses: 16,
                totalTies: 0,
                totalPointsFor: 3418.28,
                totalPointsAgainst: 3500.74,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 7,
                avgPointsPerGame: 1709.14
            },
            {
                teamName: "Outta Luck",
                totalWins: 16,
                totalLosses: 27,
                totalTies: 0,
                totalPointsFor: 4515.80,
                totalPointsAgainst: 5119.04,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 7,
                avgPointsPerGame: 1505.27
            },
            {
                teamName: "The CeeDee Players",
                totalWins: 16,
                totalLosses: 26,
                totalTies: 0,
                totalPointsFor: 4799.50,
                totalPointsAgainst: 5243.77,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 5,
                avgPointsPerGame: 1599.83
            },
            {
                teamName: "PlayBoys",
                totalWins: 14,
                totalLosses: 1,
                totalTies: 0,
                totalPointsFor: 2016.20,
                totalPointsAgainst: 1569.41,
                playoffAppearances: 1,
                gold: 0,
                silver: 1,
                bronze: 0,
                bestFinish: 2,
                avgPointsPerGame: 2016.20
            },
            {
                teamName: "DraftedDavidJohnson",
                totalWins: 5,
                totalLosses: 9,
                totalTies: 0,
                totalPointsFor: 1468.09,
                totalPointsAgainst: 1677.00,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 9,
                avgPointsPerGame: 1468.09
            },
            {
                teamName: "Team Boileau",
                totalWins: 4,
                totalLosses: 10,
                totalTies: 0,
                totalPointsFor: 1414.51,
                totalPointsAgainst: 1779.13,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 10,
                avgPointsPerGame: 1414.51
            },
            {
                teamName: "Team Gingold",
                totalWins: 7,
                totalLosses: 7,
                totalTies: 0,
                totalPointsFor: 1557.36,
                totalPointsAgainst: 1606.61,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 6,
                avgPointsPerGame: 1557.36
            },
            {
                teamName: "Biggest loser",
                totalWins: 6,
                totalLosses: 8,
                totalTies: 0,
                totalPointsFor: 1596.34,
                totalPointsAgainst: 1761.47,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 10,
                avgPointsPerGame: 1596.34
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
                <td>${team.teamName}</td>
                <td>${team.totalWins}-${team.totalLosses}-${team.totalTies}</td>
                <td>${team.totalPointsFor.toFixed(2)}</td>
                <td>${team.playoffAppearances}</td>
                <td>${team.gold}</td>
                <td>${team.silver}</td>
                <td>${team.bronze}</td>
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