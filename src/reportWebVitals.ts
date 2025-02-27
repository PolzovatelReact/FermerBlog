import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from "web-vitals";

// Тип функции для обработки метрик
type WebVitalsReportHandler = (metric: Metric) => void;

const reportWebVitals = (onPerfEntry?: WebVitalsReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
