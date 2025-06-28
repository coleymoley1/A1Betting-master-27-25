interface QuantumPrediction {
  id: string;
  game: string;
  player?: string;
  prediction: string;
  confidence: number;
  quantumSignal: number;
  superpositionState: 'entangled' | 'coherent' | 'collapsed';
  neuralNetwork: string;
  timeframe: string;
  sport: string;
  league: string;
  odds?: {
    over: number;
    under: number;
    current: number;
  };
  metadata: {
    temperature: number;
    humidity?: number;
    injuryRisk: number;
    momentum: number;
    historicalAccuracy: number;
  };
}

interface QuantumSystemState {
  coherence: number;
  entanglement: number;
  processing: boolean;
  activeNetworks: number;
  totalPredictions: number;
  accuracy: number;
  quantumBoostActive: boolean;
}

class QuantumPredictionsService {
  private predictions: QuantumPrediction[] = [];
  private systemState: QuantumSystemState = {
    coherence: 99.97,
    entanglement: 87.3,
    processing: true,
    activeNetworks: 47,
    totalPredictions: 0,
    accuracy: 89.7,
    quantumBoostActive: true,
  };
  private subscribers: Set<(predictions: QuantumPrediction[], state: QuantumSystemState) => void> =
    new Set();

  constructor() {
    this.initializeQuantumSystem();
    this.startBackgroundProcessing();
  }

  private initializeQuantumSystem() {
    // Initialize with some mock quantum predictions
    this.predictions = [
      {
        id: 'q_pred_1',
        game: 'LAL vs GSW',
        player: 'LeBron James',
        prediction: 'Over 25.5 Points',
        confidence: 94.7,
        quantumSignal: 0.847,
        superpositionState: 'entangled',
        neuralNetwork: 'QuantumNet-Alpha',
        timeframe: 'tonight',
        sport: 'Basketball',
        league: 'NBA',
        odds: { over: 1.85, under: 1.95, current: 1.87 },
        metadata: {
          temperature: 72,
          injuryRisk: 0.12,
          momentum: 0.73,
          historicalAccuracy: 0.891,
        },
      },
      {
        id: 'q_pred_2',
        game: 'BUF vs KC',
        player: 'Josh Allen',
        prediction: 'Over 2.5 Passing TDs',
        confidence: 91.3,
        quantumSignal: 0.923,
        superpositionState: 'coherent',
        neuralNetwork: 'QuantumNet-Beta',
        timeframe: 'sunday',
        sport: 'Football',
        league: 'NFL',
        odds: { over: 1.9, under: 1.9, current: 1.92 },
        metadata: {
          temperature: 45,
          humidity: 65,
          injuryRisk: 0.08,
          momentum: 0.89,
          historicalAccuracy: 0.923,
        },
      },
      {
        id: 'q_pred_3',
        game: 'COL vs VGK',
        prediction: 'Over 6.5 Total Goals',
        confidence: 88.9,
        quantumSignal: 0.756,
        superpositionState: 'coherent',
        neuralNetwork: 'QuantumNet-Gamma',
        timeframe: 'tonight',
        sport: 'Hockey',
        league: 'NHL',
        odds: { over: 2.1, under: 1.7, current: 1.95 },
        metadata: {
          temperature: 22,
          injuryRisk: 0.15,
          momentum: 0.68,
          historicalAccuracy: 0.847,
        },
      },
    ];

    this.systemState.totalPredictions = this.predictions.length;
  }

  private startBackgroundProcessing() {
    // Simulate continuous quantum processing
    setInterval(() => {
      this.updateQuantumState();
      this.generateNewPredictions();
      this.notifySubscribers();
    }, 5000); // Update every 5 seconds

    // Update system metrics more frequently
    setInterval(() => {
      this.updateSystemMetrics();
      this.notifySubscribers();
    }, 2000); // Update every 2 seconds
  }

  private updateQuantumState() {
    // Simulate quantum coherence fluctuations
    this.systemState.coherence = Math.max(
      95,
      Math.min(99.99, this.systemState.coherence + (Math.random() - 0.5) * 0.5)
    );

    // Update entanglement
    this.systemState.entanglement = Math.max(
      80,
      Math.min(95, this.systemState.entanglement + (Math.random() - 0.5) * 2)
    );

    // Update accuracy
    this.systemState.accuracy = Math.max(
      85,
      Math.min(95, this.systemState.accuracy + (Math.random() - 0.5) * 0.5)
    );
  }

  private updateSystemMetrics() {
    // Randomly update active networks
    if (Math.random() < 0.1) {
      this.systemState.activeNetworks = Math.max(
        40,
        Math.min(50, this.systemState.activeNetworks + (Math.random() > 0.5 ? 1 : -1))
      );
    }
  }

  private generateNewPredictions() {
    // Occasionally generate new predictions
    if (Math.random() < 0.3) {
      const newPrediction: QuantumPrediction = {
        id: `q_pred_${Date.now()}`,
        game: this.getRandomGame(),
        player: this.getRandomPlayer(),
        prediction: this.getRandomPrediction(),
        confidence: Math.random() * 20 + 80, // 80-100%
        quantumSignal: Math.random(),
        superpositionState: this.getRandomState(),
        neuralNetwork: this.getRandomNetwork(),
        timeframe: 'live',
        sport: this.getRandomSport(),
        league: this.getRandomLeague(),
        metadata: {
          temperature: Math.random() * 50 + 30,
          injuryRisk: Math.random() * 0.3,
          momentum: Math.random(),
          historicalAccuracy: Math.random() * 0.2 + 0.8,
        },
      };

      this.predictions.unshift(newPrediction);
      this.systemState.totalPredictions++;

      // Keep only the latest 50 predictions
      if (this.predictions.length > 50) {
        this.predictions = this.predictions.slice(0, 50);
      }
    }
  }

  private getRandomGame(): string {
    const games = [
      'LAL vs GSW',
      'BOS vs MIA',
      'BUF vs KC',
      'DAL vs PHI',
      'COL vs VGK',
      'TOR vs FLA',
      'NYY vs BOS',
      'LAD vs SF',
    ];
    return games[Math.floor(Math.random() * games.length)];
  }

  private getRandomPlayer(): string {
    const players = [
      'LeBron James',
      'Stephen Curry',
      'Josh Allen',
      'Dak Prescott',
      'Nathan MacKinnon',
      'Connor McDavid',
      'Aaron Judge',
      'Mookie Betts',
    ];
    return players[Math.floor(Math.random() * players.length)];
  }

  private getRandomPrediction(): string {
    const predictions = [
      'Over 25.5 Points',
      'Under 8.5 Assists',
      'Over 2.5 TDs',
      'Under 275.5 Passing Yards',
      'Over 1.5 Goals',
      'Under 4.5 SOG',
      'Over 2.5 Hits',
      'Under 8.5 Runs',
    ];
    return predictions[Math.floor(Math.random() * predictions.length)];
  }

  private getRandomState(): 'entangled' | 'coherent' | 'collapsed' {
    const states = ['entangled', 'coherent', 'collapsed'];
    return states[Math.floor(Math.random() * states.length)] as any;
  }

  private getRandomNetwork(): string {
    const networks = [
      'QuantumNet-Alpha',
      'QuantumNet-Beta',
      'QuantumNet-Gamma',
      'QuantumNet-Delta',
      'QuantumNet-Epsilon',
      'QuantumNet-Zeta',
    ];
    return networks[Math.floor(Math.random() * networks.length)];
  }

  private getRandomSport(): string {
    const sports = ['Basketball', 'Football', 'Hockey', 'Baseball'];
    return sports[Math.floor(Math.random() * sports.length)];
  }

  private getRandomLeague(): string {
    const leagues = ['NBA', 'NFL', 'NHL', 'MLB'];
    return leagues[Math.floor(Math.random() * leagues.length)];
  }

  public subscribe(
    callback: (predictions: QuantumPrediction[], state: QuantumSystemState) => void
  ) {
    this.subscribers.add(callback);
    // Immediately call with current data
    callback(this.predictions, this.systemState);

    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => {
      callback([...this.predictions], { ...this.systemState });
    });
  }

  public getPredictions(): QuantumPrediction[] {
    return [...this.predictions];
  }

  public getSystemState(): QuantumSystemState {
    return { ...this.systemState };
  }

  public getPredictionsBySport(sport: string): QuantumPrediction[] {
    return this.predictions.filter(p => p.sport.toLowerCase() === sport.toLowerCase());
  }

  public getHighConfidencePredictions(minConfidence: number = 90): QuantumPrediction[] {
    return this.predictions.filter(p => p.confidence >= minConfidence);
  }

  public getQuantumBoostPredictions(): QuantumPrediction[] {
    return this.predictions.filter(
      p => p.superpositionState === 'entangled' && p.quantumSignal > 0.8
    );
  }

  public toggleQuantumBoost(): void {
    this.systemState.quantumBoostActive = !this.systemState.quantumBoostActive;
    this.notifySubscribers();
  }
}

export const quantumPredictionsService = new QuantumPredictionsService();
export type { QuantumPrediction, QuantumSystemState };
