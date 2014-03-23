//Get Dynamic Variables
var selector = screenwriter_js_object.selector,
	directory = screenwriter_js_object.directory,
	config = screenwriter_js_object.config,
	count = parseInt(screenwriter_js_object.count);

//Init Editors
tinymce.init({
    selector: "textarea."+selector,
    content_css : directory+"/css/inline.css",
    resize: config.resize,
    width: config.width,
    height : config.height,
    statusbar : config.statusbar,
    menubar : config.menubar,
    plugins: config.plugins,
    toolbar: config.toolbar
 });

//Fix Custom WP Errors
tinymce.DOM.files = function(){};
tinymce.DOM.events.add = function(){};
tinymce.onAddEditor = {add: function(){}};