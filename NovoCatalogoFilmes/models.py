from django.db import models

class Filmes (models.Model):
    titulo = models.CharField(max_length=100)
    imagem = models.TextField()
    lancamento = models.DateField()
    descricao = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.titulo