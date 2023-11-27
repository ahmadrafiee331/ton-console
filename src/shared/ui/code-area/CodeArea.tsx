import { ComponentProps, FunctionComponent, useContext } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import { draculaInit } from '@uiw/codemirror-theme-dracula/src';
import { tags as t } from '@lezer/highlight';
import { CodeAreaGroupContext } from './CodeAreaGroup';
import AutoSizer from 'react-virtualized-auto-sizer';
import type { Extension } from '@codemirror/state';

export const CodeArea: FunctionComponent<
    { value: string; onChange: (value: string) => void; extensions?: Extension[] } & ComponentProps<
        typeof Box
    >
> = ({ value, onChange, extensions, ...rest }) => {
    const theme = useTheme();
    const { hasFooter } = useContext(CodeAreaGroupContext);

    const { stringsColor, operatorsColor, ...codeAreaSettings } =
        theme.semanticTokens.colors.codeArea;

    const dracula = draculaInit({
        settings: {
            ...codeAreaSettings
        },
        styles: [
            { tag: t.string, color: stringsColor },
            { tag: [t.keyword, t.operator, t.tagName], color: operatorsColor }
        ]
    });

    const height = rest.h || rest.height || '260px';

    return (
        <Box
            {...rest}
            sx={{
                '.cm-editor, .cm-gutters': {
                    borderTopRadius: 'lg',
                    borderBottomRadius: hasFooter ? 'none' : 'lg',
                    outline: 'none'
                },
                '.cm-editor *': {
                    fontSize: '14px',
                    fontWeight: '500'
                },
                '.cm-scroller': {
                    paddingTop: '2'
                }
            }}
            h={height}
        >
            <AutoSizer>
                {({ width }) => (
                    <CodeMirror
                        value={value}
                        onChange={onChange}
                        theme={dracula}
                        extensions={extensions}
                        basicSetup={{ autocompletion: true }}
                        width={width ? width.toString() + 'px' : '100%'}
                        height={height.toString()}
                    />
                )}
            </AutoSizer>
        </Box>
    );
};
