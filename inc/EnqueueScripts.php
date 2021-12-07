<?php
/**
 * Regsiters and Loads all Scripts and styles for the template
 */

namespace Derweili\StarterTheme;
class EnqueueScripts {

	public function __construct() {
	}

	public function run() {
		$this->enqueue = new \WPackio\Enqueue( 'derweiliStarterTheme', 'dist', '1.0.0', 'theme', __FILE__ );

		add_action(
			'wp_enqueue_scripts',
			array( $this, 'enqueue_frontend_scripts' )
		);

		add_action(
			'enqueue_block_assets',
			array( $this, 'enqueue_block_editor_scripts' )
		);
	}

	public function enqueue_frontend_scripts() {
		$assetsConfig = [
			'js' => true,
			'css' => true,
			'js_dep' => [
				'jquery'
			],
			'css_dep' => [
			],
			'in_footer' => true,
			'media' => 'all',
		];

		$this->enqueue->enqueue( 'app', 'main', $assetsConfig );
	}

	public function enqueue_block_editor_scripts() {
		$assetsConfig = [
			'js' => true,
			'css' => true,
			'js_dep' => [
				'jquery'
			],
			'css_dep' => [
			],
			'in_footer' => true,
			'media' => 'all',
		];

		$this->enqueue->enqueue( 'app', 'editor', $assetsConfig );
	}
}