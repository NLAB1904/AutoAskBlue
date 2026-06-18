/IdentificarTOCPP.feature
Funcionalidade: Identificar titular de outro cargo político ou público (TOCPP)
  Como analista de conformidade
  Quero que o sistema detecte automaticamente quando um interveniente pertence à categoria TOCPP
  Para que a transação seja bloqueada até revisão do Gabinete de Conformidade

  Cenário: Sistema detecta interveniente TOCPP e bloqueia transação
    Dado que existe um interveniente listado como TOCPP na Dow Jones
    Quando registo o nome completo do interveniente "João da Silva" e executo a filtragem
    Então o sistema identifica a categoria TOCPP e bloqueia a transação