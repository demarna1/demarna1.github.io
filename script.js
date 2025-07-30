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
        // Combined 2013-2022 Fantasy Football League Data
        this.leagueData = [
            {
                teamName: "Hazed and Confused",
                totalWins: 62,
                totalLosses: 52,
                totalTies: 0,
                totalPointsFor: 14642.58,
                totalPointsAgainst: 13786.09,
                playoffAppearances: 5,
                gold: 2,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1830.32
            },
            {
                teamName: "Spider 2 Y Banana",
                totalWins: 63,
                totalLosses: 65,
                totalTies: 0,
                totalPointsFor: 14843.44,
                totalPointsAgainst: 14975.60,
                playoffAppearances: 5,
                gold: 1,
                silver: 1,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1657.91
            },
            {
                teamName: "Ciroc Boys",
                totalWins: 61,
                totalLosses: 67,
                totalTies: 0,
                totalPointsFor: 14881.37,
                totalPointsAgainst: 15039.84,
                playoffAppearances: 4,
                gold: 0,
                silver: 1,
                bronze: 0,
                bestFinish: 2,
                avgPointsPerGame: 1657.91
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
                teamName: "skittles.",
                totalWins: 56,
                totalLosses: 28,
                totalTies: 0,
                totalPointsFor: 11272.64,
                totalPointsAgainst: 10002.62,
                playoffAppearances: 6,
                gold: 3,
                silver: 1,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1878.77
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
                teamName: "Call Me The Brees",
                totalWins: 46,
                totalLosses: 33,
                totalTies: 0,
                totalPointsFor: 8717.41,
                totalPointsAgainst: 8609.30,
                playoffAppearances: 3,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 2,
                avgPointsPerGame: 1743.48
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
                teamName: "Forte year old virgn",
                totalWins: 38,
                totalLosses: 18,
                totalTies: 0,
                totalPointsFor: 7092.60,
                totalPointsAgainst: 6369.99,
                playoffAppearances: 4,
                gold: 1,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1773.15
            },
            {
                teamName: "Rob s Rad Team",
                totalWins: 27,
                totalLosses: 29,
                totalTies: 0,
                totalPointsFor: 6366.52,
                totalPointsAgainst: 6626.20,
                playoffAppearances: 2,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 3,
                avgPointsPerGame: 1697.74
            },
            {
                teamName: "Fail for Fournette",
                totalWins: 9,
                totalLosses: 19,
                totalTies: 0,
                totalPointsFor: 3121.99,
                totalPointsAgainst: 3563.65,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 6,
                avgPointsPerGame: 1561.00
            },
            {
                teamName: "Just Gurley Things",
                totalWins: 6,
                totalLosses: 8,
                totalTies: 0,
                totalPointsFor: 1563.40,
                totalPointsAgainst: 1543.46,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 7,
                avgPointsPerGame: 1563.40
            },
            {
                teamName: "The SPARQ Specimens",
                totalWins: 11,
                totalLosses: 17,
                totalTies: 0,
                totalPointsFor: 3084.54,
                totalPointsAgainst: 3304.87,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 5,
                avgPointsPerGame: 1542.27
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
            },
            {
                teamName: "Ol' Dirty Beckham",
                totalWins: 6,
                totalLosses: 8,
                totalTies: 0,
                totalPointsFor: 1605.17,
                totalPointsAgainst: 1665.63,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 5,
                avgPointsPerGame: 1605.17
            },
            {
                teamName: "4th and 9 Inches",
                totalWins: 7,
                totalLosses: 7,
                totalTies: 0,
                totalPointsFor: 1551.16,
                totalPointsAgainst: 1774.16,
                playoffAppearances: 1,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 4,
                avgPointsPerGame: 1551.16
            },
            {
                teamName: "OrangeDaNewBlackmon",
                totalWins: 6,
                totalLosses: 8,
                totalTies: 0,
                totalPointsFor: 1645.66,
                totalPointsAgainst: 1654.09,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 6,
                avgPointsPerGame: 1645.66
            },
            {
                teamName: "Dan's Dandy Team",
                totalWins: 12,
                totalLosses: 16,
                totalTies: 0,
                totalPointsFor: 3435.15,
                totalPointsAgainst: 3538.13,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 5,
                avgPointsPerGame: 1717.58
            },
            {
                teamName: "Man Among Boys",
                totalWins: 4,
                totalLosses: 10,
                totalTies: 0,
                totalPointsFor: 1587.41,
                totalPointsAgainst: 1687.64,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 9,
                avgPointsPerGame: 1587.41
            },
            {
                teamName: "ICameISawIGronkered",
                totalWins: 9,
                totalLosses: 5,
                totalTies: 0,
                totalPointsFor: 1725.03,
                totalPointsAgainst: 1494.70,
                playoffAppearances: 1,
                gold: 1,
                silver: 0,
                bronze: 0,
                bestFinish: 1,
                avgPointsPerGame: 1725.03
            },
            {
                teamName: "Billy Cauley's Team",
                totalWins: 7,
                totalLosses: 7,
                totalTies: 0,
                totalPointsFor: 1783.20,
                totalPointsAgainst: 1795.85,
                playoffAppearances: 1,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 4,
                avgPointsPerGame: 1783.20
            },
            {
                teamName: "Tom Terrific",
                totalWins: 7,
                totalLosses: 7,
                totalTies: 0,
                totalPointsFor: 1701.50,
                totalPointsAgainst: 1559.31,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 6,
                avgPointsPerGame: 1701.50
            },
            {
                teamName: "Joseph's Primo Team",
                totalWins: 7,
                totalLosses: 7,
                totalTies: 0,
                totalPointsFor: 1568.33,
                totalPointsAgainst: 1667.39,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 7,
                avgPointsPerGame: 1568.33
            },
            {
                teamName: "The Big Gronkowski",
                totalWins: 6,
                totalLosses: 8,
                totalTies: 0,
                totalPointsFor: 1553.82,
                totalPointsAgainst: 1534.28,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 8,
                avgPointsPerGame: 1553.82
            },
            {
                teamName: "Richie's Team",
                totalWins: 4,
                totalLosses: 10,
                totalTies: 0,
                totalPointsFor: 1595.04,
                totalPointsAgainst: 1849.55,
                playoffAppearances: 0,
                gold: 0,
                silver: 0,
                bronze: 0,
                bestFinish: 10,
                avgPointsPerGame: 1595.04
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