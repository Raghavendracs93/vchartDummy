(function(){
    var root;
    if(webApp){
        root="/";
    }else  root=appUrl;
    module.exports = {
        "login"                     : root+"client/owner/login",
        "add_guard"                 : root+"client/guard/create",
        "list_guard"                : root+"client/guard/list",
        "get_guard_detail"          : root+"client/guard/info",
        "edit_guard"                : root+"client/guard/profile/update",
        "password_reset"            : root+"client/guard/password/change",
        "guard_deactivate"          : root+"client/guard/deactivate",
        "guard_reactivate"          : root+"client/guard/activate",
        "guard_log"                 : root+"client/guard/log",
        "config_email_alert"        : root+"client/owner/update",
        "owner_info"                : root+"client/owner/info",
        "app_url"                   : root+"client/app/url",
        "register_web_notification" :root+"comserver/notification/setting/add",
        "register_app_notification" :root+"comserver/notification/setting/add"
    };
})();