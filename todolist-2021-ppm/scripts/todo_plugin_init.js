jQuery(document).ready(function () {
    console.log("READY");
    jQuery(".todo_plugin").todo({
        serverURL: "server/actions.php"
    });
});