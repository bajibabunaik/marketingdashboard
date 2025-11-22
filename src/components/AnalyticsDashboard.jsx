import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAnalyticsData } from "../features/analyticsSlice";

export default function AnalyticsDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  return <div>...</div>;
}
