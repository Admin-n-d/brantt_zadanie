<?php
// Dodanie obsługi bloków i CSS/JS
function brantt_setup() {
    add_theme_support('editor-styles');
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('title-tag');
}
add_action('after_setup_theme', 'brantt_setup');

function brantt_enqueue() {
    wp_enqueue_style('brantt-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'brantt_enqueue');

function brantt_register_blocks() {
    register_block_type(__DIR__ . '/blocks/latest-posts');
}
add_action('init', 'brantt_register_blocks');

add_action( 'init', function () {
    // Rejestrowanie bloku z katalogu BUILD
    register_block_type( get_theme_file_path( 'build/blocks/latest-posts' ) );
} );

add_action( 'init', function () {
    register_block_pattern(
        'brantt/latest-posts-section',
        [
            'title'       => __( 'Latest Posts Section', 'brantt' ),
            'categories'  => [ 'text' ],
            'content'     => '<!-- wp:brantt/latest-posts {"eyebrow":"Latest posts","title":"Lorem ipsum dolor sit amet…","viewAllText":"View all posts","viewAllUrl":"/blog","order":"DESC"} /-->',
        ]
    );
} );

add_action('after_setup_theme', function () {
    add_theme_support('editor-styles');
    add_editor_style( [ 'editor.css', 'https://fonts.googleapis.com/css?family=Montserrat:400,700' ] );
});