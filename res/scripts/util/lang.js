$.lang = new Array();

$.lang.curlang = "english";

if ($.inidb.exists("settings", "lang")) {
    $.lang.curlang = $.inidb.get("settings", "lang");
}

$.lang.data = new Array();

$.lang.load = function() {
    $.loadScript("./lang/lang-english.js");
    $.loadScript("./lang/lang-" + $.lang.curlang + ".js");
}

$.lang.get = function(str_name, args) {
    if ($.lang.data[str_name] == undefined || $.lang.data[str_name] == null) {
        if (str_name.equalsIgnoreCase("net.phantombot.lang.not-exists")) {
            return "!!! Missing string in lang file !!!";
        } else {
            return $.lang.get("net.phantombot.lang.not-exists");
        }
    }
    
    var s = $.lang.data[str_name];
    var i;
    for (i = 0; i < args.length; i++) {
        while (s.indexOf("$" + (i + 1)) >= 0) {
            s = s.replace("$" + (i + 1), args[i]);
        }
    }
    
    return s;
}

$.on('command', function(event) {
    var sender = event.getSender().toLowerCase();
    var username = $.username.resolve(sender);
    var command = event.getCommand();
    var argsString = event.getArguments().trim();
    
    if (command.equalsIgnoreCase("lang")) {
        if (!$.isAdmin(sender)) {
            $.say($.adminmsg);
            return;                
        }
        
        if (args.length == 0) {
            $.say($.lang.get("net.phantombot.lang.curlang", new Array($.lang.curlang)));
        } else {
            if (!$.fileExists("./scripts/lang/lang-" + args[0].toLowerCase() + ".js")) {
                $.say($.lang.get("net.phantombot.lang.lang-not-exists", new Array()));
                return; 
            } else {
                $.inidb.set("settings", "lang", args[0].toLowerCase());
                $.lang.load(args[0].toLowerCase());
                $.lang.curlang = args[0].toLowerCase();
                
                $.say($.lang.get("net.phantombot.lang.lang-changed", new Array(args[0].toLowerCase())));
            }
        }
    }
});