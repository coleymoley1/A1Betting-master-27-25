import React from 'react.ts';

interface ModelStatus {
    id: string;
    name: string;
    status: 'active' | 'training' | 'error';
    confidence: number;
    lastUpdate: string;
}

interface MLStatusIndicatorsProps {
    models: ModelStatus[];
}

export const MLStatusIndicators: React.FC<MLStatusIndicatorsProps key={665708}> = ({ models }) => {



    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-success-500';
            case 'training':
                return 'bg-warning-500';
            case 'error':
                return 'bg-error-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return '\u2713';
            case 'training':
                return '\u27f3';
            case 'error':
                return '\u26a0';
            default:
                return '?';
        }
    };

    return (
        <div className="space-y-4" key={160407}>
            <div className="grid grid-cols-3 gap-4" key={542789}>
                <div className="glass-premium p-4 rounded-xl" key={178448}>
                    <div className="flex items-center justify-between" key={96335}>
                        <div key={241917}>
                            <div className="text-sm text-gray-500" key={826371}>Active Models</div>
                            <div className="text-2xl font-bold text-success-500" key={477526}>
                                {activeModels.length}
                            </div>
                        </div>
                        <div className="text-3xl text-success-500" key={532991}>✓</div>
                    </div>
                </div>

                <div className="glass-premium p-4 rounded-xl" key={178448}>
                    <div className="flex items-center justify-between" key={96335}>
                        <div key={241917}>
                            <div className="text-sm text-gray-500" key={826371}>Training</div>
                            <div className="text-2xl font-bold text-warning-500" key={476694}>
                                {trainingModels.length}
                            </div>
                        </div>
                        <div className="text-3xl text-warning-500 animate-spin-slow" key={985920}>⟳</div>
                    </div>
                </div>

                <div className="glass-premium p-4 rounded-xl" key={178448}>
                    <div className="flex items-center justify-between" key={96335}>
                        <div key={241917}>
                            <div className="text-sm text-gray-500" key={826371}>Errors</div>
                            <div className="text-2xl font-bold text-error-500" key={175172}>
                                {errorModels.length}
                            </div>
                        </div>
                        <div className="text-3xl text-error-500" key={312354}>⚠</div>
                    </div>
                </div>
            </div>

            <div className="space-y-2" key={725977}>
                {models.map(model => (
                    <div;
                        key={model.id}
                        className={`glass-premium p-4 rounded-xl model-status ${
                            model.status === 'active' ? 'model-active' :
                            model.status === 'training' ? 'model-training' :
                            'model-error'
                        }`}
                     key={469340}>
                        <div className="flex items-center justify-between" key={96335}>
                            <div key={241917}>
                                <div className="font-semibold" key={503466}>{model.name}</div>
                                <div className="text-sm text-gray-500" key={826371}>
                                    Last update: {new Date(model.lastUpdate).toLocaleString()}
                                </div>
                            </div>
                            <div className={`text-3xl ${getStatusColor(model.status)}`} key={751770}>{getStatusIcon(model.status)}</div>
                        </div>
                        <div className="mt-2" key={848027}>
                            <ModelConfidenceIndicator confidence={model.confidence} / key={527854}>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ModelConfidenceIndicator = ({ confidence, size = 'md' }: { confidence: number; size?: 'sm' | 'md' | 'lg'; }) => {
    const getColor = (c: number) => {
        if (c >= 0.8) return 'bg-success-500';
        if (c >= 0.6) return 'bg-warning-500';
        return 'bg-error-500';
    };
    const sizeMap = {
        sm: 'h-2 w-16',
        md: 'h-3 w-24',
        lg: 'h-4 w-32'
    };
    return (
        <div className={`rounded-full ${getColor(confidence)} ${sizeMap[size]}`} key={439961}></div>
    );
};

export const ModelStatusBadge = ({ status }: { status: 'active' | 'training' | 'error'; }) => {
    const colorMap = {
        active: 'bg-success-500',
        training: 'bg-warning-500',
        error: 'bg-error-500'
    };
    return (
        <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${colorMap[status]}`} key={521933}>{status}</span>
    );
};
