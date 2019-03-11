// License: GPLv2+

/*
	Teach Wordpress About My RadioControl
*/

var el = wp.element.createElement,
	registerBlockType = wp.blocks.registerBlockType,
	ServerSideRender = wp.components.ServerSideRender,
	TextControl = wp.components.TextControl,
	RadioControl = wp.components.RadioControl,
    SelectControl = wp.components.SelectControl,
	TextareaControl = wp.components.TextareaControl,
	CheckboxControl = wp.components.CheckboxControl,
	InspectorControls = wp.editor.InspectorControls;

/*
 * Here's where we register the block in JavaScript.
 *
 */
registerBlockType( 'quick-interest-slider/block', {
	title: 'Loan Calculator',
    description: 'Displays the sliders',
	icon: 'admin-settings',
	category: 'widgets',

	/*
	 * In most other blocks, you'd see an 'attributes' property being defined here.
	 * We've defined attributes in the PHP, that information is automatically sent
	 * to the block editor, so we don't need to redefine it here.
	 */

	edit: function( props ) {		
		return [
			el( 'h2', // Tag type.
					{
						className: props.className,  // Class name is generated using the block's name prefixed with wp-block-, replacing the / namespace separator with a single -.
					},
					'Loan Calculator' // Block content
				),
			/*
			 * InspectorControls lets you add controls to the Block sidebar. In this case,
			 * we're adding a TextControl, which lets us edit the 'foo' attribute (which
			 * we defined in the PHP). The onChange property is a little bit of magic to tell
			 * the block editor to update the value of our 'foo' property, and to re-render
			 * the block.
			 */
            el( InspectorControls, {},
               el( TextControl, {
					label:     'Currency Symbol',
					value:     props.attributes.currency,
					onChange:  ( value ) => { props.setAttributes( { currency: value } ); },
                } ),
               el( TextControl, {
					label:     'Minimum Amount',
					value:     props.attributes.loanmin,
					onChange:  ( value ) => { props.setAttributes( { loanmin: value } ); },
                } ),
               el( TextControl, {
					label:     'Max Amount',
					value:     props.attributes.loanmax,
					onChange:  ( value ) => { props.setAttributes( { loanmax: value } ); },
				} ),
               el( TextControl, {
					label:     'Initial Amount',
					value:     props.attributes.loaninitial,
					onChange:  ( value ) => { props.setAttributes( { loaninitial: value } ); },
				} ),
               el( TextControl, {
					label:     'Amount Step',
					value:     props.attributes.loanstep,
					onChange:  ( value ) => { props.setAttributes( { loanstep: value } ); },
				} ),
               el( CheckboxControl, {
					'label':   'Use Period slider',
					'checked': props.attributes.periodslider,
                    onChange:   ( isChecked ) => { props.setAttributes( { periodslider: isChecked } ); }
				} ),
               el( RadioControl, {
					'label':   'Loan Period',
					'selected':props.attributes.period,
					'options': [
							{'label':'Days','value':'days'},
							{'label':'Weeks','value':'weeks'},
							{'label':'Months','value':'months'},
							{'label':'Years','value':'years'},
						],
					onChange: ( option ) => { props.setAttributes( { period: option } ); }
				} ),
               el( TextControl, {
					label:     'Minimum Term',
					value:     props.attributes.periodmin,
					onChange:  ( value ) => { props.setAttributes( { periodmin: value } ); },
                } ),
               el( TextControl, {
					label:     'Max Term',
					value:     props.attributes.periodmax,
					onChange:  ( value ) => { props.setAttributes( { periodmax: value } ); },
				} ),
               el( TextControl, {
					label:     'Initial Term',
					value:     props.attributes.periodinitial,
					onChange:  ( value ) => { props.setAttributes( { periodinitial: value } ); },
				} ),
               el( TextControl, {
					label:     'Term Step',
					value:     props.attributes.periodstep,
					onChange:  ( value ) => { props.setAttributes( { periodstep: value } ); },
				} ),
               el( TextControl, {
					label:     'Primary Interest Rate',
					value:     props.attributes.primary,
					onChange:  ( value ) => { props.setAttributes( { primary: value } ); },
				} ),
               el( TextControl, {
					label:     'Secondary Interest Rate',
					value:     props.attributes.secondary,
					onChange:  ( value ) => { props.setAttributes( { secondary: value } ); },
				} ),
			   el( TextControl, {
					label:     'Trigger',
					value:     props.attributes.trigger,
					onChange:  ( value ) => { props.setAttributes( { trigger: value } ); },
				} ),
               el( RadioControl, {
					'label':   'Interest Type',
					'selected':props.attributes.interesttype,
					'options': [
							{'label':'Fixed Interest','value':'fixed'},
							{'label':'Simple Interest','value':'simple'},
							{'label':'Compound Interest','value':'compound'},
							{'label':'Amortisation (Europe)','value':'amortisation'},
							{'label':'Amortization (USA)','value':'amortization'}
						],
					onChange: ( option ) => { props.setAttributes( { interesttype: option } ); }
				} ),
			   el( TextareaControl, {
					'label':   'Repayment Details',
					'value': props.attributes.repaymentlabel,
                    onChange:   ( value ) => { props.setAttributes( { repaymentlabel: value } ); }
				} ),
               el( TextControl, {
					label:     'Total to Pay',
					value:     props.attributes.outputtotallabel,
					onChange:  ( value ) => { props.setAttributes( { outputtotallabel: value } ); },
				} ),
			),
		];
	},

	// We're going to be rendering in PHP, so save() can just return null.
	save: function() {
		return null;
	},
} );