import { Router   } from 'curvature/base/Router';
import { RuleSet }  from 'curvature/base/RuleSet';
import { Config }   from 'curvature/base/Config';
import { View }     from 'curvature/base/View';

Config.set('backend-origin', '//seanmorris-warehouse.herokuapp.com/');

if(location.hostname == 'localhost')
{
	Config.set('backend-origin', '//localhost:2020');
}

document.addEventListener('DOMContentLoaded', () => {
	const view = View.from(require('./form.html'));

	view.args.status = 'ready.';

	view.args.bindTo('inputType', v =>
		view.args.inputCanHaveHeaders = v && v.substr(-2,2) === 'sv'
	);
	view.args.bindTo('outputType', v =>
		view.args.outputCanHaveHeaders = v && v.substr(-2,2) === 'sv'
	);

	view.submitRequest = event => {

		view.args.status = 'executing request...';

		fetch(Config.get('backend-origin'), {
			method:    'POST'
			, body:    view.args.input
			, headers: {
				'Content-Type': view.args.inputType
				, 'Accept':     view.args.outputType
				, 'Ids-Output-Headers': view.args.outputHeaders ? 'true' : 'false'
				, 'Ids-Input-Headers':  view.args.inputHeaders  ? 'true' : 'false'
			}
		})
		.then(response => response.text())
		.then(response => {
			view.args.output = response;
			view.args.status = 'ready.';
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
