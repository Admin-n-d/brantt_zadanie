// src/blocks/latest-posts/edit.js
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    URLInputButton,
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    Spinner,
    Placeholder,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
    const { eyebrow, title, viewAllText, viewAllUrl, order } = attributes;
    const blockProps = useBlockProps( { className: 'latest-posts' } );

    // ---- STABILNE ZAPYTANIE (memo), lowercase dla REST (asc|desc)
    const query = useMemo(
        () => ({
            per_page: 4,
            order: (order || 'DESC').toLowerCase(), // 'asc' | 'desc'
            orderby: 'date',
            _embed: true,
            status: 'publish',
        }),
        [ order ]
    );

    // ---- POBRANIE + FLAGA RESOLVOWANIA (koniec z "Loading..." na stałe)
    const { posts, isResolving } = useSelect( ( select ) => {
        const core = select( 'core' );
        const records = core.getEntityRecords( 'postType', 'post', query );
        const resolving = core.isResolving(
            'core',
            'getEntityRecords',
            [ 'postType', 'post', query ]
        );
        return { posts: records, isResolving: resolving };
    }, [ query ] );

    // ---- DZIELIMY: featured + 3 pozostałe
    const [ featured, rest ] = useMemo( () => {
        if ( !Array.isArray( posts ) || posts.length === 0 ) return [ null, [] ];
        const [ f, ...r ] = posts;
        return [ f, r ];
    }, [ posts ] );

    // ---- helper: URL miniatury z _embed
    const mediaUrl = ( p ) => {
        const m = p?._embedded?.['wp:featuredmedia']?.[0];
        return m?.media_details?.sizes?.large?.source_url || m?.source_url || '';
    };

    return (
        <section { ...blockProps }>
            {/* PANEL – tylko ustawienia porządkowania, reszta edycji inline */}
            <InspectorControls>
                <PanelBody title={ __( 'Settings', 'brantt' ) }>
                    <SelectControl
                        label={ __( 'Order', 'brantt' ) }
                        value={ order }
                        options={ [
                            { label: 'DESC (newest first)', value: 'DESC' },
                            { label: 'ASC (oldest first)', value: 'ASC' },
                        ] }
                        onChange={ (v) => setAttributes( { order: v } ) }
                    />
                </PanelBody>
            </InspectorControls>

            {/* NAGŁÓWEK – edytowalny inline */}
            <header className="lp-header">
                <RichText
                    tagName="p"
                    className="lp-eyebrow"
                    value={ eyebrow }
                    placeholder={ __( 'Eyebrow', 'brantt' ) }
                    onChange={ (v) => setAttributes( { eyebrow: v } ) }
                    allowedFormats={ [] }
                />
                <div className="lp-title-wrap">
                    <RichText
                        tagName="h2"
                        className="lp-title"
                        value={ title }
                        placeholder={ __( 'Section title…', 'brantt' ) }
                        onChange={ (v) => setAttributes( { title: v } ) }
                        allowedFormats={ [ 'core/bold', 'core/italic' ] }
                    />
                    <div className="lp-viewall-wrap">
                        <RichText
                            tagName="a"
                            className="lp-viewall"
                            value={ viewAllText }
                            onChange={ (v) => setAttributes( { viewAllText: v } ) }
                            placeholder={ __( 'View all posts', 'brantt' ) }
                            allowedFormats={ [] }
                        />
                        <URLInputButton
                            url={ viewAllUrl }
                            onChange={ (url) => setAttributes( { viewAllUrl: url } ) }
                        />
                    </div>
                </div>
            </header>

            {/* GRID – podgląd postów w edytorze */}
            <div className="lp-grid">
                { isResolving && (
                    <Placeholder className="lp-ph">
                        <Spinner />
                        <span style={ { marginLeft: 8 } }>
							{ __( 'Loading posts…', 'brantt' ) }
						</span>
                    </Placeholder>
                ) }

                { !isResolving && posts && posts.length === 0 && (
                    <Placeholder>{ __( 'No posts found.', 'brantt' ) }</Placeholder>
                ) }

                { !isResolving && posts && posts.length > 0 && (
                    <>
                        {/* FEATURED */}
                        <article className="lp-card lp-card--featured">
                            <a className="lp-thumb" href="#">
                                { mediaUrl( featured ) ? (
                                    <img src={ mediaUrl( featured ) } alt="" />
                                ) : (
                                    <div className="lp-thumb--ph" />
                                ) }
                            </a>
                            <div className="lp-meta">
                                <span className="lp-badge">★ { __( 'Featured post', 'brantt' ) }</span>
                                <h3 className="lp-card-title">
                                    { featured?.title?.rendered ? (
                                        <span
                                            dangerouslySetInnerHTML={ {
                                                __html: featured.title.rendered,
                                            } }
                                        />
                                    ) : (
                                        __( 'Post title', 'brantt' )
                                    ) }
                                </h3>
                                <p className="lp-excerpt">
                                    { featured?.excerpt?.rendered ? (
                                        <span
                                            dangerouslySetInnerHTML={ {
                                                __html: featured.excerpt.rendered.replace(
                                                    /<\/?p>/g,
                                                    ''
                                                ),
                                            } }
                                        />
                                    ) : (
                                        __( 'Excerpt preview…', 'brantt' )
                                    ) }
                                </p>
                            </div>
                        </article>

                        {/* 3 POZOSTAŁE */}
                        { rest.map( ( p ) => (
                            <article key={ p.id } className="lp-card lp-card--small">
                                <a className="lp-thumb" href="#">
                                    { mediaUrl( p ) ? (
                                        <img src={ mediaUrl( p ) } alt="" />
                                    ) : (
                                        <div className="lp-thumb--ph" />
                                    ) }
                                    <span className="lp-diagonal" />
                                </a>
                                <div className="lp-body">
                                    <h3 className="lp-card-title">
										<span
                                            dangerouslySetInnerHTML={ {
                                                __html: p.title?.rendered || '',
                                            } }
                                        />
                                    </h3>
                                    <p className="lp-excerpt">
										<span
                                            dangerouslySetInnerHTML={ {
                                                __html: ( p.excerpt?.rendered || '' ).replace(
                                                    /<\/?p>/g,
                                                    ''
                                                ),
                                            } }
                                        />
                                    </p>
                                    <a className="lp-more" href="#">
                                        { __( 'Read more', 'brantt' ) }
                                    </a>
                                </div>
                            </article>
                        ) ) }
                    </>
                ) }
            </div>
        </section>
    );
}
