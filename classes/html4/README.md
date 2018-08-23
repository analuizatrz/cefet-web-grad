<!-- {"layout": "title"} -->
# HTML - Parte 4
## Div/Span, Box Model, Float e os Unicórnios

---
# Roteiro

1. Conhecer a verdadeira história sobre os unicórnios
1. Conhecer `div` e `span`
1. Entender o _Box Model_
1. Flutuar conteúdo com `float`

---
# _Unicorns are real_ (Exercício)

![Little Pony](../../images/little-pony.png) <!-- {.portrait} -->

---
## Exercício

1. Criar uma página para expor a verdade sobre os pôneis.
   - Seu amigo _designer_ criou um _layout_ no Photoshop para sua página e você
     deve criá-la de forma a reproduzir esse _layout_ na sua página `html`
   - Você pode ver o _layout_ na página seguinte
   - Você vai precisar usar novas tags e conceitos: `div`, `span`, _Box Model_ e
     `float`. Portanto, continue navegando até o final dos slides antes de
     colocar as mãos na massa ;)
---
## Comp / Specs

[![](../../images/unicorns-comp-thumb.png)](../../images/unicorns-comp.png)
[![](../../images/unicorns-specs-thumb.png)](../../images/unicorns-specs.png)

*[Comp]: Comprehensive Layout*
*[Specs]: Specifications*

---
## Passos para o exercício

1. Instalar o git na máquina (sugestão: https://windows.github.com/)
1. Criar um _fork_ do repositório do professor em `https://github.com/daniel-hasan/cefet-web-unicorns`
1. Fazer o exercício e fazer _commits_ e _push_ no seu repositório
1. Enviar, via **SIGAA**, o link do seu repositório até o final da aula

---
<!-- {"layout": "section-header", "slideHash": "div-e-span"} -->
# **div** e **span**
## Agrupando outros elementos HTML

- Agrupando para estilizar
- O elemento `<div>...</div>`
- O elemento `<span>...</span>`

<!-- {ul:.content} -->

---
<!-- {"layout": "2-column-content-zigzag"} -->
# #comofaz?

![](../../images/coelhos-vampiros-desired.png) <!-- {.bordered} -->

![](../../images/coelhos-vampiros-1.png) <!-- {.rounded} -->

1. E se quisermos estilizar de forma que o <u>título</u> e
  <u>subtítulo</u> ficassem **com o mesmo fundo**...

- ...a partir do HTML acima?

---
<!-- {"layout": "2-column-content-zigzag"} -->
# 1ª tentativa

- Basta colocar o mesmo fundo tanto no `<h1>` quanto no `<h2>`!

```css
h1, h2 {
  background: url(coelho.png) #ff6d6d;
  background-repeat: no-repeat;
  background-position: right top;
}
```

- Acontece que, como são elementos diferentes, **cada um tem seu
  próprio fundo**

![](../../images/coelhos-vampiros-attempt.png) <!-- {.bordered} -->

---
<!-- {"layout": "2-column-content-zigzag"} -->
# O **jeito certo** <!-- {.underline.upon-activation} --><span class="jump upon-activation delay-800">:star2:</span>

- Colocamos os títulos **dentro de outro elemento** e o estilizamos
- Uma `<div>...</div>` pode ser usada para agrupar elementos

```html
<body>
  <div id="topo-da-pagina">  
    <h1>Coelhos Vampiros</h1>
    <h2>De onde vêm, onde vivem ...</h2>
  </div>
  <p>Sexta-feira, no Globo Repórter</p>
</body>
```

![](../../images/coelhos-vampiros-desired.png) <!-- {.bordered} -->

```css
#topo-da-pagina {
  background: url(coelho.png) #ff6d6d;
  background-repeat: no-repeat;
  background-position: right top;
}
```

---
<!-- {"layout": "regular"} -->
## **Div** ([na MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div))

- `<div></div>` serve para agrupar outros elementos
- Não representa nada por si só (não tem semântica)
  - Um `<p>` é um parágrafo (_i.e._, conteúdo)
  - Uma `<img>` é uma imagem (_i.e._, conteúdo)
  - Uma `<div>` é um agrupamento de elementos
- É um elemento `block`

> É um **mecanismo genérico** que nos permite criar uma estrutura ou agrupamento
> de elementos quando não há outro elemento HTML mais apropriado, e ela pode
> **ser estilizada usando CSS** ou manipulada com JavaScript
> <cite><a href="https://www.w3.org/wiki/Generic_containers_-_the_div_and_span_elements">Containers genéricos</a> na W3C</cite>

---
<!-- {"layout": "2-column-content"} -->
## Div (exemplo)

- Exemplo:
  - `html`
    ```html
    <div id="topo-da-pagina">
      <h1>Título do site</h1>
      <h2>Subtítulo</h2>
    </div>
    ```
  - `css`
    ```css
    #topo-da-pagina {
      background-color: #4400ac;
      color: #fffff;
    }
    ```

![](../../images/div-exemplo-titulo-subtitulo.png) <!-- {.bordered style="margin-top: 3em"} -->

---
<!-- {"layout": "2-column-content"} -->
## Div (outro exemplo)

![](../../images/div-exemplo-conteudo-pagina.png) <!-- {.bordered.push-right} -->
- ```html
  <body>
    <div id="conteudo">
      <h1>Tesouros</h1>
      <table><!-- ... --></table>
      <p>Ajude Barba-Ruiva ...</p>
    </div>
  </body>
  ```
  ```css
  body { background: url(ilha.png) }
  #conteudo {
    background: white;
  }
  ```

---
<!-- {"layout": "regular"} -->
## **Span** ([na MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span))

- `<span></span>` **tem _exatamente_ <!-- {.underline.upon-activation} -->
  a mesma função** que `div`, porém `inline`
  <!-- {.underline.upon-activation.delay-1200} -->

::: figure .figure-slides.no-margin.centered
![](../../images/span-exemplo-nome-preco-produto-1.png) <!-- {.bullet.figure-step.bullet-no-anim} -->
![](../../images/span-exemplo-nome-preco-produto-2.png) <!-- {.bullet.figure-step.bullet-no-anim} -->
:::

- Como estilizar o nome e o preço do produto? <!-- {ul:.bulleted} -->
  - Se usarmos `<div>`, vai quebrar linha (ele é `block`)
  - Então, usamos o `<span>`, que é `inline`!
    ```html
    O preço da <span class="produto">camisa adornada</span> é
    de <span class="preco">R$ 29,90</span>.
    ```

---
<!-- {"embeddedStyles": ".artista { position: relative; padding-left: 1.25em; color: #ff3399; } .artista::before { content: '🎵'; display: inline-block; position: absolute; left: 0; top: 0; width: 1em; height: 1em; color: currentColor; }"} -->
## Span (exemplo)

- ```html
  <p>
    O <span class="artista">Chimbinha</span> é rei, mas
    <span class="artista">Joelma</span> é diva intergalática.
  </p>
  ```
  ```css
  .artista {
    background: url(imgs/musica.png) no-repeat left;
    padding-left: 15px;   color: #ff3399; /* rosa choque */
  }
  ```
  ::: result
  O <span class="artista">Chimbinha</span> é rei, mas
  <span class="artista">Joelma</span> é diva
  intergalática.
  :::

---
<!-- {"layout": "section-header", "slideHash": "o-box-model"} -->
# O _Box Model_
## Como os elementos são "vistos" pelo navegador

- Componentes da caixa
- `width` e `height`
- Alterando o _box-model_

<!-- {ul:.content} -->

---
<!-- {"layout": "regular", "embeddedStyles": ".box-model-part {color: #333; border-radius: 4px; font-style: normal; padding: 1px 3px; } .box-model-part code { background: initial; }"} -->
## _Box Model_ ([na MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box_model))

- ![](../../images/box-model.png) <!-- {.push-right} -->
  O navegador enxerga todo elemento de conteúdo como uma "caixa"
- A "caixa" é formada por:
  - Espaço do _conteúdo_ <!-- {.box-model-part style="background: #8bb4c0;"} -->
  - Espaço de _preenchimento (`padding`)_ <!-- {em:.box-model-part style="background: #c2ce89;"} -->
  - Bordas _(`border`)_ <!-- {em:.box-model-part style="background: #fddc9a;"} -->
  - Espaço _externo (`margin`)_ <!-- {em:.box-model-part style="background: #f9cc9d;"} -->

<!-- {ul^1:style="margin-bottom: 0;"} -->

![](../../images/box-model-sample.png) <!-- {p:.centered.no-margin} -->

---
## Visualizando a caixa de um elemento

<video src="../../videos/tools-box-model.mp4" height="440" controls class="centered"></video>

---
<!-- {"layout": "regular"} -->
## _Box Model_: **largura** e **altura**

- Quando definimos a **largura** (`width`) ou **altura** (`height`) de
  um elemento, estamos definindo o tamanho
  do _conteúdo da caixa_, <!-- {em:.box-model-part style="background: #8bb4c0;"} -->
  e não da caixa inteira

::: figure .figure-slides
![](../../images/box-model-product-0.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
![](../../images/box-model-product-1.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
![](../../images/box-model-product-2.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
![](../../images/box-model-product-3.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
![](../../images/box-model-product-4.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
![](../../images/box-model-product-5.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
:::

---
<!-- {"layout": "regular-block"} -->
## **Dimensionando** um elemento

::: did-you-know .push-right width: 450px; margin-right: 6px;
Elementos `inline` ignoram os valores de:
- `width`
- `height`
- `padding-top`
- `padding-bottom`
- `margin-top`
- `margin-bottom`<!-- {ul:.multi-column-list-2}-->
:::
- Se sabemos a dimensão total de um elemento, que também contém
  `padding` e/ou `border`, como calcular seus (`width`, `height`)?

::: figure .figure-slides.push-right
![](../../images/box-model-determine-dimensions-1.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded} -->
![](../../images/box-model-determine-dimensions-2.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded} -->
![](../../images/box-model-determine-dimensions-3.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded} -->
![](../../images/box-model-determine-dimensions-4.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded} -->
:::
- Contudo, fazer essa conta "nós mesmos" pode resultar em erros... <!-- {ul:.bullet} -->
  - É possível mudar isso!

---
<!-- {"layout": "regular-block"} -->
## Alterando o _box model_

::: did-you-know .push-right width: 260px; margin-right: 6px;
As **margens** de um elemento formam um **espaçamento externo** e não contam
espaço dentro da caixa.
:::

- É possível alterar o significado da `width` e `height` que damos a um elemento
   **usando _a propriedade `box-sizing`_** <!-- {em:.underline.upon-activation.delay-3000} -->:
  - `box-sizing: content-box` (valor padrão)
    - `width` = largura do _conteúdo_ <!-- {.box-model-part style="background: #8bb4c0;"} -->
  - `box-sizing: border-box`
    - `width` = _conteúdo_ <!-- {.box-model-part style="background: #8bb4c0;"} --> +
      _padding_ <!-- {.box-model-part style="background: #c2ce89;"} --> +
      _border_ <!-- {.box-model-part style="background: #fddc9a;"} -->
    - Esta forma é mais intuitiva :thumbsup: :thumbsup: :thumbsup:


::: figure .figure-slides.centered margin: 0 auto
![](../../images/box-model-product-0.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
![](../../images/box-model-product-2.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
![](../../images/box-model-product-border-box-1.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
![](../../images/box-model-product-border-box-2.png)<!-- {.bullet.figure-step.bullet-no-anim.rounded.bordered} -->
:::

---
<!-- {"layout": "section-header", "slideHash": "revisitando-o-float", "embeddedStyles": ".guia-do-mochileiro { position: fixed; bottom: -225px; left: calc(50% + 20px); transition: all 200ms ease-out; } .guia-do-mochileiro-container { cursor: help; } .guia-do-mochileiro-container:hover .guia-do-mochileiro { bottom: -10px; box-shadow: 6px 3px 6px rgba(0, 0, 0, .5), -6px 3px 6px rgba(0, 0, 0, .5); }"} -->
# Revisitando o **float**

> Para voar, basta errar o chão.
> <cite>Douglas Adams no Guia do Mochileiro das Galáxias</cite> ![](../../images/guia-do-mochileiro.jpg) <!-- {.guia-do-mochileiro} -->
<!-- {blockquote:.guia-do-mochileiro-container style="max-width: 42%"} -->

- Relembrando o fluxo estático
  - `inline` e `block`
- Relembrando o _float_
- Possíveis "problemas":
  1. Interrompendo o _float_
  1. Remoção do fluxo

<!-- {ul^1:.content} -->

---
<!-- {"backdrop": "oldtimes"} -->
## Elementos **`block`**

![](../../images/flow1.png)

---
<!-- {"backdrop": "oldtimes", "state": "show-active-slide-and-previous"} -->
## Elementos **`inline`**

![](../../images/flow2.png)

---
<!-- {"backdrop": "oldtimes"} -->
## `block` e `inline`, juntos

![](../../images/flow3.png)

<!--
...acho que isto é muito avançado...
## Margens

- Quando o navegador coloca **dois elementos `inline` um ao lado do outro** e
  ambos têm **margens** laterais, o navegador **soma seus valores** (esperado)
- Quando o navegador coloca **dois elementos `block` um em cima do outro** e
  ambos têm **margens superior/inferior**, o navegador **seleciona o maior
  valor** dentre os dois (não intuitivo)
-->
---
## Flutuando elementos com **`float`**

- ::: figure .figure-slides.push-right
  <div class="bullet figure-step bullet-no-anim"><img src="../../images/float-p1.png"><figcaption>Sem float</figcaption></div>

  <div class="bullet figure-step bullet-no-anim"><img src="../../images/float-p3.png"><figcaption>Com float</figcaption></div>
  :::
  Flutuando o parágrafo à direita:
  ```css
  p#amazing {
    width: 200px;
    float: right;
  }
  ```
- Quem flutua é **removido do fluxo**
  - _i.e._, não ocupa mais espaço
- Elementos **<u>depois</u> do flutuante**:
  - Os `block`: passam a ignorar o elemento flutuante
  - Os `inline`: respeitam o flutuante

---
<!-- {"layout": "regular"} -->
## Exemplo: **flutuando** uma imagem

<iframe width="100%" height="460" src="//jsfiddle.net/fegemo/7cofhyLc/embedded/result,html,css/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

- Repare os **parágrafos** (`block`) e o **texto** dentro deles (`inline`)...

---
<!-- {"layout": "regular"} -->
## Possíveis "problemas" com flutuação (1/2)

![](../../images/exemplo-float-problema-clear.png)

- É possível que um elemento **interrompa uma flutuação**
  - Para isso, usamos **a propriedade `clear`** no
    **elemento _interruptor_ <!-- {.underline.upon-activation.delay-2000} -->**

---
<!-- {"layout": "2-column-content"} -->
## Exemplo: **interrompendo** uma flutuação

<iframe width="100%" height="460" src="//jsfiddle.net/fegemo/vxb79m2c/embedded/result,html,css/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

- A **propriedade `clear`** pode ser:
  - `left` ou `right`: interrompe apenas as flutuações à esquerda ou à direita
  - `both`: interrompe **ambos** lados
  - `none`: **não interrompe** (valor padrão)
- Neste exemplo:
  ```css
  #proximo-assunto {
    clear: right;
  }
  ```

---
<!-- {"layout": "2-column-content-zigzag"} -->
## Possíveis "problemas" com flutuação (2/2)

- Queremos colocar os preços à direita
<!-- {ul:.no-margin} -->

::: figure .figure-slides.no-margin
![](../../images/exemplo-float-problema-remocao-1.png) <!-- {.bullet.figure-step.bullet-no-anim} -->
![](../../images/exemplo-float-problema-remocao-2.png) <!-- {.bullet.figure-step.bullet-no-anim} -->
:::
<!-- {figure:.no-margin} -->

- 1ª tentativa:
  ::: figure .figure-slides.no-margin
  <pre class="bullet figure-step bullet-no-anim no-margin"><code>.preco { float: right; }</code></pre>
  <pre class="bullet figure-step bullet-no-anim no-margin" style="right: 0;"><code>.preco { float: right; }
  .item  { float: left;  }</code></pre>
  :::
<!-- {ul:.no-margin.bullet} -->

::: figure .figure-slides.no-margin
![](../../images/exemplo-float-problema-remocao-3a.png) <!-- {.bullet.figure-step.bullet-no-anim} -->
![](../../images/exemplo-float-problema-remocao-3b.png) <!-- {.bullet.figure-step.bullet-no-anim} -->
![](../../images/exemplo-float-problema-remocao-4a.png) <!-- {.bullet.figure-step.bullet-no-anim} -->
![](../../images/exemplo-float-problema-remocao-4b.png) <!-- {.bullet.figure-step.bullet-no-anim} -->
![](../../images/exemplo-float-problema-remocao-4c.png) <!-- {.bullet.figure-step.bullet-no-anim} -->
:::
<!-- {figure:.no-margin.bullet} -->

- Corrigindo:
  ```css
  .preco { float: right; }
  .item  { float: left;  }
  .comida{ clear: both;  }
  ```
<!-- {ul:.no-margin.bullet} -->

![](../../images/exemplo-float-problema-remocao-5.png)
<!-- {p:.no-margin.bullet style="margin-top: 1.5em;"} -->


---
# Referências

1. Capítulos 9 (parcial), 10 e 11 (parcial) do livro
1. Mozilla Developer Network (MDN)
