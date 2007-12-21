<?php
global $gBitInstaller;
$gBitInstaller->registerPackageInfo( TINYMCE_PKG_NAME, array(
	'description' => "Tiny MCE is a 'What You See Is What You Get' textarea HTML editor. It works with MSIE and Gecko based browsers such as Mozilla and Firefox.",
	'license' => '<a href="http://www.gnu.org/licenses/licenses.html#LGPL">LGPL</a>',
	'important' => 'When using this WYSIWYG, we recommend that you either use HTML as the only content format or at least set it as default (formats can be set in Administration --> Liberty --> Liberty plugins).',
	'version' => '2.1.3',
) );

$gBitInstaller->registerPreferences( TINYMCE_PKG_NAME, array(
	array(TINYMCE_PKG_NAME,'tinymce_ask','y'),
	array(TINYMCE_PKG_NAME,'tinymce_debug','n'),
	array(TINYMCE_PKG_NAME,'tinymce_cleanup','y'),
) );
?>
