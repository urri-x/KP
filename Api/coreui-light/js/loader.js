var ajaxLoader;
var ajaxLoaderLoading;
var ajaxLoaderSaved;
var ajaxLoaderCancelled;
function createAjaxLoader() {
	ajaxLoader || $(".ajaxInformerContainer").length != 0 || (ajaxLoader = $("<div class='ajaxInformerContainer'><span class='ajaxInformer ajaxInformer__loading' style='display: inline-block'><span>Загрузка<\/span><\/span><span class='ajaxInformer ajaxInformer__saved' style='display: inline-block'><span>Готово<\/span><\/span><span class='ajaxInformer ajaxInformer__cancelled' style='display: inline-block'><span>Изменения отменены<\/span><\/span><\/div>"), ajaxLoaderLoading = ajaxLoader.find(".ajaxInformer__loading").hide(), ajaxLoaderSaved = ajaxLoader.find(".ajaxInformer__saved").hide(), ajaxLoaderCancelled = ajaxLoader.find(".ajaxInformer__cancelled").hide(), ajaxLoader.appendTo(document.body));
}
function ajaxShow() {
	!ajaxLoader || ajaxLoaderSaved.is(":visible") || ajaxLoaderCancelled.is(":visible") || ajaxLoaderLoading.show();
}
function ajaxStop() {
	ajaxLoader && (ajaxLoader.wasSaveRequests || ajaxLoader.wasCancelRequests ? (ajaxLoader.wasSaveRequests && showChangesSaved(), ajaxLoader.wasCancelRequests && showChangesCancelled()) : (ajaxLoader.remove(), ajaxLoader = null));
}
function createAjaxAndShow() {
	createAjaxLoader();
	ajaxShow();
}
function showChangesCancelled() {
	doneAction("cancelAction");
}
function showChangesSaved() {
	doneAction("saveAction");
}
function ajaxSetProgress(n, t) {
	ajaxLoader && ajaxLoaderLoading.find("span").text("идет загрузка: " + n + " из " + t + "");
}
function ajaxSetProgressPercent(p) {
	ajaxLoader && ajaxLoaderLoading.find("span").text("идет загрузка: " + Math.round(p) + "%");
}
function doneAction(n, t) {
	ajaxLoaderLoading.show();
	var i = function () { ajaxLoader && $(ajaxLoaderSaved, ajaxLoaderCancelled).fadeOut(function () { ajaxLoader.remove(); ajaxLoader = null }) };
	n == "saveAction" && ajaxLoaderLoading.stop().fadeOut(function () { ajaxLoaderSaved.fadeIn(function () { setTimeout(i, $.fx.off ? 0 : t || 1e3) }) });
	n == "cancelAction" && ajaxLoaderLoading.stop().fadeOut(function () { ajaxLoaderCancelled.fadeIn(function () { setTimeout(i, $.fx.off ? 0 : t || 1e3) }) });
}