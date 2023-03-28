### login:post
```html
app.post('/ruta', (req, res) => {
    if(req.session && req.session.userId) {
        const nombre = req.body.nombre;
        const correo = req.body.correo;

        res.send('Datos recibidos correctamente');
    }
});
```

### login:get
```html
<form id="miFormulario">
    <input type="text" name="nombre">
    <input type="email" name="correo">
    <button type="submit">Enviar</button>
</form>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
$(document).ready(function() {
    $('#miFormulario').submit(function(event) {
        event.preventDefault(); // Evita que se recargue la pagina
        $.post('/ruta', $(this).serialize(), function(response) {
            // Codigo para manejar la respuesta del servidor
        });
    });
});
</script>
```