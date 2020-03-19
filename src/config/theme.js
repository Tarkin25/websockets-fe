import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#343a40"
        },
        secondary: {
            main: "#f8f9fa"
        },
        error: {
            main: "#dc3545"
        },
        warning: {
            main: "#ffc107"
        },
        success: {
            main: "#28a745"
        },
        info: {
            main: "#17a2b8"
        }
    }
});

export default theme;