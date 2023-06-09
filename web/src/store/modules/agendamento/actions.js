import types from "./types"

export function filterAgendamento(start, end) {
  return {
    type: types.FILTER_AGENDAMENTO,
    start,
    end
  }
}

export function updateAgendamento(agendamentos) {
  return {
    type: types.UPDATE_AGENDAMENTO,
    agendamentos
  }
}