import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export function themeStyles() {
  return makeStyles((theme: Theme) =>
    createStyles({
      container: {
        display: "flex",
        flexWrap: "wrap",
        width: 400,
        margin: `${theme.spacing(0)} auto`
      },
      loginBtn: {
        marginTop: theme.spacing(4),
        flexGrow: 1,
        background: "#0F54B0"
      },
      header: {
        textAlign: "center",
        background: "#0F54B0",
        font: "Verdana",
        color: "#fff"
      },
      card: {
        marginTop: theme.spacing(10),
        width: "100%"
      }
    })
  );
}
