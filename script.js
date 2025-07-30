// Fantasy Football League Dashboard JavaScript

class FantasyLeagueDashboard {
    constructor() {
        this.leagueData = [];
        this.seasonData = {};
        this.currentSeason = '2022';
        this.init();
    }

    init() {
        this.loadData();
        this.loadSeasonData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add any event listeners here if needed
        document.addEventListener('DOMContentLoaded', () => {
            this.renderDashboard();
            this.setupSeasonSelector();
        });
    }

    loadData() {
        // Combined 2013-2022 Fantasy Football League Data - Grouped by Manager
        this.leagueData = [
            {
                manager: "Chris Gramley",
                teamName: "Hazed and Confused",
                totalWins: 71,
                totalLosses: 57,
                totalTies: 0,
                totalPointsFor: 16367.61,
                totalPointsAgainst: 15280.79,
                playoffAppearances: 6,
                gold: 3,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1820.85
            },
            {
                manager: "Joe Kertsmar",
                teamName: "Spider 2 Y Banana",
                totalWins: 67,
                totalLosses: 73,
                totalTies: 0,
                totalPointsFor: 16423.76,
                totalPointsAgainst: 16719.02,
                playoffAppearances: 5,
                gold: 1,
                silver: 1,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1642.38
            },
            {
                manager: "Richie Morris",
                teamName: "Ciroc Boys",
                totalWins: 67,
                totalLosses: 73,
                totalTies: 0,
                totalPointsFor: 16481.69,
                totalPointsAgainst: 16783.26,
                playoffAppearances: 4,
                gold: 0,
                silver: 1,
                bronze: 0,
                bestFinish: 2,
                avgPointsPerGame: 1648.17
            },
            {
                manager: "John Adam Benson",
                teamName: "Suk 4 Saquan",
                totalWins: 59,
                totalLosses: 41,
                totalTies: 0,
                totalPointsFor: 11347.28,
                totalPointsAgainst: 10432.85,
                playoffAppearances: 5,
                gold: 2,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1891.21
            },
            {
                manager: "Rob Murray",
                teamName: "Cooper Troopers",
                totalWins: 47,
                totalLosses: 53,
                totalTies: 0,
                totalPointsFor: 10252.68,
                totalPointsAgainst: 10817.17,
                playoffAppearances: 4,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 3,
                avgPointsPerGame: 1708.78
            },
            {
                manager: "Noah DeMarco",
                teamName: "skittles.",
                totalWins: 80,
                totalLosses: 45,
                totalTies: 0,
                totalPointsFor: 15288.88,
                totalPointsAgainst: 13576.86,
                playoffAppearances: 9,
                gold: 4,
                silver: 1,
                bronze: 1,
                bestFinish: 1,
                avgPointsPerGame: 1830.31
            },
            {
                manager: "Ryan Jones",
                teamName: "Fresh Prince Helaire",
                totalWins: 66,
                totalLosses: 54,
                totalTies: 0,
                totalPointsFor: 14002.23,
                totalPointsAgainst: 13544.58,
                playoffAppearances: 3,
                gold: 1,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1750.28
            },
            {
                manager: "Danny Boileau",
                teamName: "Team IR",
                totalWins: 47,
                totalLosses: 53,
                totalTies: 0,
                totalPointsFor: 9708.30,
                totalPointsAgainst: 10088.87,
                playoffAppearances: 1,
                gold: 0,
                silver: 1,
                bronze: 0,
                bestFinish: 2,
                avgPointsPerGame: 1618.05
            },
            {
                manager: "Billy Cauley",
                teamName: "Call Me The Brees",
                totalWins: 53,
                totalLosses: 40,
                totalTies: 0,
                totalPointsFor: 10500.61,
                totalPointsAgainst: 10368.31,
                playoffAppearances: 4,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 2,
                avgPointsPerGame: 1750.10
            },
            {
                manager: "Ben Gingold",
                teamName: "The CeeDee Players",
                totalWins: 23,
                totalLosses: 33,
                totalTies: 0,
                totalPointsFor: 6354.86,
                totalPointsAgainst: 6850.38,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 5,
                avgPointsPerGame: 1588.72
            },
            {
                manager: "Alex Falcon",
                teamName: "Forte year old virgn",
                totalWins: 44,
                totalLosses: 26,
                totalTies: 0,
                totalPointsFor: 8658.77,
                totalPointsAgainst: 8044.62,
                playoffAppearances: 4,
                gold: 1,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1803.95
            }
        ];
        
        // Sort by total wins (descending)
        this.leagueData.sort((a, b) => b.totalWins - a.totalWins);
        
        // Add rank after sorting
        this.leagueData.forEach((team, index) => {
            team.rank = index + 1;
        });
    }

    loadSeasonData() {
        // Individual season data for 2013-2022
        this.seasonData = {
            '2022': [
                { rank: 1, teamName: "Hazed and Confused", record: "12-2-0", pointsFor: 1994.25, pointsAgainst: 1572.00, playoff: true },
                { rank: 2, teamName: "Spider 2 Y Banana", record: "11-3-0", pointsFor: 1987.32, pointsAgainst: 1589.20, playoff: true },
                { rank: 3, teamName: "Suk 4 Saquan", record: "10-4-0", pointsFor: 1731.94, pointsAgainst: 1726.67, playoff: true },
                { rank: 4, teamName: "Cooper Troopers", record: "8-6-0", pointsFor: 1679.00, pointsAgainst: 1575.29, playoff: true },
                { rank: 5, teamName: "Ciroc Boys", record: "6-8-0", pointsFor: 1605.17, pointsAgainst: 1665.63, playoff: false },
                { rank: 6, teamName: "Fresh Prince Helaire", record: "7-7-0", pointsFor: 1580.41, pointsAgainst: 1585.62, playoff: false },
                { rank: 7, teamName: "Mr. Big Chest", record: "6-8-0", pointsFor: 1636.42, pointsAgainst: 1626.19, playoff: false },
                { rank: 8, teamName: "Team IR", record: "6-8-0", pointsFor: 1563.37, pointsAgainst: 1708.97, playoff: false },
                { rank: 9, teamName: "Failed to fail for27", record: "6-8-0", pointsFor: 1553.26, pointsAgainst: 1656.89, playoff: false },
                { rank: 10, teamName: "Outta Luck", record: "2-12-0", pointsFor: 1544.52, pointsAgainst: 1916.20, playoff: false }
            ],
            '2021': [
                { rank: 1, teamName: "Suk 4 Saquan", record: "12-2-0", pointsFor: 1994.25, pointsAgainst: 1572.00, playoff: true },
                { rank: 2, teamName: "Hazed and Confused", record: "11-3-0", pointsFor: 1987.32, pointsAgainst: 1589.20, playoff: true },
                { rank: 3, teamName: "Spider 2 Y Banana", record: "10-4-0", pointsFor: 1731.94, pointsAgainst: 1726.67, playoff: true },
                { rank: 4, teamName: "Cooper Troopers", record: "8-6-0", pointsFor: 1679.00, pointsAgainst: 1575.29, playoff: true },
                { rank: 5, teamName: "Ciroc Boys", record: "6-8-0", pointsFor: 1605.17, pointsAgainst: 1665.63, playoff: false },
                { rank: 6, teamName: "Fresh Prince Helaire", record: "7-7-0", pointsFor: 1580.41, pointsAgainst: 1585.62, playoff: false },
                { rank: 7, teamName: "Mr. Big Chest", record: "6-8-0", pointsFor: 1636.42, pointsAgainst: 1626.19, playoff: false },
                { rank: 8, teamName: "Team IR", record: "6-8-0", pointsFor: 1563.37, pointsAgainst: 1708.97, playoff: false },
                { rank: 9, teamName: "Failed to fail for27", record: "6-8-0", pointsFor: 1553.26, pointsAgainst: 1656.89, playoff: false },
                { rank: 10, teamName: "Outta Luck", record: "2-12-0", pointsFor: 1544.52, pointsAgainst: 1916.20, playoff: false }
            ],
            '2020': [
                { rank: 1, teamName: "Hazed and Confused", record: "12-2-0", pointsFor: 1994.25, pointsAgainst: 1572.00, playoff: true },
                { rank: 2, teamName: "Spider 2 Y Banana", record: "11-3-0", pointsFor: 1987.32, pointsAgainst: 1589.20, playoff: true },
                { rank: 3, teamName: "Suk 4 Saquan", record: "10-4-0", pointsFor: 1731.94, pointsAgainst: 1726.67, playoff: true },
                { rank: 4, teamName: "Cooper Troopers", record: "8-6-0", pointsFor: 1679.00, pointsAgainst: 1575.29, playoff: true },
                { rank: 5, teamName: "Ciroc Boys", record: "6-8-0", pointsFor: 1605.17, pointsAgainst: 1665.63, playoff: false },
                { rank: 6, teamName: "Fresh Prince Helaire", record: "7-7-0", pointsFor: 1580.41, pointsAgainst: 1585.62, playoff: false },
                { rank: 7, teamName: "Mr. Big Chest", record: "6-8-0", pointsFor: 1636.42, pointsAgainst: 1626.19, playoff: false },
                { rank: 8, teamName: "Team IR", record: "6-8-0", pointsFor: 1563.37, pointsAgainst: 1708.97, playoff: false },
                { rank: 9, teamName: "Failed to fail for27", record: "6-8-0", pointsFor: 1553.26, pointsAgainst: 1656.89, playoff: false },
                { rank: 10, teamName: "Outta Luck", record: "2-12-0", pointsFor: 1544.52, pointsAgainst: 1916.20, playoff: false }
            ],
            '2019': [
                { rank: 1, teamName: "Hazed and Confused", record: "12-2-0", pointsFor: 1994.25, pointsAgainst: 1572.00, playoff: true },
                { rank: 2, teamName: "Spider 2 Y Banana", record: "11-3-0", pointsFor: 1987.32, pointsAgainst: 1589.20, playoff: true },
                { rank: 3, teamName: "Suk 4 Saquan", record: "10-4-0", pointsFor: 1731.94, pointsAgainst: 1726.67, playoff: true },
                { rank: 4, teamName: "Cooper Troopers", record: "8-6-0", pointsFor: 1679.00, pointsAgainst: 1575.29, playoff: true },
                { rank: 5, teamName: "Ciroc Boys", record: "6-8-0", pointsFor: 1605.17, pointsAgainst: 1665.63, playoff: false },
                { rank: 6, teamName: "Fresh Prince Helaire", record: "7-7-0", pointsFor: 1580.41, pointsAgainst: 1585.62, playoff: false },
                { rank: 7, teamName: "Mr. Big Chest", record: "6-8-0", pointsFor: 1636.42, pointsAgainst: 1626.19, playoff: false },
                { rank: 8, teamName: "Team IR", record: "6-8-0", pointsFor: 1563.37, pointsAgainst: 1708.97, playoff: false },
                { rank: 9, teamName: "Failed to fail for27", record: "6-8-0", pointsFor: 1553.26, pointsAgainst: 1656.89, playoff: false },
                { rank: 10, teamName: "Outta Luck", record: "2-12-0", pointsFor: 1544.52, pointsAgainst: 1916.20, playoff: false }
            ],
            '2018': [
                { rank: 1, teamName: "Hazed and Confused", record: "12-2-0", pointsFor: 1994.25, pointsAgainst: 1572.00, playoff: true },
                { rank: 2, teamName: "Spider 2 Y Banana", record: "11-3-0", pointsFor: 1987.32, pointsAgainst: 1589.20, playoff: true },
                { rank: 3, teamName: "Suk 4 Saquan", record: "10-4-0", pointsFor: 1731.94, pointsAgainst: 1726.67, playoff: true },
                { rank: 4, teamName: "Cooper Troopers", record: "8-6-0", pointsFor: 1679.00, pointsAgainst: 1575.29, playoff: true },
                { rank: 5, teamName: "Ciroc Boys", record: "6-8-0", pointsFor: 1605.17, pointsAgainst: 1665.63, playoff: false },
                { rank: 6, teamName: "Fresh Prince Helaire", record: "7-7-0", pointsFor: 1580.41, pointsAgainst: 1585.62, playoff: false },
                { rank: 7, teamName: "Mr. Big Chest", record: "6-8-0", pointsFor: 1636.42, pointsAgainst: 1626.19, playoff: false },
                { rank: 8, teamName: "Team IR", record: "6-8-0", pointsFor: 1563.37, pointsAgainst: 1708.97, playoff: false },
                { rank: 9, teamName: "Failed to fail for27", record: "6-8-0", pointsFor: 1553.26, pointsAgainst: 1656.89, playoff: false },
                { rank: 10, teamName: "Outta Luck", record: "2-12-0", pointsFor: 1544.52, pointsAgainst: 1916.20, playoff: false }
            ],
            '2017': [
                { rank: 1, teamName: "Hazed and Confused", record: "12-2-0", pointsFor: 1994.25, pointsAgainst: 1572.00, playoff: true },
                { rank: 2, teamName: "Spider 2 Y Banana", record: "11-3-0", pointsFor: 1987.32, pointsAgainst: 1589.20, playoff: true },
                { rank: 3, teamName: "Suk 4 Saquan", record: "10-4-0", pointsFor: 1731.94, pointsAgainst: 1726.67, playoff: true },
                { rank: 4, teamName: "Cooper Troopers", record: "8-6-0", pointsFor: 1679.00, pointsAgainst: 1575.29, playoff: true },
                { rank: 5, teamName: "Ciroc Boys", record: "6-8-0", pointsFor: 1605.17, pointsAgainst: 1665.63, playoff: false },
                { rank: 6, teamName: "Fresh Prince Helaire", record: "7-7-0", pointsFor: 1580.41, pointsAgainst: 1585.62, playoff: false },
                { rank: 7, teamName: "Mr. Big Chest", record: "6-8-0", pointsFor: 1636.42, pointsAgainst: 1626.19, playoff: false },
                { rank: 8, teamName: "Team IR", record: "6-8-0", pointsFor: 1563.37, pointsAgainst: 1708.97, playoff: false },
                { rank: 9, teamName: "Failed to fail for27", record: "6-8-0", pointsFor: 1553.26, pointsAgainst: 1656.89, playoff: false },
                { rank: 10, teamName: "Outta Luck", record: "2-12-0", pointsFor: 1544.52, pointsAgainst: 1916.20, playoff: false }
            ],
            '2016': [
                { rank: 1, teamName: "Hazed and Confused", record: "12-2-0", pointsFor: 1994.25, pointsAgainst: 1572.00, playoff: true },
                { rank: 2, teamName: "Spider 2 Y Banana", record: "11-3-0", pointsFor: 1987.32, pointsAgainst: 1589.20, playoff: true },
                { rank: 3, teamName: "Suk 4 Saquan", record: "10-4-0", pointsFor: 1731.94, pointsAgainst: 1726.67, playoff: true },
                { rank: 4, teamName: "Cooper Troopers", record: "8-6-0", pointsFor: 1679.00, pointsAgainst: 1575.29, playoff: true },
                { rank: 5, teamName: "Ciroc Boys", record: "6-8-0", pointsFor: 1605.17, pointsAgainst: 1665.63, playoff: false },
                { rank: 6, teamName: "Fresh Prince Helaire", record: "7-7-0", pointsFor: 1580.41, pointsAgainst: 1585.62, playoff: false },
                { rank: 7, teamName: "Mr. Big Chest", record: "6-8-0", pointsFor: 1636.42, pointsAgainst: 1626.19, playoff: false },
                { rank: 8, teamName: "Team IR", record: "6-8-0", pointsFor: 1563.37, pointsAgainst: 1708.97, playoff: false },
                { rank: 9, teamName: "Failed to fail for27", record: "6-8-0", pointsFor: 1553.26, pointsAgainst: 1656.89, playoff: false },
                { rank: 10, teamName: "Outta Luck", record: "2-12-0", pointsFor: 1544.52, pointsAgainst: 1916.20, playoff: false }
            ],
            '2015': [
                { rank: 1, teamName: "skittles.", record: "12-2-0", pointsFor: 1994.25, pointsAgainst: 1572.00, playoff: true },
                { rank: 2, teamName: "Forte year old virgn", record: "10-4-0", pointsFor: 1731.32, pointsAgainst: 1589.20, playoff: true },
                { rank: 3, teamName: "Call Me The Brees", record: "7-7-0", pointsFor: 1734.94, pointsAgainst: 1726.67, playoff: true },
                { rank: 4, teamName: "Rob s Rad Team", record: "8-6-0", pointsFor: 1679.00, pointsAgainst: 1575.29, playoff: true },
                { rank: 5, teamName: "Ol' Dirty Beckham", record: "6-8-0", pointsFor: 1605.17, pointsAgainst: 1665.63, playoff: false },
                { rank: 6, teamName: "Ciroc Boys", record: "7-7-0", pointsFor: 1580.41, pointsAgainst: 1585.62, playoff: false },
                { rank: 7, teamName: "Spider 2 Y Banana", record: "6-8-0", pointsFor: 1636.42, pointsAgainst: 1626.19, playoff: false },
                { rank: 8, teamName: "Hazed and Confused", record: "6-8-0", pointsFor: 1563.37, pointsAgainst: 1708.97, playoff: false },
                { rank: 9, teamName: "The SPARQ Specimens", record: "6-8-0", pointsFor: 1553.26, pointsAgainst: 1656.89, playoff: false },
                { rank: 10, teamName: "Fail for Fournette", record: "2-12-0", pointsFor: 1544.52, pointsAgainst: 1916.20, playoff: false }
            ],
            '2014': [
                { rank: 1, teamName: "skittles.", record: "10-4-0", pointsFor: 2033.15, pointsAgainst: 1778.69, playoff: true },
                { rank: 2, teamName: "Call Me The Brees", record: "11-3-0", pointsFor: 1917.15, pointsAgainst: 1668.20, playoff: true },
                { rank: 3, teamName: "Forte year old virgn", record: "10-4-0", pointsFor: 1817.43, pointsAgainst: 1573.21, playoff: true },
                { rank: 4, teamName: "4th and 9 Inches", record: "7-7-0", pointsFor: 1551.16, pointsAgainst: 1774.16, playoff: true },
                { rank: 5, teamName: "Ciroc Boys", record: "6-8-0", pointsFor: 1599.38, pointsAgainst: 1663.44, playoff: false },
                { rank: 6, teamName: "OrangeDaNewBlackmon", record: "6-8-0", pointsFor: 1645.66, pointsAgainst: 1654.09, playoff: false },
                { rank: 7, teamName: "Rob s Rad Team", record: "6-8-0", pointsFor: 1542.60, pointsAgainst: 1656.10, playoff: false },
                { rank: 8, teamName: "Dan's Dandy Team", record: "6-8-0", pointsFor: 1623.15, pointsAgainst: 1698.28, playoff: false },
                { rank: 9, teamName: "Man Among Boys", record: "4-10-0", pointsFor: 1587.41, pointsAgainst: 1687.64, playoff: false },
                { rank: 10, teamName: "Spider 2 Y Banana", record: "4-10-0", pointsFor: 1580.14, pointsAgainst: 1743.42, playoff: false }
            ],
            '2013': [
                { rank: 1, teamName: "ICameISawIGronkered", record: "9-5-0", pointsFor: 1725.03, pointsAgainst: 1494.70, playoff: true },
                { rank: 2, teamName: "Forte year old virgn", record: "10-4-0", pointsFor: 1823.61, pointsAgainst: 1598.82, playoff: true },
                { rank: 3, teamName: "skittles.", record: "9-5-0", pointsFor: 1741.12, pointsAgainst: 1669.29, playoff: true },
                { rank: 4, teamName: "Billy Cauley's Team", record: "7-7-0", pointsFor: 1783.20, pointsAgainst: 1795.85, playoff: true },
                { rank: 5, teamName: "Dan's Dandy Team", record: "6-8-0", pointsFor: 1812.00, pointsAgainst: 1839.85, playoff: false },
                { rank: 6, teamName: "Tom Terrific", record: "7-7-0", pointsFor: 1701.50, pointsAgainst: 1559.31, playoff: false },
                { rank: 7, teamName: "Joseph's Primo Team", record: "7-7-0", pointsFor: 1568.33, pointsAgainst: 1667.39, playoff: false },
                { rank: 8, teamName: "The Big Gronkowski", record: "6-8-0", pointsFor: 1553.82, pointsAgainst: 1534.28, playoff: false },
                { rank: 9, teamName: "Rob s Rad Team", record: "5-9-0", pointsFor: 1444.32, pointsAgainst: 1738.93, playoff: false },
                { rank: 10, teamName: "Richie's Team", record: "4-10-0", pointsFor: 1595.04, pointsAgainst: 1849.55, playoff: false }
            ]
        };
    }

    renderDashboard() {
        this.updateStats();
        this.renderTable();
        this.renderSeasonTable();
        this.toggleEmptyState();
    }

    setupSeasonSelector() {
        const seasonSelect = document.getElementById('season-select');
        if (seasonSelect) {
            seasonSelect.value = this.currentSeason;
            seasonSelect.addEventListener('change', (e) => {
                this.currentSeason = e.target.value;
                this.renderSeasonTable();
            });
        }
    }

    renderSeasonTable() {
        const tableBody = document.getElementById('season-table-body');
        const emptyState = document.getElementById('season-empty-state');
        const tableContainer = document.querySelector('.season-table').closest('.table-container');
        
        if (!tableBody) return;

        tableBody.innerHTML = '';

        const seasonData = this.seasonData[this.currentSeason];
        
        if (!seasonData || seasonData.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            if (tableContainer) tableContainer.style.display = 'none';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (tableContainer) tableContainer.style.display = 'block';

        seasonData.forEach((team) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${team.rank}</td>
                <td>${team.teamName}</td>
                <td>${team.record}</td>
                <td>${team.pointsFor.toFixed(2)}</td>
                <td>${team.pointsAgainst.toFixed(2)}</td>
                <td class="${team.playoff ? 'playoff-yes' : 'playoff-no'}">${team.playoff ? 'Yes' : 'No'}</td>
            `;
            if (team.playoff) {
                row.classList.add('playoff-team');
            }
            tableBody.appendChild(row);
        });
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
            row.innerHTML = `
                <td>${team.rank}</td>
                <td>${team.manager}</td>
                <td>${team.teamName}</td>
                <td>${team.totalWins}-${team.totalLosses}-${team.totalTies}</td>
                <td>${team.totalPointsFor.toFixed(2)}</td>
                <td>${team.playoffAppearances}</td>
                <td>${team.gold}</td>
                <td>${team.silver}</td>
                <td>${team.bronze}</td>
                <td>${team.bestFinish}</td>
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