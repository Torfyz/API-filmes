import requests
from .models import Filmes  
# Certifique-se de que o caminho está correto

def atualizar_filmes():
    url = "https://api.themoviedb.org/3/discover/movie"
    
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmY0ZTJmOGEwNTJjODY2NzMzMDVhNDhhYmMyZjAxYyIsIm5iZiI6MTczMDM4NTIwMi4xMDk2OTEsInN1YiI6IjY3MjM4YzIzODI2NThhZWVhYzkyNjMxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.toAiKhCSyrARV_uv9n3dF-qryC6WVKBiAgIT7-NCkC4"
    }

    # Buscar dados atuais do banco de dados
    filmes_atuais = {filme.titulo: filme for filme in Filmes.objects.all()}

    response = requests.get(url, headers=headers)
    dados = response.json()

    if response.ok:  # Verifica se o status é 200-299
        # Verifica se a resposta contém resultados de filmes
        if "results" in dados and len(dados["results"]) > 0:
            for filme in dados["results"]:
                titulo = filme['title']
                lancamento = filme['release_date']
                imagem = f"https://image.tmdb.org/t/p/original{filme['poster_path']}"
                descricao = filme['overview']

                # Verificar se o filme já existe e se os dados são diferentes
                if titulo not in filmes_atuais or (
                    filmes_atuais[titulo].lancamento != lancamento or 
                    filmes_atuais[titulo].imagem != imagem
                ):
                    # Criar uma nova instância do modelo e salvar no banco de dados
                    filme_obj, created = Filmes.objects.get_or_create(
                        titulo=titulo,
                        defaults={
                            'lancamento': lancamento,
                            'imagem': imagem,
                            'descricao': descricao
                        }
                    )
                    if created:
                        print(f"Filme adicionado: {titulo}")
                    else:
                        print(f"Filme já existe no banco: {titulo}")
                else:
                    print(f"Dados do filme '{titulo}' estão atualizados no banco.")
        else:
            print("Nenhum filme encontrado.")
    else:
        # Em caso de erro, exibe a mensagem de status
        print(f"Erro ao acessar a API: {dados.get('status_message', 'Erro desconhecido')}")

# Chame a função para atualizar filmes
atualizar_filmes()
