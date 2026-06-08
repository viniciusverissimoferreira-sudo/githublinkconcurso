/* =========================================================================
CÉREBRO DO SIMULADOR ECODASH (Puro JavaScript)
========================================================================= */

// Garante que o navegador leia todo o HTML antes de iniciar a lógica
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CAPTURANDO ELEMENTOS: Ligando os botões e caixas do HTML nas variáveis do JS
    const form = document.getElementById('carbon-form');
    const resultContainer = document.getElementById('result-container');
    const totalFootprintEl = document.getElementById('total-footprint');
    const statusMessageEl = document.getElementById('status-message');
    const actionTipEl = document.getElementById('action-tip');

    // 2. DIRETRIZ DE CÁLCULO (Valores científicos padrão)
    const FATORES = {
        energia: 0.085,    // Cada 1 kWh de energia elétrica gera 0.085 kg de CO2 (Brasil)
        transporte: 2.3,   // Cada 1 litro de gasolina queimado gera 2.3 kg de CO2
        residuos: 1.5      // Cada 1 kg de lixo comum não-reciclado gera 1.5 kg de CO2
    };

    // 3. ESCUTANDO O CLIQUE: Quando o usuário clicar no botão e submeter o formulário...
    if (form) {
        form.addEventListener('submit', (evento) => {
            // Previne o comportamento padrão (recarregar a página e perder as informações)
            evento.preventDefault();

            // 4. LENDO OS NÚMEROS DIGITADOS
            // O comando 'parseFloat' transforma o texto digitado pelo usuário em número.
            // Se estiver vazio, ele usa o valor padrão '0'.
            const energiaInput = parseFloat(document.getElementById('energy')?.value) || 0;
            const transporteInput = parseFloat(document.getElementById('transport')?.value) || 0;
            const residuosInput = parseFloat(document.getElementById('waste')?.value) || 0;

            // 5. CÁLCULO DA PEGADA DE CARBONO
            const impactoEnergia = energiaInput * FATORES.energia;
            const impactoTransporte = transporteInput * FATORES.transporte;
            const impactoResiduos = residuosInput * FATORES.residuos;
            const pegadaTotal = impactoEnergia + impactoTransporte + impactoResiduos;

            // 6. ATUALIZANDO A TELA COM OS RESULTADOS
            // Remove a classe 'hidden' (escondido) para tornar a caixa de resultado visível
            if (resultContainer) {
                resultContainer.classList.remove('hidden');
            }

            // Atualiza o total se o elemento existir
            if (totalFootprintEl) {
                totalFootprintEl.textContent = `${pegadaTotal.toFixed(2)} kg CO2`;
            }

            // 7. LÓGICA DE CLASSIFICAÇÃO E FEEDBACK (Gameficação)
            // Só executa se todos os elementos de texto existirem na tela
            if (statusMessageEl && totalFootprintEl && actionTipEl) {
                if (pegadaTotal < 150) {
                    statusMessageEl.textContent = "Excelente! 🌱";
                    statusMessageEl.style.color = "#10b981"; // Verde Eco
                    totalFootprintEl.style.color = "#10b981";
                    actionTipEl.innerHTML = "<strong>Sua pegada de carbono está muito baixa!</strong> Você está cooperando para manter a produção em equilíbrio com o meio ambiente. Parabéns!";
                } else if (pegadaTotal < 300) {
                    statusMessageEl.textContent = "Moderado ⚠️";
                    statusMessageEl.style.color = "#fbbf24"; // Amarelo
                    totalFootprintEl.style.color = "#fbbf24";
                    actionTipEl.innerHTML = "<strong>Pegada dentro da média.</strong> Há espaço para melhorias! Tente separar os recicláveis em casa ou apagar lâmpadas de cômodos vazios.";
                } else {
                    statusMessageEl.textContent = "Alto Risco 🚨";
                    statusMessageEl.style.color = "#ef4444"; // Vermelho/Alerta
                    totalFootprintEl.style.color = "#ef4444";
                    actionTipEl.innerHTML = "<strong>Atenção! Sua pegada está elevada.</strong> Para preservar nosso ecossistema sustentável, tente reduzir o uso de veículos individuais e adote práticas de descarte correto.";
                }
            }
        }); // Fim do form.addEventListener
    }

    // 8. EFEITO DE NAVEGAÇÃO SUAVE (Transição estilosa ao clicar nos links do menu)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (evento) => {
            const href = link.getAttribute('href');

            // Verifica se o link é realmente uma âncora interna (evita erros com links externos)
            if (href && href.startsWith('#') && href.length > 1) {
                evento.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Rola a tela de forma macia e suave
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Mantém espaço por causa do menu fixo
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}); // Fim do document.addEventListener