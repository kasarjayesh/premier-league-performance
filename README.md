# ⚽ Premier League Performance Analysis (1993–2024)

An interactive D3.js data visualization that explores the performance of Premier League teams from 1993 to 2024. Users can dynamically filter teams and seasons to analyze trends in goals scored, goals conceded, points, and positions.

![Premier League Analysis](https://img.shields.io/badge/D3.js-v7-orange)

---

## 📊 Overview

This project visualizes historical Premier League data as an interactive bubble chart, where:

- **X-axis**: Goals Scored (GF)
- **Y-axis**: Goals Conceded (GA)
- **Bubble Size**: Total Points
- **Bubble Color**: League Position (Darker = Higher rank)

It allows users to filter by:
- Season
- Team
- Goals, Points, and Position ranges

Built using **D3.js (v7)** for dynamic and responsive visualization.

---

## 🗂️ Project Structure

```
premier-league-performance/
├── index.html              # Main webpage containing layout and visualization container
├── script.js               # D3.js logic for loading, filtering, and rendering data
├── style.css               # Styling for the interface and chart
├── pl-tables-1993-2024.csv # Historical Premier League dataset
└── README.md               # Documentation
```

---

## 🚀 Features

✅ **Interactive Filtering**: Choose specific seasons, teams, and numeric ranges for goals, positions, or points  
✅ **Dynamic Bubble Chart**: Each bubble represents a team's season performance. Bubble size and color update with filters  
✅ **Tooltip Insights**: Hover over a bubble to see detailed stats — team name, goals scored, conceded, points, and position  
✅ **Responsive Design**: Clean and modern UI built with CSS and D3's SVG rendering  

---

## 🧠 Tech Stack

| Component | Technology Used |
|-----------|----------------|
| Visualization | D3.js v7 |
| Interface | HTML5, CSS3 |
| Data | CSV (Premier League data 1993–2024) |
| Styling | Custom CSS |

---

## ⚙️ How to Run

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/kasarjayesh/premier-league-performance.git
cd premier-league-performance
```

### 2️⃣ Open the Project

Simply open the `index.html` file in your web browser:

```bash
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```


---

## 📈 Data Description

The dataset (`pl-tables-1993-2024.csv`) includes:

| Column | Description |
|--------|-------------|
| `team` | Team name |
| `gf` | Goals For (scored) |
| `ga` | Goals Against (conceded) |
| `points` | Total points earned |
| `position` | Final league position |
| `season_end_year` | End year of the season (e.g., 1999 = 1998–1999 season) |

---

## 🎨 Visualization Example

- **Bubble Size** → Total Points
- **Bubble Color** → League Position (dark = top rank, light = lower rank)
- **Axes** → Goals Scored (x) vs Goals Conceded (y)

Users can quickly identify dominant teams with:
- High goals scored (right side)
- Low goals conceded (bottom side)
- Large, dark bubbles = top-performing teams

---

## 🎯 Usage Instructions

1. **Select Season**: Choose a specific season or view all seasons
2. **Filter Teams**: Select one or multiple teams from the dropdown
3. **Adjust Ranges**: Use sliders to filter by:
   - Goals Scored (GF)
   - Goals Conceded (GA)
   - Points
   - League Position
4. **Hover for Details**: Move your mouse over any bubble to see detailed statistics
5. **Reset Filters**: Clear all filters to return to the full dataset view


---


## 🙌 Credits

- **Author**: Jayesh Kasar
- **Data Source**: Official Premier League historical data
- **Libraries**: [D3.js v7](https://d3js.org/)

---


## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ and D3.js**