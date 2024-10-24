import { getDataById } from '@/action'
import Link from 'next/link'

export default async function TaskDetails({
  params,
}: {
  params: { id: string }
}) {
  const task = await getDataById(params.id)

  return (
    <main>
      <header>
        <h1>Task #{task.gid}</h1>
      </header>
      <div>
        <p>
          <strong>Descrição:</strong> {task.name}
        </p>
        <p>
          <strong>Status do Responsável:</strong> {task.assignee_status}
        </p>
        <p>
          <strong>Concluída:</strong> {task.completed ? 'Sim' : 'Não'}
        </p>
        {task.completed_at && (
          <p>
            <strong>Data de Conclusão:</strong>{' '}
            {new Date(task.completed_at).toLocaleDateString()}
          </p>
        )}
        <p>
          <strong>Criada em:</strong>{' '}
          {new Date(task.created_at).toLocaleDateString()}
        </p>
        {task.due_on && (
          <p>
            <strong>Prazo:</strong> {new Date(task.due_on).toLocaleDateString()}
          </p>
        )}
        <p>
          <strong>Nota:</strong> {task.notes || 'Nenhuma nota disponível'}
        </p>

        <h3 className="font-bold">Seguidores:</h3>
        {task.followers.length > 0 ? (
          <ul>
            {task.followers.map((follower) => (
              <li key={follower.gid}>{follower.name}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhum seguidor</p>
        )}

        <h3 className="font-bold">Projetos:</h3>
        <ul>
          {task.projects.map((project) => (
            <li key={project.gid}>{project.name}</li>
          ))}
        </ul>

        <h3 className="font-bold">Associações:</h3>
        {task.memberships.map((membership) => (
          <div key={membership.project.gid}>
            <p>
              <strong>Projeto:</strong> {membership.project.name}
            </p>
            <p>
              <strong>Seção:</strong> {membership.section.name}
            </p>
          </div>
        ))}

        <p>
          <strong>Modificado em:</strong>{' '}
          {new Date(task.modified_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Link da Tarefa:</strong>{' '}
          <Link
            target="_blank"
            href={task.permalink_url}
            className="text-blue-500 hover:font-medium"
          >
            Abrir no Asana
          </Link>
        </p>
      </div>
    </main>
  )
}
