import { Router   } from 'curvature/base/Router';
import { RuleSet }  from 'curvature/base/RuleSet';
import { Config }   from 'curvature/base/Config';
import { Model }    from 'curvature/model/Model';
import { View }     from 'curvature/base/View';

Config.set('backend-origin', '//seanmorris-warehouse.herokuapp.com/');

if(location.hostname == 'localhost')
{
	Config.set('backend-origin', '//localhost:2020');
}

document.addEventListener('DOMContentLoaded', () => {

	fetch(Config.get('backend-origin'));

	const routes = {

		'': () => {

			const view = View.from(require('./home.html'));

			view.args.links = {
				home: '/'
				, 'type changer': 'type-changer'
				, streams: 'streams'
			};

			return view;
		}

		, 'streams': ({streamName}) => {

			const view = View.from(require('./stream-index.html'));

			view.args.streams = [];

			const url = Config.get('backend-origin') + '/activeStreams';
			const options = {headers: {Accept: 'text/json'}};

			fetch(url, options).then(response => response.json()).then(streams => {
				view.args.streams = streams;
			});

			return view;
		}

		, 'streams/%streamName': ({streamName}) => {
			const view = View.from(require('./streams.html'));

			view.args.eventLog = [];

			view.args.streamName = streamName;

			const onServerEvent = event => view.args.eventLog.unshift({
				class:  'ServerEvent'
				, data: JSON.parse(event.data)
				, id:   event.lastEventId
			});

			const url = Config.get('backend-origin') + '/subscribe/' + streamName;

			const eventSource = new EventSource(url, {
				withCredentials: true
				, retry:         500
			});

			eventSource.addEventListener('ServerEvent', onServerEvent);

			view.onRemove(()=>{
				eventSource.removeEventListener('happened', onServerEvent);
			});

			view.args.bindTo('inputType', v =>
				view.args.inputCanHaveHeaders = v && v.substr(-2,2) === 'sv'
			);

			view.publishMessage = (event) => {
				fetch(Config.get('backend-origin') + '/publish/' + streamName, {
					credentials: 'include'
					, method:    'POST'
					, body:      view.args.input ?? String.fromCharCode(0x0)
					, headers: {
						'Content-Type': view.args.inputType
						, 'Ids-Input-Headers':  view.args.inputHeaders  ? 'true' : 'false'
					}
				}).then(response => response.text()).then(response => {
					view.args.output = response;
					view.args.status = 'ready.';
				});
			};

			view.toJson = x => JSON.stringify(x);

			return view;
		}

		, 'type-changer': () => {

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

				fetch(Config.get('backend-origin') + '/changeTypes', {
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

			return view;
		}
	};

	const view = View.from('[[content]]');

	RuleSet.add('body', view);
	RuleSet.apply();
	Router.listen(view, routes);
});
