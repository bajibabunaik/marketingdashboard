export default function PerformanceSummary({ summary }) {
    return (
      <div className="card">
        <h3>Totals</h3>
        <p>Total Spend: ${summary.spend.toFixed(2)}</p>
        <p>Total Impressions: {summary.impressions.toLocaleString()}</p>
        <p>Total Conversions: {summary.conversions}</p>
        <p>Average CTR: {summary.ctr.toFixed(2)}%</p>
      </div>
    );
  }
  