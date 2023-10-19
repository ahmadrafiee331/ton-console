import { TonCurrencyAmount } from 'src/shared';

export interface AnalyticsTableSource {
    headings: string[];
    data: string[][];
}

export interface AnalyticsQueryTemplate {
    request: string;
    estimatedTimeMS: number;
    estimatedCost: TonCurrencyAmount;
}

export interface AnalyticsQueryBasic extends AnalyticsQueryTemplate {
    id: string;
    status: 'executing' | 'success' | 'error';
    creationDate: Date;
}

export interface AnalyticsQueryCompleted extends AnalyticsQueryBasic {
    status: 'success' | 'error';
    spentTime: number;
    cost: TonCurrencyAmount;
}

export interface AnalyticsQuerySuccessful extends AnalyticsQueryCompleted {
    status: 'success';
    csvUrl: string;
    preview: AnalyticsTableSource;
}

export interface AnalyticsQueryErrored extends AnalyticsQueryBasic {
    status: 'error';
    errorReason: string;
}

export interface AnalyticsQueryPending extends AnalyticsQueryBasic {
    status: 'executing';
}

export function isAnalyticsQueryCompleted(
    query: AnalyticsQueryBasic
): query is AnalyticsQueryCompleted {
    return query.status === 'success' || query.status === 'error';
}

export type AnalyticsQuery =
    | AnalyticsQueryPending
    | AnalyticsQuerySuccessful
    | AnalyticsQueryErrored;
