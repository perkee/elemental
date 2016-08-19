var React = require('../react');
var blacklist = require('blacklist');
var classNames = require('classnames');

module.exports = React.createClass({
	displayName: 'FormField',
	propTypes: {
		className: React.PropTypes.string,
		htmlFor: React.PropTypes.string,
		id: React.PropTypes.string,
		label: React.PropTypes.string,
		offsetAbsentLabel: React.PropTypes.bool,
		inline: React.PropTypes.bool,
		width: React.PropTypes.oneOf([
			'one-half',
			'two-quarters',
			'three-sixths',
			'one-quarter',
			'three-quarters',
			'one-third',
			'two-sixths',
			'two-thirds',
			'four-sixths',
			'one-fifth',
			'two-fifths',
			'three-fifths',
			'four-fifths',
			'one-sixth',
			'five-sixths',
		])
	},

	getDefaultProps() {
		return {
			inline: false
		};
	},

	render () {
		// classes
		var componentClass = classNames('FormField', {
			'offset-absent-label': this.props.offsetAbsentLabel
		}, this.props.width, this.props.className);

		// props
		var props = blacklist(this.props, 'className', 'label', 'offsetAbsentLabel', 'width', 'inline');

		// elements
		var componentLabel = this.props.label ? (
			<label className="FormLabel" htmlFor={this.props.id || this.props.htmlFor}>
				{this.props.label}
			</label>
		) : null;

		// child components
		var childComponents = this.props.inline ? (
			<div className="inline-controls">
				{this.props.children}
			</div>
		) : this.props.children;

		return (
			<div className={componentClass} {...props}>
				{componentLabel}
				{childComponents}
			</div>
		);
	},
});
