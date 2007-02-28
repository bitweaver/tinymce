{* $Header: /cvsroot/bitweaver/_tinymce/templates/header_inc.tpl,v 1.8 2007/02/28 06:31:40 lsces Exp $ *}
{if $gBitSystem->isPackageActive( 'tinymce' ) and ( $gBitSystem->getConfig('default_format') eq 'bithtml' or $gContent->mInfo.format_guid eq 'bithtml' ) and $textarea_id}
	<script type="text/javascript" src="{$smarty.const.TINYMCE_PKG_URL}jscripts/tiny_mce_gzip.php"></script>
	<script type="text/javascript">
		//<![CDATA[
		tinyMCE.init({ldelim}
			mode		: "exact",
			elements	: "{$textarea_id}",
			{if $gBitSystem->isFeatureActive( 'tinymce_ask' )}
				ask		: true,
			{/if}
			theme		: "advanced",
			{if $gBitSystem->isFeatureActive( 'tinymce_fullscreen' )}
				plugins		: "table,fullscreen",
				theme_advanced_buttons3_add : "tablecontrols,separator,fullscreen",
				fullscreen_new_window : false,
				fullscreen_settings : {ldelim}
					theme_advanced_toolbar_location : "top",
					theme_advanced_statusbar_location : "none"
				{rdelim},
			{else}
				plugins		: "table",
				theme_advanced_buttons3_add_before : "tablecontrols,separator",
			{/if}
			{if $gBitSystem->isFeatureActive( 'tinymce_debug' )}
				debug	: true,
			{/if}
			{if !$gBitSystem->isFeatureActive( 'tinymce_cleanup' )}
				cleanup	: false,
			{/if}
			content_css : "{$smarty.const.THEMES_STYLE_URL}tinymce/tinymce.css",
			theme_advanced_styles : "Bit Box=bitbox;Bit Bar=bitbar;Bit Table=bittable;Odd table row=odd;Even table row=even"
		{rdelim});
		//]]>
	</script>
{/if}
