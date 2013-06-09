# Warhammer 40k Space Marine in WebGL

This is a project I made (some time ago) for one of the courses at the
univeristy.

The model is a fan-made Quake III Arena model "sculpted" by Chris Glenn
and skinned/textured by Chris Glenn and Jeremy Bone. It was imported
into [Blender][blender] by a third-party import script. Blender allows for
easy export to JSON format, which can be straightforwardly used in JavaScript
and WebGL.

Overall, the demo was based on [great WebGL lessons by Giles Thomas][webgl],
linked in the references.

[webgl]:   http://learningwebgl.com/blog/?page_id=1217
[blender]: http://www.blender.org/

The animation presents a fully textured model using a few rendering
techniques. Firstly, it can be rendered with just the texture and no lighting
at all. Secondly, basic lighting may be turned on. Basic means that ambient
and directional lights are taken into account when shading the object.
The third mode is to also apply the specular lighting, i.e. lights wich reflect
from objects' surfaces straight into the eye of the observer.
As all of the position of the object, the light source
and the observer must be taken into account for
each rendered fragment it is by far the most expensive rendering technique.
