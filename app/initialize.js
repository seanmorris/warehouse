import { Router   } from 'curvature/base/Router';
import { RuleSet }  from 'curvature/base/RuleSet';
import { View }     from 'curvature/base/View';

document.addEventListener('DOMContentLoaded', () => {
	const view = View.from(require('./form.html'));

	view.args.status = 'ready';

	view.submitRequest = event => {

		view.args.status = 'executing request...';

		fetch('http://localhost:2020', {
			method:    'POST'
			, body:    view.args.input
			, headers: {
				'Content-Type': view.args.inputType
				, 'Accept':     view.args.outputType
				, 'ids-output-headers': view.args.outputHeaders ? 'true' : 'false'
				, 'ids-input-headers': view.args.inputHeaders ? 'true' : 'false'
			}
		})
		.then(response => response.text())
		.then(response => {
			view.args.output = response;
			view.args.status = 'ready';
		})
	};

	view.switch = event => {
		const outputHeaders = view.args.outputHeaders;
		const inputHeaders  = view.args.inputHeaders;

		const outputType = view.args.outputType;
		const inputType  = view.args.inputType;

		view.args.outputType = inputType;
		view.args.inputType  = outputType;

		view.args.outputHeaders = inputHeaders;
		view.args.inputHeaders  = outputHeaders;

		[view.args.input, view.args.output] = [view.args.output, view.args.input];
	};

	RuleSet.add('body', view);
	RuleSet.apply();

	Router.listen(view);
});
