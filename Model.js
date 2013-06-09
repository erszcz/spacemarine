Model = function (modelFile) {
    // these two should be also called in subclasses
    Model_createBuffers(this);
    //Model_loadTexture(this, name);
    Model_load(this, modelFile);
}

Model_createBuffers = function (model) {
    model.vertexPositionBuffer = gl.createBuffer();
    model.vertexColorBuffer = gl.createBuffer();
    model.vertexIndexBuffer = gl.createBuffer();
    model.vertexNormalBuffer = gl.createBuffer();
    model.vertexTextureCoordBuffer = gl.createBuffer();
}

Model_handleLoaded = function (model, modelData) {
    function bindVertexNormals(model, data) {
        gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(data), gl.STATIC_DRAW);
        model.vertexNormalBuffer.itemSize = 3;
        model.vertexNormalBuffer.numItems = data.length / 3;
    }

    function bindVertexTextureCoords(model, data) {
        gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(data), gl.STATIC_DRAW);
        model.vertexTextureCoordBuffer.itemSize = 2;
        model.vertexTextureCoordBuffer.numItems = data.length / 2;
    }

    function bindVertexPositions(model, data) {
        gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(data), gl.STATIC_DRAW);
        model.vertexPositionBuffer.itemSize = 3;
        model.vertexPositionBuffer.numItems = data.length / 3;
    }

    function bindVertexIndices(model, data) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.vertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(data), gl.STATIC_DRAW);
        model.vertexIndexBuffer.itemSize = 1;
        model.vertexIndexBuffer.numItems = data.length;
    }

    function bindVertexColors(model, data) {
        gl.bindBuffer(gl.ARRAY_BUFFER, model.vertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,
            new Float32Array(data), gl.STATIC_DRAW);
        model.vertexColorBuffer.itemSize = 4;
        model.vertexColorBuffer.numItems = data.length / 4;
    }

    if (modelData.vertexNormals)
        bindVertexNormals(model, modelData.vertexNormals);
    else if (modelData.normals)
        bindVertexNormals(model, modelData.normals);

    if (modelData.vertexTextureCoords)
        bindVertexTextureCoords(model, modelData.vertexTextureCoords);
    else if (modelData.texCoords)
        bindVertexTextureCoords(model, modelData.texCoords);

    if (modelData.vertexPositions)
        bindVertexPositions(model, modelData.vertexPositions);
    else if (modelData.vertices)
        bindVertexPositions(model, modelData.vertices);

    if (modelData.indices)
        bindVertexIndices(model, modelData.indices);

    if (modelData.vertexColors)
        bindVertexColors(model, modelData.vertexColors);
}

function Model_handleLoadedTexture(model, texture) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);
}

function Model_loadTexture(model, name) {
    model.textures = model.textures || new Array();
    model.textures[name] = gl.createTexture();
    model.textures[name].image = new Image();
    model.textures[name].image.onload = function () {
      Model_handleLoadedTexture(model, model.textures[name]);
    }
    model.textures[name].image.src = name;
}

Model_load = function (model, modelFile) {
    var request = new XMLHttpRequest();
    request.open("GET", modelFile); 
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            Model_handleLoaded(model, JSON.parse(request.responseText));
        }
    }
    request.send();
}

// should be overridden depending on rendering type (i.e. w/wo
// colors, textures, lighting)
Model.prototype.draw = function () {
    ;
}

// should be overriden by subclasses, since default doesn't do anything
Model.prototype.update = function (elapsed) {
    ;
}
