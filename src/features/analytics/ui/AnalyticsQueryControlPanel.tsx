import { ComponentProps, FunctionComponent, useEffect } from 'react';
import { Box, Button, Center, Flex, Skeleton, useDisclosure } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { InfoIcon16, Span, TooltipHoverable, toTimeLeft } from 'src/shared';
import {
    analyticsQueryGPTRequestStore,
    analyticsQuerySQLRequestStore,
    analyticsQueryStore
} from 'src/features';
import { useSearchParams } from 'react-router-dom';
import { computed } from 'mobx';
import ExplainSQLModal from './ExplainSQLModal';

const AnalyticsQueryControlPanel: FunctionComponent<
    ComponentProps<typeof Box> & { type: 'sql' | 'gpt' }
> = ({ type, ...props }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const store = type === 'sql' ? analyticsQuerySQLRequestStore : analyticsQueryGPTRequestStore;
    const request = store.request$.value;
    const [_, setSearchParams] = useSearchParams();

    const requestEqQuery = computed(
        () =>
            store.request$.value?.request === analyticsQueryStore.query$.value?.request &&
            store.network === analyticsQueryStore.query$.value?.network
    ).get();

    const canProcess = computed(
        () =>
            store.request$.value &&
            !requestEqQuery &&
            !store.request$.isLoading &&
            !analyticsQueryStore.createQuery.isLoading
    );

    const onCreate = async (): Promise<void> => {
        const query = await analyticsQueryStore.createQuery(
            store.request$.value!.request,
            store.request$.value!.network
        );
        setSearchParams({ id: query.id });
    };

    useEffect(() => {
        const onCtrlEnter = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canProcess.get()) {
                e.preventDefault();
                onCreate();
            }
        };

        document.addEventListener('keydown', onCtrlEnter, { capture: true });
        return () => {
            document.removeEventListener('keydown', onCtrlEnter);
        };
    }, []);

    return (
        <Flex {...props} align="center" justify="flex-end" w="100%">
            {!!request && !store.request$.error && !store.request$.isLoading && (
                <Button
                    minH="unset"
                    mr="auto"
                    color="button.primary.foreground"
                    onClick={onOpen}
                    variant="flat"
                >
                    Explain
                </Button>
            )}
            {store.request$.isLoading && (
                <Skeleton display="inline-block" w="100px" h="20px" variant="dark" />
            )}

            {!store.request$.isLoading &&
                (store.request$.error ? (
                    <TooltipHoverable
                        canBeShown
                        host={
                            <Center gap="1" color="accent.red" cursor="default">
                                Error <InfoIcon16 color="accent.red" />
                            </Center>
                        }
                    >
                        <Span color="text.primary">{store.request$.error.toString()}</Span>
                    </TooltipHoverable>
                ) : (
                    !!request && (
                        <Span display="inline-flex" opacity="0.6" fontFamily="mono">
                            {request.estimatedTimeMS < 1000 ? (
                                '< 1s'
                            ) : (
                                <>
                                    <Span paddingRight="5px" fontSize={20} lineHeight="24px">
                                        ≈
                                    </Span>
                                    <Span>{toTimeLeft(request.estimatedTimeMS)}</Span>
                                </>
                            )}
                            &nbsp;·&nbsp;
                            {request.estimatedCost.toStringCurrencyAmount({ decimalPlaces: 'all' })}
                        </Span>
                    )
                ))}

            <Button
                ml="4"
                isDisabled={!store.request$.value || requestEqQuery}
                isLoading={store.request$.isLoading || analyticsQueryStore.createQuery.isLoading}
                onClick={onCreate}
                size="sm"
                variant="contrast"
            >
                Run
            </Button>
            <ExplainSQLModal type={type} isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default observer(AnalyticsQueryControlPanel);
