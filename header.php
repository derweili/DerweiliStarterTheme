<?php
/**
 * The Template for displaying the header
 *
 * Displays all the head elements and every thing up until the page content
 *
 * @package Derweili\StarterTheme
 * @since 0.1
 */
 ?>
 <!doctype html>
<html class="no-js" <?php language_attributes(); ?> >
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
