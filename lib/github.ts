export async function getGithubProjects(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
    next: { revalidate: 3600 } 
  });

  if (!res.ok) throw new Error('Falha ao buscar repositórios');
  
  const repos = await res.json();
  return repos.filter((repo: any) => !repo.fork);
}