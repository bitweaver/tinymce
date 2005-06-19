/* Import plugin specific language pack */
tinyMCE.importPluginLanguagePack('flash', 'en,de,sv,zh_cn,cs,fa,fr_ca,fr');

function TinyMCE_flash_getControlHTML(control_name) {
    switch (control_name) {
        case "flash":
            return '<img id="{$editor_id}_flash" src="{$pluginurl}/images/flash.gif" title="{$lang_insert_flash}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mceFlash\');" />';
    }

    return "";
}

function TinyMCE_flash_parseAttributes(attribute_string) {
	var attributeName = "";
	var attributeValue = "";
	var withInName;
	var withInValue;
	var attributes = new Array();
	var whiteSpaceRegExp = new RegExp('^[ \n\r\t]+', 'g');

	if (attribute_string == null || attribute_string.length < 2)
		return null;

	withInName = withInValue = false;

	for (var i=0; i<attribute_string.length; i++) {
		var chr = attribute_string.charAt(i);

		if ((chr == '"' || chr == "'") && !withInValue)
			withInValue = true;
		else if ((chr == '"' || chr == "'") && withInValue) {
			withInValue = false;

			var pos = attributeName.lastIndexOf(' ');
			if (pos != -1)
				attributeName = attributeName.substring(pos+1);

			attributes[attributeName.toLowerCase()] = attributeValue.substring(1).toLowerCase();

			attributeName = "";
			attributeValue = "";
		} else if (!whiteSpaceRegExp.test(chr) && !withInName && !withInValue)
			withInName = true;

		if (chr == '=' && withInName)
			withInName = false;

		if (withInName)
			attributeName += chr;

		if (withInValue)
			attributeValue += chr;
	}

	return attributes;
}

function TinyMCE_flash_execCommand(editor_id, element, command, user_interface, value) {
	function getAttrib(elm, name) {
		return elm.getAttribute(name) ? elm.getAttribute(name) : "";
	}

    // Handle commands
    switch (command) {
        case "mceFlash":
			var name = "", swffile = "", swfwidth = "", swfheight = "", action = "insert";
            var template = new Array();
			var inst = tinyMCE.getInstanceById(editor_id);
			var focusElm = inst.getFocusElement();

            template['file']   = '../../plugins/flash/flash.htm'; // Relative to theme
            template['width']  = 400;
            template['height'] = 195;

			// Is selection a image
            if (focusElm != null && focusElm.nodeName.toLowerCase() == "img") {
				name = getAttrib(focusElm, 'name');

				if (name != 'mce_plugin_flash') // Not a Flash
					return true;

				// Get rest of Flash items
				swffile = getAttrib(focusElm, 'title');
				//swffile = eval(tinyMCE.settings['urlconvertor_callback'] + "(swffile, null, true);");
				swfwidth = getAttrib(focusElm, 'width');
				swfheight = getAttrib(focusElm, 'height');
				action = "update";
            }

            tinyMCE.openWindow(template, {editor_id : editor_id, swffile : swffile, swfwidth : swfwidth, swfheight : swfheight, action : action});
		return true;
   }

   // Pass to next handler in chain
   return false;
}

function TinyMCE_flash_cleanup(type, content) {
	switch (type) {
		case "insert_to_editor":
			var startPos = 0;
			var embedList = new Array();

			// Fix the embed and object elements
			content = content.replace(new RegExp('<[ ]*embed','gi'),'<embed');
			content = content.replace(new RegExp('<[ ]*/embed[ ]*>','gi'),'</embed>');
			content = content.replace(new RegExp('<[ ]*object','gi'),'<object');
			content = content.replace(new RegExp('<[ ]*/object[ ]*>','gi'),'</object>');

			// Parse all embed tags
			while ((startPos = content.indexOf('<embed', startPos+1)) != -1) {
				var endPos = content.indexOf('>', startPos);
				var attribs = TinyMCE_flash_parseAttributes(content.substring(startPos + 6, endPos));
				embedList[embedList.length] = attribs;
			}

			// Parse all object tags and replace them with images from the embed data
			var index = 0;
			while ((startPos = content.indexOf('<object', startPos)) != -1) {
				var endPos = content.indexOf('>', startPos);

				// Find end of embed
				endPos = content.indexOf('/>', endPos);
				if (endPos == -1) {
					endPos = content.indexOf('</object>', endPos);
					endPos += 8;
				} else
					endPos += 2;

				if (index >= embedList.length)
					break;

				var attribs = embedList[index];

				// Insert image
				var contentAfter = content.substring(endPos+1);
				content = content.substring(0, startPos);
				content += '<img name="mce_plugin_flash" width="' + attribs["width"] + '" height="' + attribs["height"] + '"';
				content += ' src="' + (tinyMCE.getParam("theme_href") + '/images/spacer.gif') + '" title="' + attribs["src"] + '"';
				content += ' alt="' + attribs["src"] + '" class="mce_plugin_flash" />' + content.substring(endPos+1);
				content += contentAfter;
				index++;

				startPos++;
			}
			break;

		case "get_from_editor":
			// Parse all img tags and replace them with object+embed
			var startPos = 0;
			while ((startPos = content.indexOf('<img', startPos)) != -1) {
				var endPos = content.indexOf('/>', startPos);
				var attribs = TinyMCE_flash_parseAttributes(content.substring(startPos + 4, endPos));

				// Is not flash
				if (attribs['name'] != "mce_plugin_flash")
					break;

				endPos += 2;

				var embedHTML = '';

				// Insert object + embed
				embedHTML += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
				embedHTML += ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"';
				embedHTML += ' width="' + attribs["width"] + '" height="' + attribs["height"] + '">';
				embedHTML += '<param name="movie" value="' + attribs["title"] + '" />';
				embedHTML += '<param name="quality" value="high" />';
				embedHTML += '<param name="menu" value="false" />';
				embedHTML += '<embed src="' + attribs["title"] + '" quality="high" menu="false" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + attribs["width"] + '" height="' + attribs["height"] + '"></embed></object>';

/*
<object
classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"
codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="360" height="305" hspace="0" vspace="0">
  <param name="src" value="<?=$_REQUEST['url']?>">
  <param name="autoplay" value="true">
  <param name="controller" value="true">
  <embed src="<?=$_REQUEST['url']?>" width="360" height="305" hspace="0" vspace="0"
autoplay="true" controller="true"
pluginspage="http://www.apple.com/quicktime/download/">
  </embed></object>

*/

				content = content.substring(0, startPos) + embedHTML + content.substring(endPos+1);

				startPos++;
			}
			break;
	}

	// Pass through to next handler in chain
	return content;
}

function TinyMCE_flash_handleNodeChange(editor_id, node, undo_index, undo_levels, visual_aid, any_selection) {
	function getAttrib(elm, name) {
		return elm.getAttribute(name) ? elm.getAttribute(name) : "";
	}

	tinyMCE.switchClassSticky(editor_id + '_flash', 'mceButtonNormal');

	if (node == null)
		return;

	do {
		if (node.nodeName.toLowerCase() == "img" && getAttrib(node, 'name').indexOf('mce_plugin_flash') == 0)
			tinyMCE.switchClassSticky(editor_id + '_flash', 'mceButtonSelected');
	} while ((node = node.parentNode));

	return true;
}
