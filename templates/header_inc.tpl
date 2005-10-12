{* $Header: /cvsroot/bitweaver/_tinymce/templates/header_inc.tpl,v 1.4 2005/10/12 15:14:07 spiderr Exp $ *}
{if $gBitSystem->isPackageActive( 'tinymce' ) and $browser_supports_tinymce and ( $default_format eq 'bithtml' or $gContent->mInfo.format_guid eq 'bithtml' ) and $textarea_id}
	<script type="text/javascript" src="{$smarty.const.TINYMCE_PKG_URL}jscripts/tiny_mce_gzip.php"></script>
	<script type="text/javascript">
		//<![CDATA[
		tinyMCE.init({literal}{{/literal}
			mode		: "exact",
			elements	: "{$textarea_id}",
			{if $gBitSystem->isFeatureActive( 'tinymce_ask' )}
				ask		: true,
			{/if}
			theme		: "advanced",
			plugins		: "table",
			{if $gBitSystem->isFeatureActive( 'tinymce_debug' )}
				debug	: true,
			{/if}
			{if !$gBitSystem->isFeatureActive( 'tinymce_cleanup' )}
				cleanup	: false,
			{/if}
			content_css : "{$smarty.const.THEMES_STYLE_URL}tinymce/tinymce.css",
			theme_advanced_buttons3_add_before : "tablecontrols,separator",
			theme_advanced_styles : "Bit Box=bitbox;Bit Bar=bitbar;Bit Table=bittable;Odd table row=odd;Even table row=even"
		{literal}}{/literal});
		//]]>
	</script>
{/if}
