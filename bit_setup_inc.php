<?php
global $gBitSystem, $smarty;

$gBitSystem->registerPackage( 'tinymce', dirname( __FILE__ ).'/' );

if( $gBitSystem->isPackageActive( 'tinymce' ) ) {
	require_once( UTIL_PKG_PATH.'phpsniff/phpSniff.class.php' );
	$phpsniff = new phpSniff;
	if( $phpsniff->property( 'browser' ) == 'mz' || $phpsniff->property( 'browser' ) =='ie' ) {
		$smarty->assign( 'browser_supports_tinymce', TRUE );
	}
}
?>
