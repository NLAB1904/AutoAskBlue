/permissao_coordenador.feature
Funcionalidade: Permissão de execução para perfil Coordenador de Agência
  Como Coordenador de Agência
  Quero iniciar transações ocasionais elegíveis
  Para poder executar operações do meu âmbito

  Contexto:
    Dado que o utilizador está autenticado como Coordenador de Agência

  Esquema do Cenário: Coordenador inicia transação ocasional <tipo>
    Quando inicia uma transação ocasional do tipo <tipo> com dados mínimos
    Então o sistema deve autorizar a execução da operação

    Exemplos:
      | tipo |
      | 1    |
      | 2    |
      | 3    |