<?php
/**
 * Derweili\StarterTheme functions and definitions
 *
 * @package Derweili\StarterTheme
 */

namespace Derweili\StarterTheme;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$autoloader = __DIR__ . '/vendor/autoload.php';
if (is_readable($autoloader)) :
    include $autoloader;
endif;

if (!defined('WPINC')) :
    die;
endif;

(new EnqueueScripts())->run();