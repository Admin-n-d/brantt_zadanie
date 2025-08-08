<?php
$eyebrow   = isset( $attributes['eyebrow'] ) ? esc_html( $attributes['eyebrow'] ) : '';
$title     = isset( $attributes['title'] ) ? esc_html( $attributes['title'] ) : '';
$view_text = isset( $attributes['viewAllText'] ) ? esc_html( $attributes['viewAllText'] ) : '';
$view_url  = isset( $attributes['viewAllUrl'] ) ? esc_url( $attributes['viewAllUrl'] ) : '#';
$order     = ( isset( $attributes['order'] ) && in_array( $attributes['order'], ['ASC','DESC'], true ) ) ? $attributes['order'] : 'DESC';

$q = new WP_Query( [
    'posts_per_page' => 4,
    'orderby'        => 'date',
    'order'          => $order,
    'post_status'    => 'publish',
] );

$posts = [];
if ( $q->have_posts() ) {
    while ( $q->have_posts() ) { $q->the_post(); $posts[] = get_post(); }
    wp_reset_postdata();
}
if ( empty( $posts ) ) return;

$featured = array_shift( $posts ); // pierwszy jako featured
?>
<section class="wp-block-brantt-latest-posts latest-posts">
    <div class="lp-header">
        <?php if ( $eyebrow ) : ?><p class="lp-eyebrow"><?php echo $eyebrow; ?></p><?php endif; ?>
        <div class="lp-title-wrap">
            <?php if ( $title ) : ?><h2 class="lp-title"><?php echo $title; ?></h2><?php endif; ?>
            <?php if ( $view_text ) : ?><a class="lp-viewall" href="<?php echo $view_url; ?>"><?php echo $view_text; ?></a><?php endif; ?>
        </div>
    </div>

    <div class="lp-grid">
        <article class="lp-card lp-card--featured">
            <a class="lp-thumb" href="<?php echo get_permalink( $featured ); ?>">
                <?php echo get_the_post_thumbnail( $featured, 'large' ); ?>
            </a>
            <div class="lp-meta">
                <span class="lp-badge">★ Featured post</span>
                <h3 class="lp-card-title">
                    <a href="<?php echo get_permalink( $featured ); ?>">
                        <?php echo esc_html( get_the_title( $featured ) ); ?>
                    </a>
                </h3>
                <p class="lp-excerpt">
                    <?php
                    $ex = wp_strip_all_tags( get_the_excerpt( $featured ) );
                    echo esc_html( wp_trim_words( $ex, 26 ) );
                    ?>
                </p>
            </div>
        </article>

        <?php foreach ( $posts as $p ) : ?>
            <article class="lp-card lp-card--small">
                <a class="lp-thumb" href="<?php echo get_permalink( $p ); ?>">
                    <?php echo get_the_post_thumbnail( $p, 'medium_large' ); ?>
                    <span class="lp-diagonal"></span>
                </a>
                <div class="lp-body">
                    <h3 class="lp-card-title">
                        <a href="<?php echo get_permalink( $p ); ?>"><?php echo esc_html( get_the_title( $p ) ); ?></a>
                    </h3>
                    <p class="lp-excerpt">
                        <?php echo esc_html( wp_trim_words( wp_strip_all_tags( get_the_excerpt( $p ) ), 20 ) ); ?>
                    </p>
                    <a class="lp-more" href="<?php echo get_permalink( $p ); ?>">Read more</a>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>
