import { makeAutoObservable } from 'mobx';
import {
    apiClient,
    createAsyncAction,
    createReaction,
    DTOStatsEstimateQuery,
    DTOStatsQueryResult,
    DTOStatsQueryStatus,
    Loadable,
    TonCurrencyAmount
} from 'src/shared';
import {
    AnalyticsQuery,
    AnalyticsQueryTemplate,
    AnalyticsTableSource,
    AnalyticsTablesSchema
} from './interfaces';
import { projectsStore } from 'src/entities';

class AnalyticsQueryStore {
    request$ = new Loadable<AnalyticsQueryTemplate | null>(null);

    query$ = new Loadable<AnalyticsQuery | null>(null);

    tablesSchema$ = new Loadable<AnalyticsTablesSchema | undefined>(undefined);

    get requestEqQuery(): boolean {
        return this.request$.value?.request === this.query$.value?.request;
    }

    constructor() {
        makeAutoObservable(this);

        createReaction(
            () => projectsStore.selectedProject?.id,
            (_, prevId) => {
                if (prevId) {
                    this.clear();
                }
            }
        );
    }

    public fetchAllTablesSchema = this.tablesSchema$.createAsyncAction(
        async () => {
            if (!this.tablesSchema$.value) {
                const result = await apiClient.api.getStatsDdl();
                return parseDDL(result.data as unknown as string);
            }
        },
        { resetBeforeExecution: true }
    );

    public estimateRequest = this.request$.createAsyncAction(async (request: string) => {
        try {
            const result = await apiClient.api.estimateStatsQuery({
                project_id: projectsStore.selectedProject!.id,
                query: request
            });

            return mapDTOStatsEstimateSQLToAnalyticsQuery(request, result.data);
        } catch (e) {
            const errText =
                (
                    e as { response: { data: { error: string } } }
                )?.response?.data?.error?.toString() || 'Unknown error';

            throw new Error(errText);
        }
    });

    createQuery = this.query$.createAsyncAction(
        async () => {
            const result = await apiClient.api.sendQueryToStats({
                project_id: projectsStore.selectedProject!.id,
                query: this.request$.value!.request
            });

            return mapDTOStatsSqlResultToAnalyticsQuery(result.data);
        },
        {
            errorToast: e => ({
                title: 'Error',
                description: (e as { response: { data: { error: string } } }).response.data.error
            })
        }
    );

    refetchQuery = this.query$.createAsyncAction(async () => {
        const result = await apiClient.api.getSqlResultFromStats(this.query$.value!.id);

        return mapDTOStatsSqlResultToAnalyticsQuery(result.data);
    });

    loadQueryAndRequest = createAsyncAction(async (id: string) => {
        this.clearRequest();
        this.query$.clear();

        this.request$.setStartLoading();
        this.query$.setStartLoading();

        const result = await apiClient.api.getSqlResultFromStats(id);
        const query = mapDTOStatsSqlResultToAnalyticsQuery(result.data);

        this.request$.setValue({
            estimatedTimeMS: query.estimatedTimeMS,
            estimatedCost: query.estimatedCost,
            request: query.request
        });

        this.query$.setValue(query);

        this.request$.setEndLoading();
        this.query$.setEndLoading();
    });

    clearRequest = (): void => {
        this.estimateRequest.cancelAllPendingCalls();
        this.request$.clear();
    };

    clear(): void {
        this.request$.clear();
        this.query$.clear();
    }
}

function mapDTOStatsEstimateSQLToAnalyticsQuery(
    request: string,
    value: DTOStatsEstimateQuery
): AnalyticsQueryTemplate {
    return {
        request,
        estimatedTimeMS: value.approximate_time,
        estimatedCost: new TonCurrencyAmount(value.approximate_cost)
    };
}

export function mapDTOStatsSqlResultToAnalyticsQuery(value: DTOStatsQueryResult): AnalyticsQuery {
    const basicQuery = {
        type: 'query',
        id: value.id,
        creationDate: new Date(value.date_create),
        request: value.query!.sql!,
        estimatedTimeMS: value.estimate!.approximate_time,
        estimatedCost: new TonCurrencyAmount(value.estimate!.approximate_cost)
    } as const;

    if (value.status === DTOStatsQueryStatus.DTOExecuting) {
        return {
            ...basicQuery,
            status: 'executing'
        };
    }

    if (value.status === DTOStatsQueryStatus.DTOSuccess) {
        return {
            ...basicQuery,
            status: 'success',
            cost: new TonCurrencyAmount(value.cost!),
            spentTimeMS: value.spent_time!,
            csvUrl: value.url!,
            preview: parsePreview(value.preview!, !!value.all_data_in_preview)
        };
    }

    return {
        ...basicQuery,
        status: 'error',
        cost: new TonCurrencyAmount(value.cost!),
        spentTimeMS: value.spent_time!,
        errorReason: value.error!
    };
}

function parsePreview(value: string[][], isAllDataPresented: boolean): AnalyticsTableSource {
    if (!value)
        return {
            headings: [],
            data: [],
            isAllDataPresented: true
        };

    const headings = value[0];
    const data = value.slice(1);
    return { headings, data, isAllDataPresented };
}

function parseDDL(ddl: string): AnalyticsTablesSchema {
    const tableRegex = /create table ([\w\.]+)\s*\(([\S\s]*?)\);/g;
    const propertiesRegex = /(\s*([a-zA-Z0-9_]+) [^,]*,)/g;

    const groups = Array.from(ddl.matchAll(tableRegex));

    return groups.reduce((acc, group) => {
        const name = group[1];
        const properties = (group[2] + ',').matchAll(propertiesRegex);
        acc[name] = Array.from(properties).map(match => match[2]);
        return acc;
    }, {} as AnalyticsTablesSchema);
}

export const analyticsQueryStore = new AnalyticsQueryStore();
