import { AreaChart, Area, BarChart, Bar, LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend, Brush} from "recharts";
import { NebiusOperatingMetrics, NebiusCapitalMetrics } from "../../data/financials.js";

const OperatingMetricsMap = {
    revenue_mm_usd: "Revenue",
    cost_of_revenue_mm_usd: "Cost of Revenue",
    product_development_mm_usd: "Product Development",
    sga_mm_usd: "SG&A",
    depreciation_amortization_mm_usd: "Depreciation & Amortization",
}

const CapitalMetricsMap = {
    total_debt_mm_usd: "Debt",
    total_equity_mm_usd: "Equity"
}

const OperatingLeverage= () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={NebiusOperatingMetrics}
        margin={{ top: 30, right: 30, left: 20, bottom: 10 }}
      >
        <XAxis dataKey="quarter" stroke="var(--text-secondary-color)" tick={{ fontSize: 12 }}> </XAxis>
        <YAxis width="auto" stroke="var(--text-secondary-color)" tick={{ fontSize: 12 }}> </YAxis>
        <Tooltip wrapperStyle={{ backgroundColor: '#ccc', fontSize: 12}}
                 formatter={(value, name) => [value, OperatingMetricsMap[name]]}
        />
        <Legend align="center" 
                wrapperStyle={{ fontSize: 8 }}
                formatter={(value) => [OperatingMetricsMap[value]]}></Legend>

        <Line type="monotone" stroke="#8884d8" fill ="#8884d8" fillOpacity={0.5} dataKey="revenue_mm_usd"></Line>
        <Line type="monotone" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} dataKey="cost_of_revenue_mm_usd"></Line>
        <Line type="monotone" stroke="#ca9482ff" fill="#ca9482ff" fillOpacity={0.5} dataKey="product_development_mm_usd"></Line>
        <Line type="monotone" stroke="#82bdcaff" fill="#82bdcaff" fillOpacity={0.5} dataKey="sga_mm_usd"></Line>
        <Line type="monotone" stroke="#ca82bfff" fill="#ca82bfff" fillOpacity={0.5} dataKey="depreciation_amortization_mm_usd"></Line>

      </LineChart>
    </ResponsiveContainer>
  );
};


const FinancialLeverage = () => {
    return (
        <ResponsiveContainer>
        <BarChart data={NebiusCapitalMetrics} margin={{ top: 50, right: 30, left: 20, bottom: 20}} onMouseDown>  
                <XAxis dataKey="quarter" stroke="var(--text-secondary-color)" tick={{ fontSize: 12 }}/>
                <YAxis width="auto" stroke="var(--text-secondary-color)" tick={{ fontSize: 12 }}/>  
                <Tooltip wrapperStyle={{ width: 200, fontSize: 12}}
                         formatter={(value, name) => [value, CapitalMetricsMap[name]]}></Tooltip>
                <Legend align="center" wrapperStyle={{ fontSize: 12, color: "#142e47" }}
                        formatter={(value) => CapitalMetricsMap[value]}></Legend>
            <Bar type="monotone" fill="#d7f063" fillOpacity={1} dataKey="total_debt_mm_usd" stackId="a"></Bar>
            <Bar type="monotone" fill="#538cfa" fillOpacity={1} dataKey="total_equity_mm_usd" stackId="a"></Bar>

        </BarChart>
        
        </ResponsiveContainer>

    )

}
/*#4f46e5*/

export { OperatingLeverage, FinancialLeverage };