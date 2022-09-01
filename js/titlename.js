export const getMainTextConfig = (font) => ({
    font: font,
    size: 10,
    height: 1,
    curveSegments: 2,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 2
});
export const getTextConfig = (font,size=10,height=1) => ({
    font,
    size,
    height,
});