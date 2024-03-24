import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface CustomPalette {
        tableBorder: string;
        treeItemHover: string;
        neutral1: string;
        neutral3: string;
        neutral5: string;
        blue: Record<string, string>;
        brandHovedfarge: string;
        subTableBackground: string;
        primaryHover: string;
        primaryActive: string;
        errorHover: string;
        errorActive: string;
        cancelActive: string;
        tooltipBackground: string;
        logoFill: string;
        tableRowSelectedBackground: string;
        tableRowCheckedBackground: string;
        tableRowHoverBorderBottom: string;
        chartDarkBlue: string;
        chartBlue: string;
        chartLightBlue: string;
        chartLightGrey: string;
        chartGreen: string;
        chartViolet: string;
        namedContainerHeaderText: string;
        unscoredRiskIndicatorBorder: string;
        lowRiskIndicatorBorder: string;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Palette extends CustomPalette {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface PaletteOptions extends CustomPalette {}
}

const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        body1: { color: '#3B4659' },
        body2: { color: '#3B4659' },
    },
    palette: {
        primary: {
            light: '#E3F8E6',
            main: '#50B87A',
            dark: '#1A7E48',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FFFFFF',
            light: '#F9FBFC',
            dark: '#7D869A',
            contrastText: '#3B4659',
        },
        warning: {
            main: '#FFA450',
            light: '#FFF7EE',
            dark: '#F8E8D5',
        },
        error: {
            main: '#FF6363',
            light: '#FFEEEE',
            dark: '#F9D5D5',
        },
        tableBorder: '#E9EBEE',
        treeItemHover: '#F0F2F4',
        neutral1: '#FFFFFF',
        neutral3: '#F5F5F5',
        neutral5: '#D9D9D9',
        blue: {
            main: '#4082FD',
        },
        brandHovedfarge: '#97E0A5',
        subTableBackground: '#f4fdf5',
        primaryHover: '#379C5F',
        primaryActive: '#1E814C',
        errorHover: '#CC4F4F',
        errorActive: '#993B3B',
        cancelActive: '#CBD1D9',
        tooltipBackground: '#000000B2',
        logoFill: '#000000',
        tableRowSelectedBackground: '#E2E2E2',
        tableRowCheckedBackground: '#EFEFEF',
        tableRowHoverBorderBottom: '#57B080',
        chartDarkBlue: '#3192FC',
        chartBlue: '#90C5FF',
        chartLightBlue: '#CADBEE',
        chartLightGrey: '#DADEE3',
        chartGreen: '#0CC3C3',
        chartViolet: '#E3537E',
        namedContainerHeaderText: '#000000',
        unscoredRiskIndicatorBorder: '#E6EAF6',
        lowRiskIndicatorBorder: '#C5E0CA',
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
});

export default theme;
