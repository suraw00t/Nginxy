//
/*------------------------------------*\
    Nginxy
    by @lfelipe1501

    Theme name: Nginxy
    Theme author: @lfelipe1501
\*------------------------------------*/
// Configure Nginxy here:
var websiteName = '';
var websiteURL = '';
// End of normal settings.
//
//

$(document).ready(function(){

// Working on nginx HTML and applying settings.
var text = $("h1").text();
var array = text.split('/');
var last = array[array.length-2];
var dirStructure = $("a").text();
var dirStructure = document.getElementsByTagName('a')[0].href;
var dir = text.substring(10);
var currentDir = last.charAt(0) + last.slice(1);
var dirTrun;

// Truncate long folder names.
if (currentDir.length > 19){
	var currentDir = currentDir.substring(0, 18) + '...';
}

// Updating page footer.
$("#footerURL").text(websiteName);
$("#footerURL").attr('href', websiteURL);
function addHeadBreadcrumb(h1) {
	let backHref = "";
	let head = [];
	h1.forEach((item, j) => {head.push('..');})
	for (var i = 0; i < h1.length; i++) {
		backHref = backHref + '<a class="back-href" href="' + head.slice(0, head.length - i).join('/') + '/">/' + h1[i] + '</a>';
	}
	return backHref + "/" + last;
}

// Updating page title.
document.title = 'Index of ' + text;

// Add back button.
$("h1").html('Index of ' + addHeadBreadcrumb(array.slice(1, -2)));
/*
function insertBeforeTable() {
	var table = document.getElementById('list');

	var div = document.createElement('div');
    	div.innerHTML = '<input type="text" style="padding: 4px; font-size: 16px; min-height: 20px; min-width: 350px; max-width: 97%;" name="keyword" id="filter-keyword" placeholder="Filter File Name">';
	div.id = 'table-filter';

	table.parentNode.insertBefore(div, table);
}
insertBeforeTable();
*/
/*
if (dir.length > 60) {
	dirTrun = dir.replace(/(.{60})/g, "$1\n")
} else {
	dirTrun = dir.substring(0, dir.length - 1);
}
*/
function removeQueryString(url) {
  const urlObj = new URL(url);

  urlObj.search = '';

  return urlObj.toString();
}

// Establish supported formats.
var list = new Array();
var formats = ["bin", "jpg", "gif", "bmp", "png", "html", "css", "zip", "iso", "tiff", "ico", "psd", "pdf", "exe", "rar", "deb", "swf", "7z", "doc", "docx", "xls", "xlsx", "pptx", "ppt", "txt", "php", "js", "c", "c++", "cpp", "torrent", "sql", "wmv", "avi","m4a", "mp4", "mp3", "wma", "ogg", "msg", "wav", "py", "java", "gzip", "jpeg", "raw", "cmd", "bat", "sh", "svg"];

// Scan all files in the directory, check the extensions and show the right MIME-type image.
$('td a').each(function(){
	var found = 0;
	var arraySplit = $(this).attr('href').split(".");
	var fileExt = arraySplit[arraySplit.length - 1];

	for (var i = 0; i < formats.length; i++) {
		if (fileExt.toLowerCase() == formats[i].toLowerCase()) {
			var found = 1;
			var oldText = $(this).text();
			$(this).html('<img class="icons" src="/images/icons/' + formats[i] + '.png" style="margin:0px 4px -4px 0px"></img></a>' + oldText);
			return;
		}
	}

	// Add an icon for the go-back link.
	if ($(this).text().indexOf("Parent directory") >= 0) {
		var found = 1;
		var oldText = $(this).text();
		$(this).html('<img class="icons" src="/images/icons/home.png" style="margin:0px 4px -4px 0px">' + oldText.substring(0, oldText.length - 1));
		return;
	}


	// Check for folders as they don't have extensions.
	const new_href = $(this).attr('href').split('?')[0]
	if (new_href.substr(new_href.length - 1) == '/') {
		var found = 1;
		var oldText = $(this).text();
		$(this).html('<img class="icons" src="/images/icons/folder.png" style="margin:0px 4px -4px 0px">' + oldText.substring(0, oldText.length));

		// Fix for annoying jQuery behaviour where inserted spaces are treated as new elements -- which breaks my search.
		var string = ' ' + $($(this)[0].nextSibling).text();

		// Copy the original meta-data string, append a space char and save it over the old string.
		$($(this)[0].nextSibling).remove();
		$(this).after(string);
		return;
	}

	// File format not supported by Better Listings, so let's load a generic icon.
	if (found == 0){
		var oldText = $(this).text();
		$(this).html('<img class="icons" src="/images/icons/error.png" style="margin:0px 4px -4px 0px">' + oldText);
		return;
	}
});
});
