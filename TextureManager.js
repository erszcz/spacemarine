var TextureManager = {};
TextureManager.textures = new Array();

TextureManager.handleLoadedTexture = function (texture) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);
}

TextureManager.load = function (name) {
    if (TextureManager.textures[name])
        return;

    TextureManager.textures[name] = gl.createTexture();
    TextureManager.textures[name].image = new Image();
    TextureManager.textures[name].image.onload = function () {
        TextureManager.handleLoadedTexture(TextureManager.textures[name]);
    }
    TextureManager.textures[name].image.src = name;
}

TextureManager.loadAll = function (names) {
    for (var i = 0; i < names.length; i++)
        TextureManager.load(names[i]);
}

TextureManager.bind = function (name) {
    if (! TextureManager.textures[name]) {
        alert("Texture not loaded: " + name);
        return;
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, TextureManager.textures[name]);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
}
