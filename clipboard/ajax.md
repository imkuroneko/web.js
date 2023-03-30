```html
<div class="form">
    <input type="text" name="nombre">
    <input type="email" name="email">
    <textarea name="mensaje"></textarea>
    <button onclick="sendForm()">Enviar</button>
</div>
```

```js
function sendForm() {
    // add manipulacion datos para guardar en dataForm
    fetch("/endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(dataForm)
    }).then((response) => { response.json() }).then((data) => {
        // manejar datos
    }).catch((error) => {
        console.error(error);
    });
}
```

```js
app.post("/endpoint", (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const mensaje = req.body.mensaje;

    // procesar todo aqui ª

    res.send("Información recibida");
});
```