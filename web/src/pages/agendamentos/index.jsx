import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { filterAgendamento } from '../../store/modules/agendamento/actions';

const localizer = momentLocalizer(moment);

const Agendamentos = () => {
	const dispatch = useDispatch();
	const start = moment().weekday(0).format('YYYY-MM-DD');
	const end = moment().weekday(6).format('YYYY-MM-DD');

	const { agendamentos } = useSelector((state) => state.agendamentoReducer);

	const formatedEvents = agendamentos.map((agendamento) => ({
		title: `${agendamento.servicoId.nome} - ${agendamento.clienteId.nome} - ${agendamento.colaboradorId.nome}`,
		start: moment(agendamento.data).toDate(),
		end: moment(agendamento.data)
			.add(
				parseInt(moment.duration(agendamento.servicoId.duracao).asMinutes()),
				'minutes'
			)
			.toDate(),
	}));

	const formatRange = (range) => {
		let finalRange = {};
		if (Array.isArray(range)) {
			finalRange = {
				start: moment(range[0]).format('YYYY-MM-DD'),
				end: moment(range[range.length - 1]).format('YYYY-MM-DD'),
			};
		} else {
			finalRange = {
				start: moment(range.start).format('YYYY-MM-DD'),
				end: moment(range.end).format('YYYY-MM-DD'),
			};
		}

		return finalRange;
	};

	useEffect(() => {
		dispatch(filterAgendamento(start, end));
	}, [dispatch, start, end]);

	return (
		<div className='p-5 mt-1 overflow-auto h-100'>
			<div className='row'>
				<div className='col-12'>
					<h2 className='mb-4 mt-0 text-center'>Agendamentos</h2>
					<Calendar
						localizer={localizer}
						onRangeChange={(range) => {
							const { start, end } = formatRange(range);
							dispatch(filterAgendamento(start, end));
						}}
						formats={{
							dateFormat: 'dd',
							dayFormat: (date, culture, localizer) =>
								localizer.format(date, 'dddd', culture),
						}}
						events={formatedEvents}
						selectable
						popup
						defaultView={Views.DAY}
						views={['day', 'week', 'month', 'agenda', 'work_week']}
						step={20}
						timeslots={3}
						min={moment().startOf('day').add(8, 'hours').toDate()}
						max={moment().startOf('day').add(20, 'hours').toDate()}
						style={{ height: 600, zIndex: 1, position: 'relative' }}
/>
				</div>
			</div>
		</div>
	);
};

export default Agendamentos;