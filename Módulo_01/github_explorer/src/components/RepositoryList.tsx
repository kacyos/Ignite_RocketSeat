import "../styles/repositories.scss";
import RepositoryItem from "./RepositoryItem";
import { useEffect, useState } from "react";
//https://api.github.com/users/kacyos

const baseUrl = "https://api.github.com/users/kacyos/repos";

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>

      <ul>
        {repositories.map((repository) => (
          <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}
