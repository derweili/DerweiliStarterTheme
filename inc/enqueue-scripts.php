<?php
/**
 * Regsiters and Loads all Scripts and styles for the template
 */

namespace Derweili\StarterTheme;;

if ( ! function_exists( __NAMESPACE__ . '\enqueue_scripts' ) ) :
	function enqueue_scripts(  ) {

		wp_enqueue_script( 'agenenten-wiki', get_stylesheet_directory_uri() . '/dist/assets/js/app.js', array(), '0.1', true );
    wp_enqueue_style( 'main-stylesheet', get_stylesheet_directory_uri() . '/dist/assets/css/app.css', array(), '0.1', 'all' );

	}
endif;
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_scripts' );
