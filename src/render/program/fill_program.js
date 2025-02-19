// @flow

import {patternUniformValues} from './pattern.js';
import {
    Uniform1i,
    Uniform1f,
    Uniform2f,
    Uniform3f,
    UniformMatrix4f
} from '../uniform_binding.js';
import {extend} from '../../util/util.js';

import type Painter from '../painter.js';
import type {UniformValues} from '../uniform_binding.js';
import type Context from '../../gl/context.js';
import type {CrossfadeParameters} from '../../style/evaluation_parameters.js';
import type Tile from '../../source/tile.js';

export type FillUniformsType = {|
    'u_matrix': UniformMatrix4f
|};

export type FillOutlineUniformsType = {|
    'u_matrix': UniformMatrix4f,
    'u_world': Uniform2f
|};

export type FillPatternUniformsType = {|
    'u_matrix': UniformMatrix4f,
    // pattern uniforms:
    'u_texsize': Uniform2f,
    'u_image': Uniform1i,
    'u_pixel_coord_upper': Uniform2f,
    'u_pixel_coord_lower': Uniform2f,
    'u_scale': Uniform3f,
    'u_fade': Uniform1f
|};

export type FillOutlinePatternUniformsType = {|
    'u_matrix': UniformMatrix4f,
    'u_world': Uniform2f,
    // pattern uniforms:
    'u_texsize': Uniform2f,
    'u_image': Uniform1i,
    'u_pixel_coord_upper': Uniform2f,
    'u_pixel_coord_lower': Uniform2f,
    'u_scale': Uniform3f,
    'u_fade': Uniform1f
|};

const fillUniforms = (context: Context): FillUniformsType => ({
    'u_matrix': new UniformMatrix4f(context)
});

const fillPatternUniforms = (context: Context): FillPatternUniformsType => ({
    'u_matrix': new UniformMatrix4f(context),
    'u_image': new Uniform1i(context),
    'u_texsize': new Uniform2f(context),
    'u_pixel_coord_upper': new Uniform2f(context),
    'u_pixel_coord_lower': new Uniform2f(context),
    'u_scale': new Uniform3f(context),
    'u_fade': new Uniform1f(context)

});

const fillOutlineUniforms = (context: Context): FillOutlineUniformsType => ({
    'u_matrix': new UniformMatrix4f(context),
    'u_world': new Uniform2f(context)
});

const fillOutlinePatternUniforms = (context: Context): FillOutlinePatternUniformsType => ({
    'u_matrix': new UniformMatrix4f(context),
    'u_world': new Uniform2f(context),
    'u_image': new Uniform1i(context),
    'u_texsize': new Uniform2f(context),
    'u_pixel_coord_upper': new Uniform2f(context),
    'u_pixel_coord_lower': new Uniform2f(context),
    'u_scale': new Uniform3f(context),
    'u_fade': new Uniform1f(context)
});

const fillUniformValues = (matrix: Float32Array): UniformValues<FillUniformsType> => ({
    'u_matrix': matrix
});

const fillPatternUniformValues = (
    matrix: Float32Array,
    painter: Painter,
    crossfade: CrossfadeParameters,
    tile: Tile
): UniformValues<FillPatternUniformsType> => extend(
    fillUniformValues(matrix),
    patternUniformValues(crossfade, painter, tile)
);

const fillOutlineUniformValues = (
    matrix: Float32Array,
    drawingBufferSize: [number, number]
): UniformValues<FillOutlineUniformsType> => ({
    'u_matrix': matrix,
    'u_world': drawingBufferSize
});

const fillOutlinePatternUniformValues = (
    matrix: Float32Array,
    painter: Painter,
    crossfade: CrossfadeParameters,
    tile: Tile,
    drawingBufferSize: [number, number]
): UniformValues<FillOutlinePatternUniformsType> => extend(
    fillPatternUniformValues(matrix, painter, crossfade, tile),
    {
        'u_world': drawingBufferSize
    }
);

export {
    fillUniforms,
    fillPatternUniforms,
    fillOutlineUniforms,
    fillOutlinePatternUniforms,
    fillUniformValues,
    fillPatternUniformValues,
    fillOutlineUniformValues,
    fillOutlinePatternUniformValues
};
