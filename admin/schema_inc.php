<?php
global $gBitInstaller;
$gBitInstaller->registerPackageInfo( TINYMCE_PKG_NAME, array(
	'description' => "Tiny MCE is a 'What You See Is What You Get' textarea HTML editor. It works with MSIE and Gecko based browsers such as Mozilla and Firefox.",
	'license' => '<a href="http://www.gnu.org/licenses/licenses.html#LGPL">LGPL</a>',
	'version' => '1.4.3',
	'state' => 'external package',
	'dependencies' => '',
	'important' => 'When using this WYSIWYG, we recommend that you either use HTML as the only content format or at least set it as default (formats can be set in Administration --> Liberty --> Liberty plugins).',
) );

$gBitInstaller->registerPreferences( TINYMCE_PKG_NAME, array(
	array('tinymce','tinymce_ask','y'),
	array('tinymce','tinymce_debug','n'),
	array('tinymce','tinymce_cleanup','y'),
) );
?>
