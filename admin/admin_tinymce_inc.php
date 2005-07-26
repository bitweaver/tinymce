<?php
$formTinyMCEFeatures = array(
	"tinymce_ask" => array(
		'label' => 'WYSIWYG confirmation',
		'note' => 'Ask before using the WYSIWYG editor tinymce when clicking on a textarea. If you disable this feature, we strongly suggest you enable HTML content format as the only content format and also disable quicktags.',
		'page' => '',
	),
	"tinymce_debug" => array(
		'label' => 'Enabled debugging',
		'note' => 'If the value of this option is set to "true" some debugging information will appear such as a list of what CSS files are used.',
		'page' => '',
	),
	"tinymce_cleanup" => array(
		'label' => 'Clean up HTML code',
		'note' => 'This option enables you to turn on/off the build in cleanup functionality. TinyMCE is equipped with powerful cleanup functionality that enables you to specify what elements and attributes are allowed and how HTML contents should be generated.',
		'page' => '',
	),
);

$gBitSmarty->assign( 'formTinyMCEFeatures', $formTinyMCEFeatures );

if( !empty( $_REQUEST['change_prefs'] ) ) {
	foreach( $formTinyMCEFeatures as $item => $data ) {
		simple_set_toggle( $item );
	}
}
?>
