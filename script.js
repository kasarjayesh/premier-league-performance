// Initialize dimensions and margins
const width = 1000;
const height = 600;
const margin = { top: 40, right: 30, bottom: 60, left: 60 };

// Create SVG container
const svg = d3.select("#viz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#fff");

// Load and process data
d3.csv("./pl-tables-1993-2024.csv").then(data => {
    // Process data
    const processedData = data.map(d => ({
        team: d.team,
        gf: +d.gf,
        ga: +d.ga,
        points: +d.points,
        position: +d.position,
        season: +d.season_end_year
    }));

    // Populate season dropdown
    const seasons = [...new Set(processedData.map(d => d.season))].sort((a, b) => a - b);
    d3.select("#seasonSelect")
        .selectAll("option")
        .data(["all", ...seasons])
        .enter()
        .append("option")
        .text(d => d === "all" ? "All Seasons" : d)
        .attr("value", d => d);

    // Populate team dropdown
    const teams = [...new Set(processedData.map(d => d.team))].sort();
    d3.select("#teamSelect")
        .selectAll("option")
        .data(["all", ...teams])
        .enter()
        .append("option")
        .text(d => d);

    // Initialize scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(processedData, d => d.gf)])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(processedData, d => d.ga)])
        .range([height - margin.bottom, margin.top]);

    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(processedData, d => d.points)])
        .range([5, 40]);

    const colorScale = d3.scaleSequential(d3.interpolateMagma)
        .domain([1, 20]);

    // Add axes
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .attr("class", "axis")
        .append("text")
        .attr("x", width / 2)
        .attr("y", 35)
        .attr("fill", "#2c3e50")
        .attr("font-weight", "600")
        .text("Goals Scored");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickSizeOuter(0))
        .attr("class", "axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -height / 2)
        .attr("fill", "#2c3e50")
        .attr("font-weight", "600")
        .text("Goals Conceded");

    // Create bubbles
    let bubbles = svg.selectAll(".bubble")
        .data(processedData)
        .enter().append("circle")
        .attr("class", "bubble")
        .attr("cx", d => xScale(d.gf))
        .attr("cy", d => yScale(d.ga))
        .attr("r", d => sizeScale(d.points))
        .attr("fill", d => colorScale(d.position))
        .attr("opacity", 0.8);

    // Tooltip setup
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Tooltip interactions
    bubbles.on("mouseover", (event, d) => {
            console.log("HOVERED:", d.team);
            tooltip.transition().duration(200)
                .style("opacity", 0.95);
            tooltip.html(`
                <strong>${d.team}</strong><br>
                Season: ${d.season}<br>
                Goals: ${d.gf}<br>
                Conceded: ${d.ga}<br>
                Points: ${d.points}<br>
                Position: ${d.position}
            `)
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition().duration(200)
                .style("opacity", 0);
        });

    // Filter function
    function applyFilters() {
        const season = d3.select("#seasonSelect").property("value");
        const team = d3.select("#teamSelect").property("value");
        const minGoals = +d3.select("#minGoals").property("value") || 0;
        const maxGoals = +d3.select("#maxGoals").property("value") || d3.max(processedData, d => d.gf);
        const minPosition = +d3.select("#minPosition").property("value") || 1;
        const maxPosition = +d3.select("#maxPosition").property("value") || 20;
        const minPoints = +d3.select("#minPoints").property("value") || 0;
        const maxPoints = +d3.select("#maxPoints").property("value") || d3.max(processedData, d => d.points);

        let filteredData = processedData.filter(d => 
            (season === "all" || d.season === +season) &&
            (team === "all" || d.team === team) &&
            d.gf >= minGoals && d.gf <= maxGoals &&
            d.position >= minPosition && d.position <= maxPosition &&
            d.points >= minPoints && d.points <= maxPoints
        );

        // Update bubbles with transitions
        bubbles = svg.selectAll(".bubble")
            .data(filteredData, d => d.team + d.season);

        bubbles.exit()
            .transition().duration(300)
            .attr("r", 0)
            .remove();

        bubbles.enter()
            .append("circle")
            .attr("class", "bubble")
            .attr("cx", d => xScale(d.gf))
            .attr("cy", d => yScale(d.ga))
            .attr("r", 0)
            .attr("fill", d => colorScale(d.position))
            .attr("opacity", 0.8)
            .merge(bubbles)
            .transition().duration(500)
            .attr("cx", d => xScale(d.gf))
            .attr("cy", d => yScale(d.ga))
            .attr("r", d => sizeScale(d.points));
    }

    // Event listeners
    d3.selectAll("#seasonSelect, #teamSelect, #minGoals, #maxGoals, #minPosition, #maxPosition, #minPoints, #maxPoints")
        .on("change", applyFilters);

    // Initial render
    applyFilters();

}).catch(error => {
    console.error("Error loading CSV:", error);
});