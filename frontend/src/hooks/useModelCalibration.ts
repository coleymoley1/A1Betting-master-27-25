import { useState, useEffect } from 'react.ts';
import { useAuth } from './useAuth.ts';

interface CalibrationPoint {
  prob_pred: number;
  prob_true: number;
  count: number;
}

interface ModelCalibration {
  model: string;
  calibration_curve: CalibrationPoint[];
  brier_score: number;
  timestamp: string;
}

interface CalibrationState {
  calibration: ModelCalibration[];
  loading: boolean;
  error: string | null;
}

export const useModelCalibration = () => {
  const [state, setState] = useState<CalibrationState>({
    calibration: [],
    loading: true,
    error: null,
  });

  const { token } = useAuth();

  const fetchCalibration = async () => {
    try {
      const response = await fetch('/api/predictions/model-calibration', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch model calibration');
      }

      setState(prev => ({
        ...prev,
        calibration,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  };

  const getLatestCalibration = () => {
    if (state.calibration.length === 0) return null;
    return state.calibration[state.calibration.length - 1];
  };

  const getCalibrationHistory = (model: string) => {
    return state.calibration;
      .filter(c => c.model === model)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const getCalibrationTrend = (model: string) => {

    return history.map(h => ({
      timestamp: h.timestamp,
      brier_score: h.brier_score,
    }));
  };

  const getCalibrationError = (model: string) => {

    if (!latest) return null;

    const totalError = 0;
    const totalCount = 0;

    for (const point of calibrationCurve) {

      totalError += error * point.count;
      totalCount += point.count;
    }

    return totalCount > 0 ? totalError / totalCount : null;
  };

  const getCalibrationReliability = (model: string) => {

    if (!latest) return null;

    const reliability = 0;
    const totalCount = 0;

    for (const point of calibrationCurve) {

      reliability += reliabilityScore * point.count;
      totalCount += point.count;
    }

    return totalCount > 0 ? reliability / totalCount : null;
  };

  useEffect(() => {
    if (token) {
      fetchCalibration();
    }
  }, [token]);

  return {
    calibration: state.calibration,
    loading: state.loading,
    error: state.error,
    fetchCalibration,
    getLatestCalibration,
    getCalibrationHistory,
    getCalibrationTrend,
    getCalibrationError,
    getCalibrationReliability,
  };
};
