import React from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
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
  total_debt_mm_usd: item.total_debt_mm_usd,
  total_equity_mm_usd: item.total_equity_mm_usd,
  total_debt_percentage:
    item.total_debt_mm_usd /
    (item.total_debt_mm_usd + item.total_equity_mm_usd),
  total_equity_percentage:
    item.total_debt_mm_usd /
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
      domain={{ y: [0, 12000] }}
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
        tickFormat={(t) => `${Math.round(t / 1000)}B`}
        axisLabelComponent={
          <VictoryLabel dy={-20} dx={0} angle={-90} />
        }
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

const OperatingLeverage = () => {
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
      containerComponent={<VictoryZoomContainer zoomDimension="x" />}
    >
      <VictoryLabel
        text="Operating Leverage"
        dx={28}
        dy={22}
        style={{
          ...VictoryTheme.clean.label,
          fontSize: 14,
        }}
      />
      
      <VictoryLabel
        text="Revenue growth relative to operating cost structure by quarter"
        dx={28}
        dy={38}
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
        data={[
          { name: "Revenue", symbol: { fill: "#538cfa", type: "circle" } },
          { name: "Cost of Revenue", symbol: { fill: "#ff4f81ff", type: "diamond" } },
          { name: "Product Development", symbol: { fill: "#7C7CF8", type: "square" } },
          { name: "SG&A", symbol: { fill: "#0D8599", type: "triangleUp" } },
          { name: "Depreciation & Amortization", symbol: { fill: "#fdc700ff", type: "star" } },
        ]}
        style={{
          label: { fontSize: 7 },
          border: { stroke: "transparent" },
        }}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="revenue_mm_usd"
        interpolation="natural"
        style={{
          data: { stroke: "#538cfa", strokeWidth: 2.5 },
        }}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="cost_of_revenue_mm_usd"
        interpolation="natural"
        style={{
          data: { stroke: "#ff4f81ff", strokeWidth: 2.5 },
        }}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="product_development_mm_usd"
        interpolation="natural"
        style={{
          data: { stroke: "#7C7CF8", strokeWidth: 2.5 },
        }}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="sga_mm_usd"
        interpolation="natural"
        style={{
          data: { stroke: "#fdc700ff", strokeWidth: 2.5 },
        }}
      />

      <VictoryLine
        data={NebiusOperatingMetricsCleaned}
        x="reportingQuarter"
        y="depreciation_amortization_mm_usd"
        interpolation="natural"
        style={{
          data: { stroke: "#fd00f5ff", strokeWidth: 2.5 },
        }}
      />
    </VictoryChart>
  );
};

export { FinancialLeverage, OperatingLeverage };