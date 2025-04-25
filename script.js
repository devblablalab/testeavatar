document.addEventListener('DOMContentLoaded', () => {
    // Estado atual
    const currentState = {
        body: null,
        color: null,
        background: null
    };

    // Elementos DOM
    const bodyOptions = document.getElementById('body-options');
    const colorOptions = document.getElementById('color-options');
    const backgroundOptions = document.getElementById('background-options');
    const avatarPreview = document.getElementById('avatar-preview');
    const generateBtn = document.getElementById('generate-btn');

    // Configurações de cores
    const colors = {
        verde: '#00e441',
        amarelo: '#ffcd00',
        rosa: '#ff34ff',
        azul: '#00b1ff',
        branco: '#ffffff',
        preto: '#000000'
    };

    // Configurações de fundo
    const backgrounds = [
        { name: 'preto', value: '#000000' },
        { name: 'branco', value: '#ffffff' },
        { name: 'verde', value: '#00e441' },
        { name: 'amarelo', value: '#ffcd00' },
        { name: 'rosa', value: '#ff34ff' },
        { name: 'azul', value: '#00b1ff' }
    ];

    // Lista de avatares disponíveis
    const avatars = [
        { id: 'avatar-01', name: 'Círculo' },
        { id: 'avatar-02', name: 'Diamante' },
        { id: 'avatar-03', name: 'Hexágono' },
        { id: 'avatar-04', name: 'Quadrado' },
        { id: 'avatar-05', name: 'Estrela' },
        { id: 'avatar-06', name: 'Triângulo' },
        { id: 'avatar-07', name: 'Retângulo' },
        { id: 'avatar-08', name: 'Cabeça' },
        { id: 'avatar-09', name: 'Chapéu' },
        { id: 'avatar-10', name: 'Oito' },
        { id: 'avatar-11', name: 'Retângulo Vertical' },
        { id: 'avatar-12', name: 'Elipse' },
        { id: 'avatar-13', name: 'Triângulo Invertido' },
        { id: 'avatar-14', name: 'Estrela Central' },
        { id: 'avatar-15', name: 'Diamante Central' },
        { id: 'avatar-16', name: 'Círculos' },
        { id: 'avatar-17', name: 'Ondas' },
        { id: 'avatar-18', name: 'Retângulo Horizontal' }
    ];

    // Carregar opções de avatar
    function loadAvatarOptions() {
        bodyOptions.innerHTML = '';

        avatars.forEach(avatar => {
            const option = document.createElement('div');
            option.className = 'option';
            option.dataset.body = avatar.id;
            
            const img = document.createElement('img');
            // Garantir que o caminho do SVG seja absoluto
            const svgPath = `./Avatar-${avatar.id.split('-')[1]}.svg`;
            img.src = svgPath;
            img.alt = avatar.name;
            
            option.appendChild(img);
            bodyOptions.appendChild(option);

            // Adicionar evento de clique
            option.addEventListener('click', () => {
                selectOption('body', avatar.id, option);
            });
        });

        // Selecionar o primeiro avatar automaticamente
        if (bodyOptions.firstChild) {
            selectOption('body', avatars[0].id, bodyOptions.firstChild);
        }
    }

    // Carregar opções de cor
    Object.entries(colors).forEach(([name, value], index) => {
        const option = document.createElement('div');
        option.className = 'option';
        option.dataset.color = name;
        option.style.backgroundColor = value;
        
        option.addEventListener('click', () => {
            selectOption('color', name, option);
        });
        
        colorOptions.appendChild(option);

        // Selecionar a primeira cor automaticamente
        if (index === 0) {
            selectOption('color', name, option);
        }
    });

    // Carregar opções de fundo
    backgrounds.forEach((bg, index) => {
        const option = document.createElement('div');
        option.className = 'option';
        option.dataset.background = bg.name;
        option.style.backgroundColor = bg.value;
        
        option.addEventListener('click', () => {
            selectOption('background', bg.name, option);
        });
        
        backgroundOptions.appendChild(option);

        // Selecionar o primeiro fundo automaticamente
        if (index === 0) {
            selectOption('background', bg.name, option);
        }
    });

    // Função para selecionar opção
    function selectOption(type, value, element) {
        // Remover seleção anterior
        const previousSelected = element.parentElement.querySelector('.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }

        // Adicionar nova seleção
        element.classList.add('selected');
        currentState[type] = value;

        // Atualizar preview
        updatePreview();
    }

// Função para atualizar preview
async function updatePreview() {
    avatarPreview.innerHTML = ''; // Limpa preview

    if (!currentState.body) return;

    const svgPath = `./Avatar-${currentState.body.split('-')[1]}.svg`;

    try {
        const response = await fetch(svgPath);
        const svgText = await response.text();

        const div = document.createElement("div");
        div.innerHTML = svgText;

        const svgElement = div.querySelector("svg");

        if (!svgElement) {
            throw new Error('SVG inválido ou não encontrado');
        }

        // Aplica cor
        const paths = svgElement.querySelectorAll("path");
        paths.forEach(path => {
            path.setAttribute("fill", colors[currentState.color] || "#000000");
        });

        // Aplica estilo de preview
        svgElement.style.width = '80%';
        svgElement.style.height = '80%';
        svgElement.style.position = 'absolute';
        svgElement.style.top = '50%';
        svgElement.style.left = '50%';
        svgElement.style.transform = 'translate(-50%, -50%)';
        svgElement.style.zIndex = '3';

        // Aplica fundo
        const bgColor = backgrounds.find(bg => bg.name === currentState.background)?.value || '#ffffff';
        avatarPreview.style.backgroundColor = bgColor;

        avatarPreview.appendChild(svgElement);
    } catch (err) {
        console.error('Erro ao carregar ou processar SVG:', err);
        avatarPreview.innerHTML = '<p style="color: red;">Erro ao carregar avatar</p>';
    }
}

    // Função para obter o filtro de cor
    function getColorFilter(color) {
        switch (color) {
            case 'verde':
                return 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)';
            case 'amarelo':
                return 'brightness(0) saturate(100%) invert(77%) sepia(71%) saturate(481%) hue-rotate(359deg) brightness(103%) contrast(107%)';
            case 'rosa':
                return 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(1748%) hue-rotate(300deg) brightness(104%) contrast(101%)';
            case 'azul':
                return 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(187deg) brightness(118%) contrast(119%)';
            case 'branco':
                return 'brightness(0) saturate(100%) invert(1)';
            case 'preto':
                return 'brightness(0) saturate(100%)';
            default:
                return 'none';
        }
    }

    // Função para baixar o avatar
    function downloadAvatar() {
        const preview = document.getElementById('avatar-preview');
        const imgElement = preview.querySelector('img');
    
        if (!imgElement) {
            alert('Por favor, selecione um avatar primeiro!');
            return;
        }
    
        const canvas = document.createElement('canvas');
        const size = 512;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
    
        // Preenche o fundo com a cor selecionada
        const backgroundColor = preview.style.backgroundColor || '#ffffff';
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, size, size);
    
        // Cria uma imagem a partir do elemento atual
        const tempImage = new Image();
        tempImage.crossOrigin = "anonymous";
        tempImage.src = imgElement.src;
    
        tempImage.onload = () => {
            // Preserva os filtros CSS (se houver)
            if (imgElement.style.filter) {
                ctx.filter = imgElement.style.filter;
            }
    
            // Desenha a imagem centralizada
            const w = size * 0.8;
            const h = size * 0.8;
            const x = (size - w) / 2;
            const y = (size - h) / 2;
    
            ctx.drawImage(tempImage, x, y, w, h);
    
            // Baixar a imagem
            const link = document.createElement('a');
            link.download = 'BlaBlaLab - Avatar.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
    
        tempImage.onerror = () => {
            alert('Erro ao preparar o download. Verifique a imagem do avatar.');
        };
    }

    // Event listener para o botão de gerar
    generateBtn.addEventListener('click', downloadAvatar);

    // Inicializar o carregamento dos avatares
    loadAvatarOptions();
});