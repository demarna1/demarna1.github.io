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
        // 2022 Fantasy Football League Data
        this.leagueData = [
            {
                rank: 1,
                memberName: "Hazed and Confused",
                teamName: "Hazed and Confused",
                championships: 9,
                playoffAppearances: 35,
                winRate: "73.3%",
                record: "11-4-0",
                pointsFor: 2126.21,
                pointsAgainst: 1779.70,
                streak: "L-1",
                moneyWon: "$4"
            },
            {
                rank: 2,
                memberName: "PlayBoys",
                teamName: "PlayBoys",
                championships: 10,
                playoffAppearances: 29,
                winRate: "93.3%",
                record: "14-1-0",
                pointsFor: 2016.20,
                pointsAgainst: 1569.41,
                streak: "W-8",
                moneyWon: "$58"
            },
            {
                rank: 3,
                memberName: "Spider 2 Y Banana",
                teamName: "Spider 2 Y Banana",
                championships: 7,
                playoffAppearances: 19,
                winRate: "53.3%",
                record: "8-7-0",
                pointsFor: 1785.42,
                pointsAgainst: 1778.82,
                streak: "W-1",
                moneyWon: "$45"
            },
            {
                rank: 4,
                memberName: "Team IR",
                teamName: "Team IR",
                championships: 8,
                playoffAppearances: 25,
                winRate: "66.7%",
                record: "10-5-0",
                pointsFor: 1955.64,
                pointsAgainst: 1830.14,
                streak: "L-1",
                moneyWon: "$0"
            },
            {
                rank: 5,
                memberName: "The CeeDee Players",
                teamName: "The CeeDee Players",
                championships: 5,
                playoffAppearances: 33,
                winRate: "46.7%",
                record: "7-8-0",
                pointsFor: 1551.94,
                pointsAgainst: 1688.51,
                streak: "W-4",
                moneyWon: "$22"
            },
            {
                rank: 6,
                memberName: "Fresh Prince Helaire",
                teamName: "Fresh Prince Helaire",
                championships: 6,
                playoffAppearances: 31,
                winRate: "46.7%",
                record: "7-8-0",
                pointsFor: 1734.08,
                pointsAgainst: 1775.45,
                streak: "W-1",
                moneyWon: "$8"
            },
            {
                rank: 7,
                memberName: "Cooper Troopers",
                teamName: "Cooper Troopers",
                championships: 4,
                playoffAppearances: 6,
                winRate: "40.0%",
                record: "6-9-0",
                pointsFor: 1636.88,
                pointsAgainst: 1711.10,
                streak: "L-6",
                moneyWon: "$80"
            },
            {
                rank: 8,
                memberName: "Suspension == IR",
                teamName: "Suspension == IR",
                championships: 3,
                playoffAppearances: 20,
                winRate: "26.7%",
                record: "4-11-0",
                pointsFor: 1703.47,
                pointsAgainst: 1899.71,
                streak: "W-2",
                moneyWon: "$47"
            },
            {
                rank: 9,
                memberName: "Mr. Big Chest",
                teamName: "Mr. Big Chest",
                championships: 2,
                playoffAppearances: 35,
                winRate: "26.7%",
                record: "4-11-0",
                pointsFor: 1670.96,
                pointsAgainst: 1960.44,
                streak: "L-8",
                moneyWon: "$8"
            },
            {
                rank: 10,
                memberName: "Ciroc Boys",
                teamName: "Ciroc Boys",
                championships: 1,
                playoffAppearances: 39,
                winRate: "26.7%",
                record: "4-11-0",
                pointsFor: 1619.68,
                pointsAgainst: 1807.20,
                streak: "L-4",
                moneyWon: "$33"
            }
        ];
    }

    renderDashboard() {
        this.updateStats();
        this.renderTable();
        this.toggleEmptyState();
    }

    updateStats() {
        const totalMembers = this.leagueData.length;
        const playoffTeams = this.leagueData.filter(member => member.rank <= 4).length;
        const avgPoints = this.leagueData.reduce((sum, member) => sum + member.pointsFor, 0) / totalMembers;

        document.getElementById('total-members').textContent = totalMembers;
        document.getElementById('total-playoffs').textContent = playoffTeams;
        document.getElementById('avg-points').textContent = avgPoints.toFixed(1);
    }

    renderTable() {
        const tableBody = document.getElementById('league-table-body');
        tableBody.innerHTML = '';

        if (this.leagueData.length === 0) {
            return;
        }

        this.leagueData.forEach((member, index) => {
            const row = document.createElement('tr');
            const isPlayoffTeam = member.rank <= 4;
            row.innerHTML = `
                <td>${member.rank}</td>
                <td>${member.teamName}${isPlayoffTeam ? ' <i class="fas fa-star playoff-icon"></i>' : ''}</td>
                <td>${member.record}</td>
                <td>${member.pointsFor.toFixed(2)}</td>
                <td>${member.pointsAgainst.toFixed(2)}</td>
            `;
            if (isPlayoffTeam) {
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