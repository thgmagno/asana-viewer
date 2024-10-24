import { forceSynchronize } from '@/action/services'

export function ForceSync() {
  return (
    <form action={forceSynchronize}>
      <button>Atualizar informações</button>
    </form>
  )
}
