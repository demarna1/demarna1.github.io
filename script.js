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
        // For now, we'll start with empty data
        // This will be populated when you provide the league data
        this.leagueData = [];
        
        // Example structure for future data:
        // this.leagueData = [
        //     {
        //         rank: 1,
        //         memberName: "John Doe",
        //         teamName: "Touchdown Titans",
        //         championships: 3,
        //         playoffAppearances: 8,
        //         winRate: "37.5%"
        //     }
        // ];
    }

    renderDashboard() {
        this.updateStats();
        this.renderTable();
        this.toggleEmptyState();
    }

    updateStats() {
        const totalMembers = this.leagueData.length;
        const totalChampionships = this.leagueData.reduce((sum, member) => sum + member.championships, 0);
        const totalPlayoffs = this.leagueData.reduce((sum, member) => sum + member.playoffAppearances, 0);

        document.getElementById('total-members').textContent = totalMembers;
        document.getElementById('total-championships').textContent = totalChampionships;
        document.getElementById('total-playoffs').textContent = totalPlayoffs;
    }

    renderTable() {
        const tableBody = document.getElementById('league-table-body');
        tableBody.innerHTML = '';

        if (this.leagueData.length === 0) {
            return;
        }

        this.leagueData.forEach((member, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.rank}</td>
                <td>${member.memberName}</td>
                <td>${member.teamName}</td>
                <td>
                    ${member.championships > 0 ? '<i class="fas fa-trophy champion-icon"></i>' : ''}
                    ${member.championships}
                </td>
                <td>
                    ${member.playoffAppearances > 0 ? '<i class="fas fa-star playoff-icon"></i>' : ''}
                    ${member.playoffAppearances}
                </td>
                <td>${member.winRate}</td>
            `;
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