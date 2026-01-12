import React, { useState } from "react";
import {
  VictoryGroup,
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  VictoryZoomContainer,
  VictoryContainer,
  VictoryLegend,
  VictoryStack,
} from "victory";
import {
  NebiusCapitalMetrics,
  NebiusOperatingMetrics,
} from "../../data/financials.js";

/* For each item in the array, call the following function */
const NebiusCapitalMetricsCleaned = NebiusCapitalMetrics.map((item) => ({
  reportingQuarter: `${item.quarter} ${item.year}`,
  total_debt_mm_usd: Number((item.total_debt_mm_usd / 1000).toFixed(2)),
  total_equity_mm_usd: Number((item.total_equity_mm_usd / 1000).toFixed(2)),
  total_debt_percentage:
    item.total_debt_mm_usd /
    (item.total_debt_mm_usd + item.total_equity_mm_usd),
  total_equity_percentage:
    item.total_equity_mm_usd /
    (item.total_debt_mm_usd + item.total_equity_mm_usd),
}));

const NebiusOperatingMetricsCleaned = NebiusOperatingMetrics.map((item) => ({
  reportingQuarter: `${item.quarter} ${item.year}`,
  revenue_mm_usd: item.revenue_mm_usd,
  cost_of_revenue_mm_usd: item.cost_of_revenue_mm_usd,
  product_development_mm_usd: item.product_development_mm_usd,
  sga_mm_usd: item.sga_mm_usd,
  depreciation_amortization_mm_usd: item.depreciation_amortization_mm_usd,
}));

const FinancialLeverage = () => {
  return (
    <VictoryChart
      domainPadding={40}
      width={700}
      height={400}
      padding={{
        top: 80,
        bottom: 80,
        left: 80,
        right: 80,
      }}
      theme={VictoryTheme.clean}
      containerComponent={<VictoryZoomContainer zoomDimension="x" />}
    >
      <VictoryLabel
        text="Financial Leverage"
        dx={34}
        dy={26}
        style={{
          ...VictoryTheme.clean.label,
          fontSize: 14,
        }}
      />

      <VictoryLabel
        text="Debt and equity composition by quarter"
        dx={34}
        dy={42}
        style={{
          ...VictoryTheme.clean.label,
          fontSize: 10,
        }}
      />

      <VictoryAxis
        style={{
          ticks: {
            stroke: "#757575",
            size: 5,
          },
          tickLabels: { fontSize: 12 },
        }}
      />

      <VictoryAxis
        dependentAxis
        label="USD (Billions)"
        tickFormat={(t) => `${Math.round(t)}B`}
        axisLabelComponent={<VictoryLabel dy={-20} dx={0} angle={-90} />}
        style={{ tickLabels: { fontSize: 12 } }}
      />

      <VictoryLegend
        x={275}
        y={350}
        orientation="horizontal"
        data={[
          { name: "Equity", symbol: { fill: "#538cfa" } },
          { name: "Debt", symbol: { fill: "#ff4f81ff" } },
        ]}
        style={{
          label: { fontSize: 7 },
          border: { stroke: "transparent" },
        }}
      />

      <VictoryStack>
        <VictoryBar
          data={NebiusCapitalMetricsCleaned}
          x="reportingQuarter"
          y="total_debt_mm_usd"
          alignment="middle"
          labels={({ datum }) => datum.total_debt_mm_usd}
          style={{
            data: { fill: "#ff4f81ff" },
            labels: { fontSize: 12, fill: "#ff4f81ff" },
          }}
        />

        <VictoryBar
          data={NebiusCapitalMetricsCleaned}
          x="reportingQuarter"
          y="total_equity_mm_usd"
          alignment="middle"
          cornerRadius={{ topLeft: 5, topRight: 5 }}
          labels={({ datum }) => datum.total_equity_mm_usd}
          style={{
            data: { fill: "#538cfa" },
            labels: { fontSize: 12, fill: "#538cfa" },
          }}
        />
      </VictoryStack>
    </VictoryChart>
  );
};

const FinancialLeveragePercentage = () => {
  return (
    <VictoryChart
      domainPadding={40}
      width={700}
      height={400}
      padding={{
        top: 80,
        bottom: 80,
        left: 80,
        right: 80,
      }}
      theme={VictoryTheme.clean}
      containerComponent={<VictoryZoomContainer zoomDimension="x" />}
    >
      <VictoryLabel
        text="Financial Leverage"
        dx={34}
        dy={26}
        style={{
          ...VictoryTheme.clean.label,
          fontSize: 14,
        }}
      />

      <VictoryLabel
        text="Debt and equity composition by quarter"
        dx={34}
        dy={42}
        style={{
          ...VictoryTheme.clean.label,
          fontSize: 10,
        }}
      />

      <VictoryAxis
        style={{
          ticks: {
            stroke: "#757575",
            size: 5,
          },
          tickLabels: { fontSize: 12 },
        }}
      />

      <VictoryAxis
        dependentAxis
        label="USD (Billions)"
        tickFormat={(tick) =>
            `${tick*100}%`
          }
        axisLabelComponent={<VictoryLabel dy={-20} dx={0} angle={-90} />}
        style={{ tickLabels: { fontSize: 12 } }}
      />

      <VictoryLegend
        x={275}
        y={350}
        orientation="horizontal"
        data={[
          { name: "Equity", symbol: { fill: "#538cfa" } },
          { name: "Debt", symbol: { fill: "#ff4f81ff" } },
        ]}
        style={{
          label: { fontSize: 7 },
          border: { stroke: "transparent" },
        }}
      />

      <VictoryStack>
        <VictoryBar
          data={NebiusCapitalMetricsCleaned}
          x="reportingQuarter"
          y="total_debt_percentage"
          alignment="middle"
          labels={({ datum }) => `${datum.total_debt_percentage.toFixed(2)*100}%`}
          style={{
            data: { fill: "#ff4f81ff" },
            labels: { fontSize: 12, fill: "#ff4f81ff" },
          }}
        />

        <VictoryBar
          data={NebiusCapitalMetricsCleaned}
          x="reportingQuarter"
          y="total_equity_percentage"
          alignment="middle"
          cornerRadius={{ topLeft: 5, topRight: 5 }}
          labels={({ datum }) => `${datum.total_equity_percentage.toFixed(2)*100}%`}
          style={{
            data: { fill: "#538cfa" },
            labels: { fontSize: 12, fill: "#538cfa" },
          }}
        />
      </VictoryStack>
    </VictoryChart>
  );
};


const OperatingLeverage = () => {
  const [hiddenLines, setHiddenLines] = useState(new Set());
  const toggleLine = (index) => {
    setHiddenLines((prev) => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  const legendData = [
    {
      name: "Revenue",
      symbol: {
        fill: "#538cfa",
        type: "circle",
        opacity: hiddenLines.has(0) ? 0.5 : 1,
      },
    },
    {
      name: "Cost of Revenue",
      symbol: {
        fill: "#ff4f81ff",
        type: "circle",
        opacity: hiddenLines.has(1) ? 0.5 : 1,
      },
    },
    {
      name: "Product Development",
      symbol: {
        fill: "#14b8a6",
        type: "circle",
        opacity: hiddenLines.has(2) ? 0.5 : 1,
      },
    },
    {
      name: "SG&A",
      symbol: {
        fill: "#818cf8",
        type: "circle",
        opacity: hiddenLines.has(3) ? 0.5 : 1,
      },
    },
    {
      name: "Depreciation & Amortization",
      symbol: {
        fill: "#bbcbe0ff",
        type: "circle",
        opacity: hiddenLines.has(4) ? 0.5 : 1,
      },
    },
  ];

  return (
    <VictoryChart
      width={700}
      height={400}
      padding={{
        top: 80,
        bottom: 75,
        left: 80,
        right: 80,
      }}
      theme={VictoryTheme.clean}
      containerComponent={<VictoryZoomContainer />}
    >
      <VictoryLabel
        text="Operating Leverage"
        dx={34}
        dy={26}
        style={{
          ...VictoryTheme.clean.label,
          fontSize: 14,
        }}
      />

      <VictoryLabel
        text="Revenue growth relative to operating cost structure by quarter"
        dx={34}
        dy={42}
        style={{
          ...VictoryTheme.clean.label,
          fontSize: 10,
        }}
      />

      <VictoryAxis />

      <VictoryAxis
        dependentAxis
        label="USD (Millions)"
        tickFormat={(t) => `${Math.round(t)}M`}
        axisLabelComponent={<VictoryLabel dy={-20} dx={0} angle={-90} />}
        style={{
          axisLabel: { fontSize: 12 },
          tickLabels: { fontSize: 12 },
          grid: { stroke: "#d9d9d9", size: 5 },
        }}
      />

      <VictoryLegend
        x={20}
        y={350}
        data={legendData}
        style={{
          label: { fontSize: 7 },
          border: { stroke: "transparent" },
          data: { cursor: "pointer" },
        }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onClick: (evt, props) => {
                toggleLine(props.index); // Toggle on click
                return [];
              },
            },
          },
        ]}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="revenue_mm_usd"
        interpolation="natural"
        name="revenue-line"
        style={{
          data: {
            stroke: "#2f75ffff",
            strokeWidth: 2.5,
            opacity: hiddenLines.has(0) ? 0 : 1,
          },
        }}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="cost_of_revenue_mm_usd"
        interpolation="natural"
        style={{
          data: {
            stroke: "#fb326bff",
            strokeWidth: 2.5,
            opacity: hiddenLines.has(1) ? 0 : 0.7,
          },
        }}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="product_development_mm_usd"
        interpolation="natural"
        style={{
          data: {
            stroke: "#14b8a6",
            strokeWidth: 2.5,
            opacity: hiddenLines.has(2) ? 0 : 0.7,
          },
        }}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="sga_mm_usd"
        interpolation="natural"
        style={{
          data: {
            stroke: "#818cf8",
            strokeWidth: 2.5,
            opacity: hiddenLines.has(3) ? 0 : 0.7,
          },
        }}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="depreciation_amortization_mm_usd"
        interpolation="natural"
        style={{
          data: {
            stroke: "#bbcbe0ff",
            strokeWidth: 2.5,
            opacity: hiddenLines.has(4) ? 0 : 1,
          },
        }}
      />
    </VictoryChart>
  );
};

export { FinancialLeverage, OperatingLeverage, FinancialLeveragePercentage };
