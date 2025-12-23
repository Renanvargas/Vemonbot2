if (comando === 'setprefix') {
  if (!isGroup) return reply('❌ Só funciona em grupo 😅');
  if (!isAdmin) return reply('❌ Apenas admins mandam aqui 😎');

  if (!args.length) {
    return reply(
      `😂 Ei! Você esqueceu de passar o prefixo!\n\nExemplo:\n${prefixoUsado}setprefix #`
    );
  }

  setPrefix(from, args);
  reply(
    `✅ Prefixo atualizado com sucesso!\n\nAgora o grupo responde a:\n${args.join('  ')} 😜`
  );
}
