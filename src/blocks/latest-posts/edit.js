// src/blocks/latest-posts/edit.js
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( { attributes, setAttributes } ) {
    const { eyebrow, title, viewAllText, viewAllUrl, order } = attributes;
    const blockProps = useBlockProps( { className: 'latest-posts' } );

    return (
        <section { ...blockProps }>
            <InspectorControls>
                <PanelBody title={ __( 'Section settings', 'brantt' ) }>
                    <TextControl
                        label={ __( 'Eyebrow', 'brantt' ) }
                        value={ eyebrow }
                        onChange={ (v) => setAttributes( { eyebrow: v } ) }
                    />
                    <TextControl
                        label={ __( 'Title', 'brantt' ) }
                        value={ title }
                        onChange={ (v) => setAttributes( { title: v } ) }
                    />
                    <TextControl
                        label={ __( '“View all” text', 'brantt' ) }
                        value={ viewAllText }
                        onChange={ (v) => setAttributes( { viewAllText: v } ) }
                    />
                    <TextControl
                        label={ __( '“View all” URL', 'brantt' ) }
                        value={ viewAllUrl }
                        onChange={ (v) => setAttributes( { viewAllUrl: v } ) }
                    />
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

            {/* Podgląd z serwera – znika „Loading…” i w edytorze widać to samo co na froncie */}
            <ServerSideRender block="brantt/latest-posts" attributes={ attributes } />
        </section>
    );
}
