/* Import theme	specific language pack */
tinyMCE.importPluginLanguagePack('print', 'en,sv,zh_cn,fa,fr_ca,fr,de');

function TinyMCE_print_getControlHTML(control_name)	{
	switch (control_name) {
		case "print":
			return '<img id="{$editor_id}_print" src="{$pluginurl}/images/print.gif" title="{$lang_print_desc}" width="20" height="20" class="mceButtonNormal" onmouseover="tinyMCE.switchClass(this,\'mceButtonOver\');" onmouseout="tinyMCE.restoreClass(this);" onmousedown="tinyMCE.restoreAndSwitchClass(this,\'mceButtonDown\');" onclick="tinyMCE.execInstanceCommand(\'{$editor_id}\',\'mcePrint\',true);" />';
	}

	return "";
}

/**
 * Executes	the	search/replace commands.
 */
function TinyMCE_print_execCommand(editor_id, element, command,	user_interface,	value) {
	// Handle commands
	switch (command) {
		case "mcePrint":
			tinyMCE.getInstanceById(editor_id).contentWindow.print();
			return true;
	}

	// Pass to next handler in chain
	return false;
}
