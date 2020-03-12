precision highp float;
uniform sampler2D uScene;
uniform sampler2D uMouseCanvas;
uniform sampler2D uTextCanvas;
uniform sampler2D uSkyboxTexture;
uniform sampler2D uCubesTexture;
uniform vec2 uResolution;
uniform float uTime;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec4 color = vec4(0.0);
    vec4 sceneColor = texture2D(uScene, uv);
    vec4 skyboxColor = texture2D(uSkyboxTexture, uv);
    vec4 cubesColor = texture2D(uCubesTexture, uv);
    vec4 finalColor = vec4(1.0);

    if(cubesColor.r == 0.0) {
        finalColor = skyboxColor;
    } else {
        vec3 refracted = refract(vec3(0.0, 0.0, 0.0), cubesColor.rgb, 1.0/1.5);
        uv += cubesColor.rg * 0.08;
        finalColor = texture2D(uSkyboxTexture, uv);
    }

    // color = cubesColor;
    
    gl_FragColor = vec4(finalColor);
}

/*
uniform sampler2D envMap;
uniform vec2 resolution;

varying vec3 worldNormal;
varying vec3 viewDirection;

float ior = 1.5;

void main() {
	// screen coordinates
	vec2 uv = gl_FragCoord.xy / resolution;

	// combine backface and frontface normal
	vec3 normal = worldNormal;

	// calculate refraction and apply to uv
	vec3 refracted = refract(viewDirection, normal, 1.0/ior);
	uv += refracted.xy;

	// sample environment texture
	vec4 tex = texture2D(envMap, uv);

	vec4 color = tex;

	gl_FragColor = vec4(color.rgb, 1.0);
}
*/