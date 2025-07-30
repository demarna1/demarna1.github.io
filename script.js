// Fantasy Football League Dashboard JavaScript

class FantasyLeagueDashboard {
    constructor() {
        this.leagueData = [];
        this.seasonData = {};
        this.currentSeason = '2024';
    }

    init() {
        this.loadSeasonData();
        this.loadData();
        this.renderDashboard();
        this.setupSeasonSelector();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
            this.setupSorting();
            this.setupModalEventListeners();
        });
    }

    setupSorting() {
        const sortableHeaders = document.querySelectorAll('.sortable');
        sortableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortField = header.getAttribute('data-sort');
                this.sortData(sortField);
            });
        });
        
        // Set default sort indicator for Total Medals
        const totalMedalsHeader = document.querySelector('[data-sort="totalMedals"]');
        if (totalMedalsHeader) {
            totalMedalsHeader.classList.add('sort-desc');
        }
    }

    sortData(sortField) {
        const sortableHeaders = document.querySelectorAll('.sortable');
        
        // Remove existing sort indicators
        sortableHeaders.forEach(header => {
            header.classList.remove('sort-asc', 'sort-desc');
        });
        
        // Determine sort direction - default to descending except for manager name
        const currentHeader = document.querySelector(`[data-sort="${sortField}"]`);
        const isCurrentlyAscending = currentHeader.classList.contains('sort-asc');
        const isCurrentlyDescending = currentHeader.classList.contains('sort-desc');
        
        let isAscending;
        if (sortField === 'manager') {
            // Manager defaults to ascending (alphabetical)
            isAscending = !isCurrentlyAscending;
        } else {
            // All other columns default to descending
            isAscending = isCurrentlyDescending;
        }
        
        // Add sort indicator
        currentHeader.classList.add(isAscending ? 'sort-asc' : 'sort-desc');
        
        // Sort the data
        this.leagueData.sort((a, b) => {
            let aVal, bVal;
            
            switch(sortField) {
                case 'rank':
                    aVal = a.rank;
                    bVal = b.rank;
                    break;
                case 'manager':
                    aVal = a.manager.toLowerCase();
                    bVal = b.manager.toLowerCase();
                    break;
                case 'record':
                    aVal = a.totalWins;
                    bVal = b.totalWins;
                    break;
                case 'avgPointsFor':
                    aVal = parseFloat(a.avgPointsFor);
                    bVal = parseFloat(b.avgPointsFor);
                    break;
                case 'playoffAppearances':
                    aVal = a.playoffAppearances;
                    bVal = b.playoffAppearances;
                    break;
                case 'gold':
                    aVal = a.gold;
                    bVal = b.gold;
                    break;
                case 'silver':
                    aVal = a.silver;
                    bVal = b.silver;
                    break;
                case 'bronze':
                    aVal = a.bronze;
                    bVal = b.bronze;
                    break;
                case 'totalMedals':
                    aVal = a.totalMedals;
                    bVal = b.totalMedals;
                    break;
                default:
                    aVal = a.rank;
                    bVal = b.rank;
            }
            
            if (aVal < bVal) return isAscending ? -1 : 1;
            if (aVal > bVal) return isAscending ? 1 : -1;
            return 0;
        });
        
        // Update ranks after sorting
        this.leagueData.forEach((team, index) => {
            team.rank = index + 1;
        });
        
        // Re-render the table
        this.renderTable();
    }

    loadData() {
        // Calculate aggregated statistics from seasonal data
        const managerStats = {};
        
        // Process all seasons
        Object.keys(this.seasonData).forEach(year => {
            this.seasonData[year].forEach(team => {
                const manager = team.manager;
                if (!managerStats[manager]) {
                    managerStats[manager] = {
                        manager: manager,
                        totalWins: 0,
                        totalLosses: 0,
                        totalTies: 0,
                        totalPointsFor: 0,
                        totalPointsAgainst: 0,
                        playoffAppearances: 0,
                        gold: 0,
                        silver: 0,
                        bronze: 0,
                        bestFinish: 999,
                        teamNames: new Set(),
                        seasonResults: [] // Track individual season results for dynasty calculation
                    };
                }
                
                // Parse record (e.g., "11-3-0" -> wins: 11, losses: 3, ties: 0)
                const [wins, losses, ties] = team.record.split('-').map(Number);
                managerStats[manager].totalWins += wins;
                managerStats[manager].totalLosses += losses;
                managerStats[manager].totalTies += ties;
                
                // Add points
                managerStats[manager].totalPointsFor += team.pointsFor;
                managerStats[manager].totalPointsAgainst += team.pointsAgainst;
                
                // Count playoff appearances
                if (team.playoff) {
                    managerStats[manager].playoffAppearances++;
                }
                
                // Count medals based on rank
                if (team.rank === 1) {
                    managerStats[manager].gold++;
                } else if (team.rank === 2) {
                    managerStats[manager].silver++;
                } else if (team.rank === 3) {
                    managerStats[manager].bronze++;
                }
                
                // Track best finish
                if (team.rank < managerStats[manager].bestFinish) {
                    managerStats[manager].bestFinish = team.rank;
                }
                
                // Track team names
                managerStats[manager].teamNames.add(team.teamName);
                
                // Track season results for dynasty calculation
                managerStats[manager].seasonResults.push({
                    year: parseInt(year),
                    rank: team.rank,
                    points: team.rank === 1 ? 3 : team.rank === 2 ? 2 : team.rank === 3 ? 1 : 0
                });
            });
        });
        
        // Convert to array and calculate additional stats
        this.leagueData = Object.values(managerStats).map(stats => {
            const totalGames = stats.totalWins + stats.totalLosses + stats.totalTies;
            const totalMedals = stats.gold + stats.silver + stats.bronze;
            const avgPointsPerGame = totalGames > 0 ? (stats.totalPointsFor / totalGames).toFixed(2) : 0;
            
            // Calculate dynasty spans
            const dynastySpans = this.calculateDynastySpans(stats.seasonResults);
            
            // Get most recent team name (last one in the set)
            const teamNames = Array.from(stats.teamNames);
            const mostRecentTeam = teamNames[teamNames.length - 1];
            
            return {
                manager: stats.manager,
                teamName: mostRecentTeam,
                totalWins: stats.totalWins,
                totalLosses: stats.totalLosses,
                totalTies: stats.totalTies,
                totalPointsFor: stats.totalPointsFor,
                totalPointsAgainst: stats.totalPointsAgainst,
                playoffAppearances: stats.playoffAppearances,
                gold: stats.gold,
                silver: stats.silver,
                bronze: stats.bronze,
                bestFinish: stats.bestFinish === 999 ? 0 : stats.bestFinish,
                avgPointsFor: parseFloat(avgPointsPerGame),
                totalMedals: totalMedals,
                dynastySpans: dynastySpans,
                hasDynasty: dynastySpans.length > 0
            };
        });
        
        // Sort by total medals (descending) by default
        this.leagueData.sort((a, b) => b.totalMedals - a.totalMedals);
        
        // Add rank after sorting
        this.leagueData.forEach((team, index) => {
            team.rank = index + 1;
        });
    }

    calculateDynastySpans(seasonResults) {
        const spans = [];
        const years = seasonResults.map(r => r.year).sort((a, b) => a - b);
        
        // Check each possible 4-year window
        for (let i = 0; i <= years.length - 4; i++) {
            const windowYears = years.slice(i, i + 4);
            let totalPoints = 0;
            const windowResults = [];
            
            // Calculate total points for this 4-year window
            windowYears.forEach(year => {
                const result = seasonResults.find(r => r.year === year);
                if (result) {
                    totalPoints += result.points;
                    windowResults.push(result);
                }
            });
            
            // If total points >= 6, this is a dynasty span
            if (totalPoints >= 6) {
                spans.push({
                    startYear: windowYears[0],
                    endYear: windowYears[3],
                    totalPoints: totalPoints,
                    years: windowYears,
                    results: windowResults
                });
            }
        }
        
        // Merge overlapping spans
        return this.mergeOverlappingSpans(spans);
    }

    mergeOverlappingSpans(spans) {
        if (spans.length <= 1) {
            return spans;
        }
        
        // Sort spans by start year
        spans.sort((a, b) => a.startYear - b.startYear);
        
        const mergedSpans = [];
        let currentSpan = { ...spans[0] };
        
        for (let i = 1; i < spans.length; i++) {
            const nextSpan = spans[i];
            
            // Check if spans overlap or are adjacent
            if (nextSpan.startYear <= currentSpan.endYear + 1) {
                // Merge the spans
                currentSpan.endYear = Math.max(currentSpan.endYear, nextSpan.endYear);
                currentSpan.totalPoints = Math.max(currentSpan.totalPoints, nextSpan.totalPoints);
                
                // Merge years and results
                const allYears = [...new Set([...currentSpan.years, ...nextSpan.years])].sort((a, b) => a - b);
                const allResults = [...currentSpan.results, ...nextSpan.results];
                
                // Remove duplicates from results
                const uniqueResults = [];
                const seenYears = new Set();
                allResults.forEach(result => {
                    if (!seenYears.has(result.year)) {
                        seenYears.add(result.year);
                        uniqueResults.push(result);
                    }
                });
                
                currentSpan.years = allYears;
                currentSpan.results = uniqueResults.sort((a, b) => a.year - b.year);
            } else {
                // No overlap, add current span and start new one
                mergedSpans.push(currentSpan);
                currentSpan = { ...nextSpan };
            }
        }
        
        // Add the last span
        mergedSpans.push(currentSpan);
        
        return mergedSpans;
    }

    showDynastySpans(manager) {
        const team = this.leagueData.find(t => t.manager === manager);
        if (!team || !team.dynastySpans || team.dynastySpans.length === 0) {
            alert('No dynasty spans found for this manager.');
            return;
        }

        const modal = document.getElementById('dynasty-modal');
        const modalTitle = document.getElementById('dynasty-modal-title');
        const modalBody = document.getElementById('dynasty-modal-body');

        // Set the title
        modalTitle.textContent = `${manager}'s Dynasty Spans`;

        // Build the content
        let content = '';
        team.dynastySpans.forEach((span, index) => {
            // Filter results to only include years where medals were won (points > 0)
            const medalResults = span.results.filter(r => r.points > 0);
            const medalYears = medalResults.map(r => r.year).sort((a, b) => a - b);
            
            // Calculate the actual span based on medal years only
            const actualStartYear = Math.min(...medalYears);
            const actualEndYear = Math.max(...medalYears);
            
            content += `
                <div class="dynasty-span">
                    <h4>Dynasty ${index + 1}: ${actualStartYear}-${actualEndYear}</h4>
                    <div class="dynasty-results">
                        <strong>Results:</strong> ${medalResults.map(r => {
                            const medal = r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : '🥉';
                            return `${r.year} ${medal}`;
                        }).join(', ')}
                    </div>
                </div>
            `;
        });

        modalBody.innerHTML = content;
        modal.style.display = 'block';
    }

    setupModalEventListeners() {
        const modal = document.getElementById('dynasty-modal');
        const closeBtn = document.querySelector('.close');

        // Close modal when clicking the X button
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    loadSeasonData() {
        // Individual season data for 2013-2024
        this.seasonData = {
            '2024': [
                { rank: 1, teamName: "Team Kertsmar", manager: "Ryan Jones", record: "11-3-0", pointsFor: 1804.74, pointsAgainst: 1550.1, playoff: true },
                { rank: 2, teamName: "Dynasty Dreaming", manager: "Chris Gramley", record: "9-5-0", pointsFor: 1852.86, pointsAgainst: 1647.18, playoff: true },
                { rank: 3, teamName: "Billy432", manager: "Billy Cauley", record: "10-4-0", pointsFor: 1947.34, pointsAgainst: 1670.22, playoff: true },
                { rank: 4, teamName: "Daniels' Team of Destiny", manager: "Ben Gingold", record: "11-3-0", pointsFor: 1812.4, pointsAgainst: 1585.38, playoff: true },
                { rank: 5, teamName: "morrich13", manager: "Richie Morris", record: "8-6-0", pointsFor: 1767.28, pointsAgainst: 1696.02, playoff: true },
                { rank: 6, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "7-7-0", pointsFor: 1508.3, pointsAgainst: 1614.64, playoff: true },
                { rank: 7, teamName: "Asstronaut", manager: "Noah DeMarco", record: "6-8-0", pointsFor: 1595.4, pointsAgainst: 1701.06, playoff: false },
                { rank: 8, teamName: "PlayBoys", manager: "John Adam Benson", record: "4-10-0", pointsFor: 1634.22, pointsAgainst: 1734.68, playoff: false },
                { rank: 9, teamName: "Ryan's Team", manager: "Seth Sauder", record: "4-10-0", pointsFor: 1465.56, pointsAgainst: 1629.86, playoff: false },
                { rank: 10, teamName: "Basically a bye week", manager: "Rob Murray", record: "0-14-0", pointsFor: 1246.0, pointsAgainst: 1804.96, playoff: false }
            ],
            '2023': [
                { rank: 1, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "9-5-0", pointsFor: 1870.72, pointsAgainst: 1612.7, playoff: true },
                { rank: 2, teamName: "PlayBoys", manager: "John Adam Benson", record: "8-6-0", pointsFor: 1777.46, pointsAgainst: 1734.78, playoff: true },
                { rank: 3, teamName: "Micro Bulk LLC", manager: "Ryan Jones", record: "9-5-0", pointsFor: 1819.4, pointsAgainst: 1648.68, playoff: true },
                { rank: 4, teamName: "Dynasty Dreaming", manager: "Chris Gramley", record: "12-2-0", pointsFor: 1848.52, pointsAgainst: 1554.5, playoff: true },
                { rank: 5, teamName: "Billy432", manager: "Billy Cauley", record: "8-6-0", pointsFor: 1703.5, pointsAgainst: 1686.28, playoff: true },
                { rank: 6, teamName: "morrich13", manager: "Richie Morris", record: "8-6-0", pointsFor: 1641.56, pointsAgainst: 1593.08, playoff: true },
                { rank: 7, teamName: "NYJ Super Bowl 58 Champs", manager: "Ben Gingold", record: "6-8-0", pointsFor: 1620.64, pointsAgainst: 1701.14, playoff: false },
                { rank: 8, teamName: "RobMurray1990", manager: "Rob Murray", record: "5-9-0", pointsFor: 1487.6, pointsAgainst: 1811.4, playoff: false },
                { rank: 9, teamName: "Justice for Dom", manager: "Seth Sauder", record: "4-10-0", pointsFor: 1499.3, pointsAgainst: 1602.18, playoff: false },
                { rank: 10, teamName: "Asstronaut", manager: "Noah DeMarco", record: "1-13-0", pointsFor: 1356.22, pointsAgainst: 1680.18, playoff: false }
            ],
            '2022': [
                { rank: 1, teamName: "Hazed and Confused", manager: "Chris Gramley", record: "11-4-0", pointsFor: 2126.21, pointsAgainst: 1779.70, playoff: true },
                { rank: 2, teamName: "PlayBoys", manager: "John Adam Benson", record: "14-1-0", pointsFor: 2016.20, pointsAgainst: 1569.41, playoff: true },
                { rank: 3, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "8-7-0", pointsFor: 1785.42, pointsAgainst: 1778.82, playoff: true },
                { rank: 4, teamName: "Team IR", manager: "Danny Boileau", record: "10-5-0", pointsFor: 1955.64, pointsAgainst: 1830.14, playoff: true },
                { rank: 5, teamName: "The CeeDee Players", manager: "Ben Gingold", record: "7-8-0", pointsFor: 1551.94, pointsAgainst: 1688.51, playoff: false },
                { rank: 6, teamName: "Fresh Prince Helaire", manager: "Ryan Jones", record: "7-8-0", pointsFor: 1734.08, pointsAgainst: 1775.45, playoff: false },
                { rank: 7, teamName: "Cooper Troopers", manager: "Rob Murray", record: "6-9-0", pointsFor: 1636.88, pointsAgainst: 1711.10, playoff: false },
                { rank: 8, teamName: "Suspension == IR", manager: "Danny Boileau", record: "4-11-0", pointsFor: 1703.47, pointsAgainst: 1899.71, playoff: false },
                { rank: 9, teamName: "Mr. Big Chest", manager: "Noah DeMarco", record: "4-11-0", pointsFor: 1670.96, pointsAgainst: 1960.44, playoff: false },
                { rank: 10, teamName: "Ciroc Boys", manager: "Richie Morris", record: "4-11-0", pointsFor: 1619.68, pointsAgainst: 1807.20, playoff: false }
            ],
            '2021': [
                { rank: 1, teamName: "Fresh Prince Helaire", manager: "Ryan Jones", record: "12-3-0", pointsFor: 2157.28, pointsAgainst: 1772.81, playoff: true },
                { rank: 2, teamName: "Suk 4 Saquan", manager: "John Adam Benson", record: "10-5-0", pointsFor: 1861.80, pointsAgainst: 1666.34, playoff: true },
                { rank: 3, teamName: "Hazed and Confused", manager: "Chris Gramley", record: "9-6-0", pointsFor: 2116.16, pointsAgainst: 1879.19, playoff: true },
                { rank: 4, teamName: "Ciroc Boys", manager: "Richie Morris", record: "8-7-0", pointsFor: 1859.82, pointsAgainst: 1757.83, playoff: true },
                { rank: 5, teamName: "Mr. Big Chest", manager: "Noah DeMarco", record: "8-7-0", pointsFor: 1792.06, pointsAgainst: 1807.97, playoff: false },
                { rank: 6, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "7-8-0", pointsFor: 1703.61, pointsAgainst: 1846.34, playoff: false },
                { rank: 7, teamName: "The CeeDee Players", manager: "Ben Gingold", record: "7-8-0", pointsFor: 1690.54, pointsAgainst: 1786.14, playoff: false },
                { rank: 8, teamName: "Team IR", manager: "Danny Boileau", record: "5-10-0", pointsFor: 1656.06, pointsAgainst: 1804.31, playoff: false },
                { rank: 9, teamName: "Cooper Troopers", manager: "Rob Murray", record: "5-10-0", pointsFor: 1547.59, pointsAgainst: 1844.96, playoff: false },
                { rank: 10, teamName: "Outta Luck", manager: "Billy Cauley", record: "4-11-0", pointsFor: 1562.31, pointsAgainst: 1781.34, playoff: false }
            ],
            '2020': [
                { rank: 1, teamName: "Suk 4 Saquan", manager: "John Adam Benson", record: "11-3-0", pointsFor: 1767.35, pointsAgainst: 1522.99, playoff: true },
                { rank: 2, teamName: "Ciroc Boys", manager: "Richie Morris", record: "9-5-0", pointsFor: 1732.05, pointsAgainst: 1651.60, playoff: true },
                { rank: 3, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "10-4-0", pointsFor: 1724.44, pointsAgainst: 1463.23, playoff: true },
                { rank: 4, teamName: "Cooper Troopers", manager: "Rob Murray", record: "8-6-0", pointsFor: 1722.45, pointsAgainst: 1642.44, playoff: true },
                { rank: 5, teamName: "Hazed and Confused", manager: "Chris Gramley", record: "7-7-0", pointsFor: 1970.31, pointsAgainst: 1712.35, playoff: false },
                { rank: 6, teamName: "Fresh Prince Helaire", manager: "Ryan Jones", record: "5-9-0", pointsFor: 1622.13, pointsAgainst: 1704.93, playoff: false },
                { rank: 7, teamName: "Team IR", manager: "Danny Boileau", record: "6-8-0", pointsFor: 1707.94, pointsAgainst: 1801.28, playoff: false },
                { rank: 8, teamName: "Mr. Big Chest", manager: "Noah DeMarco", record: "5-9-0", pointsFor: 1512.65, pointsAgainst: 1694.93, playoff: false },
                { rank: 9, teamName: "Outta Luck", manager: "Billy Cauley", record: "5-9-0", pointsFor: 1370.93, pointsAgainst: 1724.40, playoff: false },
                { rank: 10, teamName: "The CeeDee Players", manager: "Ben Gingold", record: "4-10-0", pointsFor: 1557.02, pointsAgainst: 1769.12, playoff: false }
            ],
            '2019': [
                { rank: 1, teamName: "Suk 4 Saquan", manager: "John Adam Benson", record: "8-6-0", pointsFor: 1731.16, pointsAgainst: 1600.67, playoff: true },
                { rank: 2, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "9-5-0", pointsFor: 1707.46, pointsAgainst: 1553.51, playoff: true },
                { rank: 3, teamName: "Mr. Big Chest", manager: "Noah DeMarco", record: "7-7-0", pointsFor: 1762.74, pointsAgainst: 1745.65, playoff: true },
                { rank: 4, teamName: "Cooper Troopers", manager: "Rob Murray", record: "7-7-0", pointsFor: 1773.41, pointsAgainst: 1786.04, playoff: true },
                { rank: 5, teamName: "Failed to fail for27", manager: "Danny Boileau", record: "6-8-0", pointsFor: 1695.18, pointsAgainst: 1634.98, playoff: false },
                { rank: 6, teamName: "Team Gingold", manager: "Ben Gingold", record: "7-7-0", pointsFor: 1557.36, pointsAgainst: 1606.61, playoff: false },
                { rank: 7, teamName: "Ciroc Boys", manager: "Richie Morris", record: "7-7-0", pointsFor: 1632.52, pointsAgainst: 1642.96, playoff: false },
                { rank: 8, teamName: "Outta Luck", manager: "Billy Cauley", record: "7-7-0", pointsFor: 1582.56, pointsAgainst: 1613.30, playoff: false },
                { rank: 9, teamName: "Hazed and Confused", manager: "Chris Gramley", record: "6-8-0", pointsFor: 1665.72, pointsAgainst: 1759.26, playoff: false },
                { rank: 10, teamName: "Biggest loser", manager: "Ryan Jones", record: "6-8-0", pointsFor: 1596.34, pointsAgainst: 1761.47, playoff: false }
            ],
            '2018': [
                { rank: 1, teamName: "Hazed and Confused", manager: "Chris Gramley", record: "10-4-0", pointsFor: 1976.02, pointsAgainst: 1703.92, playoff: true },
                { rank: 2, teamName: "skittles.", manager: "Noah DeMarco", record: "7-7-0", pointsFor: 1783.28, pointsAgainst: 1847.37, playoff: true },
                { rank: 3, teamName: "Suk 4 Saquan", manager: "John Adam Benson", record: "12-2-0", pointsFor: 1856.56, pointsAgainst: 1564.68, playoff: true },
                { rank: 4, teamName: "Mixon A Box", manager: "Ryan Jones", record: "9-5-0", pointsFor: 2012.77, pointsAgainst: 1701.21, playoff: true },
                { rank: 5, teamName: "Cooper Troopers", manager: "Rob Murray", record: "7-7-0", pointsFor: 1727.90, pointsAgainst: 1790.68, playoff: false },
                { rank: 6, teamName: "Failed to fail for27", manager: "Danny Boileau", record: "7-7-0", pointsFor: 1716.69, pointsAgainst: 1653.61, playoff: false },
                { rank: 7, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "5-9-0", pointsFor: 1684.08, pointsAgainst: 1912.28, playoff: false },
                { rank: 8, teamName: "Call Me The Brees", manager: "Billy Cauley", record: "5-9-0", pointsFor: 1722.80, pointsAgainst: 1871.25, playoff: false },
                { rank: 9, teamName: "Ciroc Boys", manager: "Richie Morris", record: "4-10-0", pointsFor: 1707.29, pointsAgainst: 1777.77, playoff: false },
                { rank: 10, teamName: "Team Boileau", manager: "Danny Boileau", record: "4-10-0", pointsFor: 1414.51, pointsAgainst: 1779.13, playoff: false }
            ],
            '2017': [
                { rank: 1, teamName: "skittles.", manager: "Noah DeMarco", record: "11-3-0", pointsFor: 1914.79, pointsAgainst: 1428.53, playoff: true },
                { rank: 2, teamName: "Failed to fail for27", manager: "Danny Boileau", record: "9-5-0", pointsFor: 1561.28, pointsAgainst: 1476.50, playoff: true },
                { rank: 3, teamName: "Hazed and Confused", manager: "Chris Gramley", record: "8-6-0", pointsFor: 1724.80, pointsAgainst: 1551.49, playoff: true },
                { rank: 4, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "8-6-0", pointsFor: 1516.86, pointsAgainst: 1592.07, playoff: true },
                { rank: 5, teamName: "Mixon A Box", manager: "Ryan Jones", record: "6-8-0", pointsFor: 1678.68, pointsAgainst: 1669.00, playoff: false },
                { rank: 6, teamName: "Ciroc Boys", manager: "Richie Morris", record: "5-9-0", pointsFor: 1473.06, pointsAgainst: 1565.08, playoff: false },
                { rank: 7, teamName: "Call Me The Brees", manager: "Billy Cauley", record: "7-7-0", pointsFor: 1695.48, pointsAgainst: 1629.49, playoff: false },
                { rank: 8, teamName: "Cooper Troopers", manager: "Rob Murray", record: "7-7-0", pointsFor: 1463.33, pointsAgainst: 1644.75, playoff: false },
                { rank: 9, teamName: "DraftedDavidJohnson", manager: "Alex Falcon", record: "5-9-0", pointsFor: 1468.09, pointsAgainst: 1677.00, playoff: false },
                { rank: 10, teamName: "Suk 4 Saquan", manager: "John Adam Benson", record: "4-10-0", pointsFor: 1349.29, pointsAgainst: 1611.75, playoff: false }
            ],
            '2016': [
                { rank: 1, teamName: "Forte year old virgn", manager: "Alex Falcon", record: "8-6-0", pointsFor: 1720.24, pointsAgainst: 1608.76, playoff: true },
                { rank: 2, teamName: "skittles.", manager: "Noah DeMarco", record: "7-7-0", pointsFor: 1806.05, pointsAgainst: 1706.74, playoff: true },
                { rank: 3, teamName: "Rob s Rad Team", manager: "Rob Murray", record: "8-6-0", pointsFor: 1700.60, pointsAgainst: 1655.88, playoff: true },
                { rank: 4, teamName: "Ciroc Boys", manager: "Richie Morris", record: "11-3-0", pointsFor: 1677.16, pointsAgainst: 1554.34, playoff: true },
                { rank: 5, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "6-8-0", pointsFor: 1505.01, pointsAgainst: 1458.74, playoff: false },
                { rank: 6, teamName: "Fail for Fournette", manager: "Danny Boileau", record: "7-7-0", pointsFor: 1577.48, pointsAgainst: 1647.45, playoff: false },
                { rank: 7, teamName: "Just Gurley Things", manager: "Ryan Jones", record: "6-8-0", pointsFor: 1563.40, pointsAgainst: 1543.46, playoff: false },
                { rank: 8, teamName: "Call Me The Brees", manager: "Billy Cauley", record: "7-7-0", pointsFor: 1647.04, pointsAgainst: 1713.69, playoff: false },
                { rank: 9, teamName: "The SPARQ Specimens", manager: "John Adam Benson", record: "5-9-0", pointsFor: 1531.28, pointsAgainst: 1647.98, playoff: false },
                { rank: 10, teamName: "Hazed and Confused", manager: "Chris Gramley", record: "5-9-0", pointsFor: 1499.99, pointsAgainst: 1691.21, playoff: false }
            ],
            '2015': [
                { rank: 1, teamName: "skittles.", manager: "Noah DeMarco", record: "12-2-0", pointsFor: 1994.25, pointsAgainst: 1572.00, playoff: true },
                { rank: 2, teamName: "Forte year old virgn", manager: "Alex Falcon", record: "10-4-0", pointsFor: 1731.32, pointsAgainst: 1589.20, playoff: true },
                { rank: 3, teamName: "Call Me The Brees", manager: "Billy Cauley", record: "7-7-0", pointsFor: 1734.94, pointsAgainst: 1726.67, playoff: true },
                { rank: 4, teamName: "Rob s Rad Team", manager: "Rob Murray", record: "8-6-0", pointsFor: 1679.00, pointsAgainst: 1575.29, playoff: true },
                { rank: 5, teamName: "Ol' Dirty Beckham", manager: "Ryan Jones", record: "6-8-0", pointsFor: 1605.17, pointsAgainst: 1665.63, playoff: false },
                { rank: 6, teamName: "Ciroc Boys", manager: "Richie Morris", record: "7-7-0", pointsFor: 1580.41, pointsAgainst: 1585.62, playoff: false },
                { rank: 7, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "6-8-0", pointsFor: 1636.42, pointsAgainst: 1626.19, playoff: false },
                { rank: 8, teamName: "Hazed and Confused", manager: "Chris Gramley", record: "6-8-0", pointsFor: 1563.37, pointsAgainst: 1708.97, playoff: false },
                { rank: 9, teamName: "The SPARQ Specimens", manager: "John Adam Benson", record: "6-8-0", pointsFor: 1553.26, pointsAgainst: 1656.89, playoff: false },
                { rank: 10, teamName: "Fail for Fournette", manager: "Danny Boileau", record: "2-12-0", pointsFor: 1544.52, pointsAgainst: 1916.20, playoff: false }
            ],
            '2014': [
                { rank: 1, teamName: "skittles.", manager: "Noah DeMarco", record: "10-4-0", pointsFor: 2033.15, pointsAgainst: 1778.69, playoff: true },
                { rank: 2, teamName: "Call Me The Brees", manager: "Billy Cauley", record: "11-3-0", pointsFor: 1917.15, pointsAgainst: 1668.20, playoff: true },
                { rank: 3, teamName: "Forte year old virgn", manager: "Alex Falcon", record: "10-4-0", pointsFor: 1817.43, pointsAgainst: 1573.21, playoff: true },
                { rank: 4, teamName: "4th and 9 Inches", manager: "John Adam Benson", record: "7-7-0", pointsFor: 1551.16, pointsAgainst: 1774.16, playoff: true },
                { rank: 5, teamName: "Ciroc Boys", manager: "Richie Morris", record: "6-8-0", pointsFor: 1599.38, pointsAgainst: 1663.44, playoff: false },
                { rank: 6, teamName: "OrangeDaNewBlackmon", manager: "Ryan Jones", record: "6-8-0", pointsFor: 1645.66, pointsAgainst: 1654.09, playoff: false },
                { rank: 7, teamName: "Rob s Rad Team", manager: "Rob Murray", record: "6-8-0", pointsFor: 1542.60, pointsAgainst: 1656.10, playoff: false },
                { rank: 8, teamName: "Dan's Dandy Team", manager: "Danny Boileau", record: "6-8-0", pointsFor: 1623.15, pointsAgainst: 1698.28, playoff: false },
                { rank: 9, teamName: "Man Among Boys", manager: "Chris Gramley", record: "4-10-0", pointsFor: 1587.41, pointsAgainst: 1687.64, playoff: false },
                { rank: 10, teamName: "Spider 2 Y Banana", manager: "Joe Kertsmar", record: "4-10-0", pointsFor: 1580.14, pointsAgainst: 1743.42, playoff: false }
            ],
            '2013': [
                { rank: 1, teamName: "ICameISawIGronkered", manager: "Chris Gramley", record: "9-5-0", pointsFor: 1725.03, pointsAgainst: 1494.70, playoff: true },
                { rank: 2, teamName: "Forte year old virgn", manager: "Feyi Olugbenga", record: "10-4-0", pointsFor: 1823.61, pointsAgainst: 1598.82, playoff: true },
                { rank: 3, teamName: "skittles.", manager: "Noah DeMarco", record: "9-5-0", pointsFor: 1741.12, pointsAgainst: 1669.29, playoff: true },
                { rank: 4, teamName: "Billy Cauley's Team", manager: "Billy Cauley", record: "7-7-0", pointsFor: 1783.20, pointsAgainst: 1795.85, playoff: true },
                { rank: 5, teamName: "Dan's Dandy Team", manager: "Danny Boileau", record: "6-8-0", pointsFor: 1812.00, pointsAgainst: 1839.85, playoff: false },
                { rank: 6, teamName: "Tom Terrific", manager: "John Adam Benson", record: "7-7-0", pointsFor: 1701.50, pointsAgainst: 1559.31, playoff: false },
                { rank: 7, teamName: "Joseph's Primo Team", manager: "Joe Kertsmar", record: "7-7-0", pointsFor: 1568.33, pointsAgainst: 1667.39, playoff: false },
                { rank: 8, teamName: "The Big Gronkowski", manager: "Ryan Jones", record: "6-8-0", pointsFor: 1553.82, pointsAgainst: 1534.28, playoff: false },
                { rank: 9, teamName: "Rob s Rad Team", manager: "Rob Murray", record: "5-9-0", pointsFor: 1444.32, pointsAgainst: 1738.93, playoff: false },
                { rank: 10, teamName: "Richie's Team", manager: "Richie Morris", record: "4-10-0", pointsFor: 1595.04, pointsAgainst: 1849.55, playoff: false }
            ]
        };
    }

    renderDashboard() {
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
                <td>${team.manager ? team.manager : ''}</td>
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
            const dynastyIcon = team.hasDynasty ? 
                `<img src="dynasty.png" alt="Dynasty" class="dynasty-icon" title="Click to view dynasty spans" data-manager="${team.manager}" style="width: 20px; height: 20px; margin-left: 8px; cursor: pointer; vertical-align: middle;">` : '';
            
            row.innerHTML = `
                <td>${team.rank}</td>
                <td>${team.manager}${dynastyIcon}</td>
                <td>${team.totalWins}-${team.totalLosses}-${team.totalTies}</td>
                <td>${team.avgPointsFor.toFixed(2)}</td>
                <td>${team.playoffAppearances}</td>
                <td>${team.gold}</td>
                <td>${team.silver}</td>
                <td>${team.bronze}</td>
                <td>${team.totalMedals}</td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add click event listeners for dynasty icons
        document.querySelectorAll('.dynasty-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const manager = icon.getAttribute('data-manager');
                this.showDynastySpans(manager);
            });
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
dashboard.setupEventListeners();

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