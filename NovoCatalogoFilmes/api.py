from ninja import NinjaAPI ,Schema
from .models import Filmes
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from .externalApi import atualizar_filmes


api = NinjaAPI()

@api.get('filme/')
def listar(request):
    atualizar_filmes()
    filme = Filmes.objects.all()
    

    response = [{'id': i.id, 'titulo': i.titulo, 'imagem': i.imagem,'lancamento': i.lancamento, 'descricao':i.descricao} for i in filme]
    print(response)
    return response 
