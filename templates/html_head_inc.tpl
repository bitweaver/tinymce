{* $Header$ *}
{* This gets set later in the page load now for most pages. *}
{if empty($textarea_id)}
	{assign var=textarea_id value=$smarty.const.LIBERTY_TEXT_AREA}
{/if}
{if $gBitSystem->isPackageActive( 'tinymce' ) and ($gBitSystem->isFeatureActive('liberty_plugin_status_bithtml') or $gContent->mInfo.format_guid eq 'bithtml')}
	<script type="text/javascript" src="{$smarty.const.TINYMCE_PKG_URL}jscripts/tiny_mce_gzip.js"></script>
	<script type="text/javascript">
		//<![CDATA[
		tinyMCE_GZ.init({ldelim}
			theme		: 'advanced',
			{if $gBitSystem->isFeatureActive( 'tinymce_fullscreen' )}
				plugins		: 'table,fullscreen',
			{else}
				plugins		: 'table',
			{/if}
		{rdelim});
		//]]>
	</script>
	<script type="text/javascript">
		//<![CDATA[
		tinyMCE.init({ldelim}
			mode		: 'exact',
			elements	: '{$textarea_id}',
			{if $gBitSystem->isFeatureActive( 'tinymce_ask' )}
				ask		: true,
			{/if}
			theme		: 'advanced',
			{if $gBitSystem->isFeatureActive( 'tinymce_fullscreen' )}
				plugins		: 'table,fullscreen',
				theme_advanced_buttons3_add : 'tablecontrols,separator,fullscreen',
				fullscreen_new_window : false,
				fullscreen_settings : {ldelim}
					theme_advanced_toolbar_location : 'top',
					theme_advanced_statusbar_location : 'none'
				{rdelim},
			{else}
				plugins		: 'table',
				theme_advanced_buttons3_add_before : 'tablecontrols,separator',
			{/if}
			{if $gBitSystem->isFeatureActive( 'tinymce_debug' )}
				debug	: true,
			{/if}
			{if !$gBitSystem->isFeatureActive( 'tinymce_cleanup' )}
				cleanup	: false,
			{/if}
			content_css : '{$smarty.const.THEMES_STYLE_URL}{$gBitThemes->mStyle}.css',
			theme_advanced_styles : 'Bit Box=bitbox;Bit Bar=bitbar;Bit Table=bittable;Odd table row=odd;Even table row=even',
			theme_advanced_source_editor_wrap : false
		{rdelim});
		//]]>
	</script>

{/if}
